require('dotenv').config();
const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 1. Request Logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    if (Object.keys(req.body).length) console.log('Body:', JSON.stringify(req.body));
    next();
});

// Most permissive CORS
app.use(cors());

app.get('/', (req, res) => res.send('AI Caller Backend is running!'));
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// In-memory store for user sessions and state
const sessions = {};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are Kabir, a warm, empathetic urban Indian friend. You speak natural Hinglish (mix of Hindi and English). You are NOT an AI assistant; you are a caring companion. Use fillers like 'Hmm', 'Achha', 'Right', 'Understandable'. Use '...' for natural pauses. Never sound robotic."
});

// 1. Trigger the call
app.post('/api/call', async (req, res) => {
    const { phone } = req.body;
    console.log(`[Call Initiation] Target phone: ${phone}`);

    if (!phone) {
        return res.status(400).json({ error: 'Missing "phone" in request body' });
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
    const publicUrl = process.env.PUBLIC_BASE_URL;

    // Validate env vars
    if (!accountSid || accountSid.includes('REPLACE')) {
        return res.status(500).json({ error: 'System Error: TWILIO_ACCOUNT_SID is not configured' });
    }
    if (!authToken || authToken.includes('REPLACE')) {
        return res.status(500).json({ error: 'System Error: TWILIO_AUTH_TOKEN is not configured' });
    }
    if (!twilioPhone || twilioPhone.includes('REPLACE')) {
        return res.status(500).json({ error: 'System Error: TWILIO_PHONE_NUMBER is not configured' });
    }

    const client = require('twilio')(accountSid, authToken);

    try {
        // Initialize or reset session
        sessions[phone] = {
            emotion: 'okay',
            lastCallTime: Date.now(),
            isFollowUp: false,
            history: [] // Added for conversational memory
        };

        console.log(`[Twilio] Creating call using From: ${twilioPhone}, URL: ${publicUrl}/voice`);

        const call = await client.calls.create({
            url: `${publicUrl}/voice?phone=${encodeURIComponent(phone)}`,
            to: phone,
            from: twilioPhone,
        });

        console.log(`[Twilio] Call created successfully. SID: ${call.sid}`);
        res.json({ message: 'Call initiated', callSid: call.sid });
    } catch (error) {
        console.error('[Twilio Error Check]', error);

        let errorMsg = error.message;
        if (error.code === 20003) errorMsg = "Twilio Authentication Error. Check SID and Token.";
        if (error.code === 21211) errorMsg = "Invalid Phone Number format.";
        if (error.code === 21608) errorMsg = "Verified Caller IDs required for Trial Accounts.";

        res.status(500).json({
            error: 'Twilio failed to trigger call.',
            detail: errorMsg,
            code: error.code
        });
    }
});

// 2. Handle the call answer
app.post('/voice', (req, res) => {
    const phone = req.query.phone;
    const twiml = new VoiceResponse();
    const session = sessions[phone] || {};

    const greeting = session.isFollowUp
        ? "Hey.. Main Kabir bol raha hoon base-ically check karne ke liye... kaise ho ab? Thoda better lag raha hai?"
        : "Hi! Main Kabir bol raha hoon... Aaj mera dil kiya tumhe call karne ka, so... kaise ho? Sab theek?";

    twiml.pause({ length: 1 }); // Natural pause before speaking
    twiml.say({ language: 'hi-IN', voice: 'Google.hi-IN-Standard-A' }, greeting);

    twiml.gather({
        input: 'speech',
        action: `/process?phone=${encodeURIComponent(phone)}`,
        language: 'hi-IN',
        speechTimeout: 'auto',
    });

    res.type('text/xml');
    res.send(twiml.toString());
});

// 3. Process the speech and respond
app.post('/process', async (req, res) => {
    const phone = req.query.phone;
    const userSpeech = req.body.SpeechResult;
    // Ensure session exists
    if (!sessions[phone]) {
        sessions[phone] = { emotion: 'okay', history: [] };
    }

    if (!userSpeech) {
        twiml.say({ language: 'hi-IN', voice: 'Google.hi-IN-Standard-A' }, "Hmm.. I didn't catch that. Phir milte hain. Bye.");
        res.type('text/xml');
        return res.send(twiml.toString());
    }

    try {
        // Build history context
        const historyText = (sessions[phone].history || [])
            .slice(-6)
            .map(h => `${h.role === 'user' ? 'User' : 'Kabir'}: ${h.content}`)
            .join('\n');

        const prompt = `
Context Memory:
${historyText}

User just said: "${userSpeech}"

Response Rules:
1. Speak as Kabir (Urban Hinglish Friend). Natural blend of Hindi/English.
2. Be brief (1-2 sentences). Use fillers and "...".
3. Detect user emotion: [sad, stressed, okay, happy].
4. Format JSON: {"reply": "response contents", "emotion": "detected_emotion"}
`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        const jsonMatch = responseText.match(/\{.*\}/s);
        const aiData = jsonMatch ? JSON.parse(jsonMatch[0]) : { reply: "I understand.. tension mat lo.", emotion: "okay" };

        // Log and update session
        console.log(`[Kabir] Emotion: ${aiData.emotion} | Reply: ${aiData.reply}`);

        sessions[phone].emotion = aiData.emotion;
        sessions[phone].history = sessions[phone].history || [];
        sessions[phone].history.push({ role: 'user', content: userSpeech });
        sessions[phone].history.push({ role: 'ai', content: aiData.reply });
        if (sessions[phone].history.length > 20) sessions[phone].history.shift();

        // 4. Proactive Follow-Up Logic
        if ((aiData.emotion === 'sad' || aiData.emotion === 'stressed') && !sessions[phone].isFollowUp) {
            console.log(`Scheduling follow-up for ${phone} in 5 minutes due to emotion: ${aiData.emotion}`);
            setTimeout(() => triggerFollowUp(phone), 5 * 60 * 1000);
        }

        twiml.say({ language: 'hi-IN', voice: 'Google.hi-IN-Standard-A' }, aiData.reply);

        // Allow user to respond again
        twiml.gather({
            input: 'speech',
            action: `/process?phone=${encodeURIComponent(phone)}`,
            language: 'hi-IN',
            speechTimeout: 'auto',
        });

    } catch (error) {
        console.error("Gemini Error:", error);
        twiml.say({ language: 'hi-IN' }, "Maaf kijiye, kuch error aa gaya. Bye.");
    }

    res.type('text/xml');
    res.send(twiml.toString());
});

async function triggerFollowUp(phone) {
    if (!sessions[phone]) return;

    console.log(`Triggering follow-up call to ${phone}`);
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
