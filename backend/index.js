require('dotenv').config();
const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');
const URL = require('url');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

// Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "text-bison-001" });

const PERSONAS = {
    '1': {
        name: 'Neelam',
        voice: 'Google.hi-IN-Standard-A', // Female
        instruction: "You are Neelam, a super energetic, warm, and proactive urban Indian girl. You speak natural Hinglish with perfect feminine grammar (e.g., use 'kar rahi hoon', 'bol rahi hoon'). You are a caring friend who is a GREAT listener. Use enthusiastic fillers like 'Hmmmm...', 'Achha!', 'Sahi hai!', 'I'm listening'. Never sound robotic. Be very proactive and supportive."
    },
    '2': {
        name: 'Neel',
        voice: 'Google.hi-IN-Standard-B', // Male
        instruction: "You are Neel, a calm, supportive urban Indian guy. You speak natural Hinglish. You are a reliable friend, not an AI. Use fillers like 'Hmm', 'Sahi hai', 'I see'. Use '...' for pauses."
    }
};

// In-memory sessions
const sessions = {};

// 1. TwiML for Connection
app.post('/voice', (req, res) => {
    const phone = req.query.phone;
    const twiml = new VoiceResponse();

    // We start a Media Stream
    const connect = twiml.connect();
    connect.stream({
        url: `wss://${req.headers.host}/media?phone=${encodeURIComponent(phone)}`,
        name: 'AI_Stream'
    });

    res.type('text/xml').send(twiml.toString());
});

// 2. Call Initiation
app.post('/api/call', async (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: 'Phone required' });

    const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    try {
        sessions[phone] = {
            phone,
            history: [],
            emotion: 'neutral',
            aiSpeaking: false,
            interrupted: false,
            persona: null // To be selected
        };
        await client.calls.create({
            url: `${process.env.PUBLIC_BASE_URL}/voice?phone=${encodeURIComponent(phone)}`,
            to: phone,
            from: process.env.TWILIO_PHONE_NUMBER,
        });
        res.json({ message: 'Success: Call initiated' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// 3. Media Stream WebSocket Handling
wss.on('connection', (ws, req) => {
    const params = URL.parse(req.url, true).query;
    const phone = params.phone;
    console.log(`[Stream] Connected for ${phone}`);

    let streamSid = '';
    let aiSpeechQueue = [];
    let session = sessions[phone] || { history: [], emotion: 'neutral' };

    ws.on('message', async (message) => {
        const msg = JSON.parse(message);

        switch (msg.event) {
            case 'start':
                streamSid = msg.start.streamSid;
                console.log(`[Stream] Started with SID: ${streamSid}`);
                const greeting = session.persona && session.persona.name === 'Neelam'
                    ? "Hi! Main Neelam bol rahi hoon. Aaj mera mann kiya tumse baat karne ka! Kaise ho tum? Sab theek?"
                    : "Hi, main tumhara AI hoon. Main khud call kar raha hoon. Aaj tum kaise feel kar rahe ho?";
                await streamSpeech(ws, streamSid, greeting, session);
                break;

            case 'media':
                // Interruption Detection
                const isSpeaking = detectEnergy(msg.media.payload);
                if (isSpeaking && session.aiSpeaking) {
                    console.log('[Barge-in] Interruption detected!');
                    triggerInterruption(ws, streamSid, session);
                }
                break;

            case 'stop':
                console.log('[Stream] Stopped');
                break;
        }
    });

    // Handle Interruption
    async function triggerInterruption(ws, streamSid, session) {
        session.aiSpeaking = false;
        session.interrupted = true;
        aiSpeechQueue = []; // Flush queue

        // Send 'clear' to Twilio to stop playback on the phone instantly
        ws.send(JSON.stringify({
            event: 'clear',
            streamSid: streamSid
        }));

        // Respond to interruption contextually
        const responseText = await getGeminiResponse("User interrupted me.. acknowledge it naturally with energy (like 'Oh sorry! Haan bolo!') and ask what's up.", session);
        await streamSpeech(ws, streamSid, responseText, session);
    }
});

// --- ENGINE LOGIC ---

function detectEnergy(payload) {
    const buffer = Buffer.from(payload, 'base64');
    let sum = 0;
    for (let i = 0; i < buffer.length; i++) {
        sum += Math.abs(buffer[i]);
    }
    const level = sum / buffer.length;
    return level > 160; // Energy threshold for active speech
}

async function streamSpeech(ws, streamSid, text, session) {
    if (!text) return;
    session.aiSpeaking = true;
    session.interrupted = false;

    console.log(`[AI] Response: ${text}`);

    // Split into small chunks for granularity
    const chunks = text.split(/[.?!,]/).filter(c => c.length > 1);

    for (const chunk of chunks) {
        if (session.interrupted) break;

        console.log(`[Playback] Chunk: ${chunk.trim()}`);

        // In a real prototype, use a real TTS engine (e.g. Google TTS) to get Mulaw bytes
        // For the demo, we simulate the time it takes to speak a chunk
        await new Promise(r => setTimeout(r, chunk.length * 80));

        // If we had audio bytes:
        // ws.send(JSON.stringify({ event: 'media', streamSid, media: { payload: base64Audio } }));
    }

    session.aiSpeaking = false;
}

async function getGeminiResponse(input, session) {
    const prompt = `
SYSTEM: ${session.persona ? session.persona.instruction : PERSONAS['1'].instruction}

Context Memory:
${session.history.map(h => `${h.role === 'user' ? 'User' : (session.persona ? session.persona.name : 'AI')}: ${h.content}`).join('\n')}

Rules:
- Always respond naturally and PROACTIVELY to interruptions
- Reply in the same language as the user (Hindi, English, or Hinglish)
- Keep replies under 2 sentences
- If user sounds sad or stressed, acknowledge gently with high empathy
- Sound human and energetic, use perfect grammar for your gender
- Use variations of 'Hmmmm...' and 'Achha' to show you are listening
- Detect user emotion: [sad, stressed, neutral, happy]
- Format JSON ONLY: {"reply": "response content", "emotion": "emotion"}

User just said: "${input}"
`;

    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const jsonMatch = responseText.match(/\{.*\}/s);
        const aiData = jsonMatch ? JSON.parse(jsonMatch[0]) : { reply: "I understand. Please go on.", emotion: "neutral" };

        console.log(`[AI] Emotion: ${aiData.emotion} | Reply: ${aiData.reply} `);

        // Update session state
        session.emotion = aiData.emotion;
        session.history.push({ role: 'user', content: input });
        session.history.push({ role: 'ai', content: aiData.reply });

        // Proactive Follow-Up: 5 minutes if sad/stressed
        if ((aiData.emotion === "sad" || aiData.emotion === "stressed") && !session.isFollowUp) {
            console.log(`Scheduling follow - up for ${session.phone} in 5 mins`);
            setTimeout(() => triggerFollowUp(session.phone), 5 * 60 * 1000);
        }

        return aiData.reply;
    } catch (e) {
        return "Theek hai, main sun raha hoon. Bolo?";
    }
}

async function triggerFollowUp(phone) {
    if (!sessions[phone]) return;
    const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    try {
        sessions[phone].isFollowUp = true;
        await client.calls.create({
            url: `${process.env.PUBLIC_BASE_URL}/voice?phone=${encodeURIComponent(phone)}`,
            to: phone,
            from: process.env.TWILIO_PHONE_NUMBER,
        });
    } catch (error) {
        console.error("Follow-up call failed:", error);
    }
}

// WebSocket Upgrade
server.on('upgrade', (request, socket, head) => {
    const pathname = URL.parse(request.url).pathname;
    if (pathname === '/media') {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
