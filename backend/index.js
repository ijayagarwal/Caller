require('dotenv').config();
const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// In-memory session store
const sessions = {};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const PERSONAS = {
    '1': {
        name: 'Neelam',
        voice: 'Google.hi-IN-Standard-A', // Female
        instruction: "You are Neelam, a warm, empathetic urban Indian girl. You speak natural Hinglish. You are a caring friend, not an AI. Use fillers like 'Hmm', 'Achha', 'Right'. Use '...' for pauses."
    },
    '2': {
        name: 'Neel',
        voice: 'Google.hi-IN-Standard-B', // Male
        instruction: "You are Neel, a calm, supportive urban Indian guy. You speak natural Hinglish. You are a reliable friend, not an AI. Use fillers like 'Hmm', 'Sahi hai', 'I see'. Use '...' for pauses."
    }
};

// 1. Initiate outbound call
app.post('/api/call', async (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: 'Phone number required' });

    const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    try {
        sessions[phone] = {
            phone,
            lastMessage: '',
            emotion: 'neutral',
            lastCallTime: Date.now(),
            isFollowUp: false,
            history: [],
            persona: null // Will be selected via keypad
        };

        await client.calls.create({
            url: `${process.env.PUBLIC_BASE_URL}/voice?phone=${encodeURIComponent(phone)}`,
            to: phone,
            from: process.env.TWILIO_PHONE_NUMBER,
        });

        res.json({ message: 'Success: You will receive a call shortly' });
    } catch (error) {
        console.error('Call Error:', error);
        res.status(500).json({ error: 'Failed to initiate call' });
    }
});

// 2. TwiML Entry Point - Persona Selection
app.post('/voice', (req, res) => {
    const phone = req.query.phone;
    const session = sessions[phone];
    const twiml = new VoiceResponse();

    if (session && session.isFollowUp && session.persona) {
        // Skip selection for follow-up calls
        return res.redirect(307, `/select-persona?phone=${encodeURIComponent(phone)}&Digits=${session.persona.id}`);
    }

    const gather = twiml.gather({
        numDigits: 1,
        action: `/select-persona?phone=${encodeURIComponent(phone)}`,
        timeout: 10
    });

    gather.say({ language: 'hi-IN', voice: 'Google.hi-IN-Standard-A' },
        "Namaste! Apne companion ko choose kijiye. Neelam ke liye ek dabaye, Neel ke liye do dabaye.");

    // If no input
    twiml.say({ language: 'hi-IN' }, "I didn't receive any input. Goodbye.");
    res.type('text/xml').send(twiml.toString());
});

// 2.1 Handle Persona selection
app.post('/select-persona', (req, res) => {
    const phone = req.query.phone;
    const digit = req.body.Digits;
    const session = sessions[phone];
    const twiml = new VoiceResponse();

    const selected = PERSONAS[digit] || PERSONAS['1']; // Default to Neelam
    if (session) {
        session.persona = { ...selected, id: digit };
    }

    const greeting = (session && session.isFollowUp)
        ? `Main bas dubara check karne ke liye call kar raha tha. Ab thoda better lag raha hai?`
        : `Hi! Main ${selected.name} bol raha hoon... Aaj mera dil kiya tumhe call karne ka, so... kaise ho? Sab theek?`;

    twiml.pause({ length: 1 });
    twiml.say({ language: 'hi-IN', voice: selected.voice }, greeting);

    twiml.gather({
        input: 'speech',
        action: `/process?phone=${encodeURIComponent(phone)}`,
        language: 'hi-IN',
        speechTimeout: 'auto',
        enhanced: true,
        speechModel: 'phone_call'
    });

    res.type('text/xml').send(twiml.toString());
});

// 3. Process speech and generate response
app.post('/process', async (req, res) => {
    const phone = req.query.phone;
    const userSpeech = req.body.SpeechResult;
    const session = sessions[phone] || { persona: PERSONAS['1'], history: [] };
    const persona = session.persona || PERSONAS['1'];
    const twiml = new VoiceResponse();

    if (!userSpeech) {
        // Silence Recovery logic
        twiml.say({ language: 'hi-IN', voice: persona.voice }, "Ji? Kuch kaha aapne? Main sun nahi paya.");
        twiml.gather({
            input: 'speech',
            action: `/process?phone=${encodeURIComponent(phone)}`,
            language: 'hi-IN',
            speechTimeout: 'auto',
            enhanced: true,
            speechModel: 'phone_call'
        });
        return res.type('text/xml').send(twiml.toString());
    }

    try {
        const historyText = (session.history || [])
            .slice(-6)
            .map(h => `${h.role === 'user' ? 'User' : persona.name}: ${h.content}`)
            .join('\n');

        const prompt = `
SYSTEM: ${persona.instruction}

Context Memory:
${historyText}

User just said: "${userSpeech}"

Response Rules:
1. Speak as ${persona.name}. Natural blend of Hindi/English.
2. Be brief (1-2 sentences).
3. Detect user emotion: [sad, stressed, neutral, happy].
4. Format JSON ONLY: {"reply": "...", "emotion": "..."}
`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        console.log(`[Gemini Raw Response]: ${responseText}`);

        const jsonMatch = responseText.match(/\{.*\}/s);
        const aiData = jsonMatch ? JSON.parse(jsonMatch[0]) : { reply: "I understand. Please go on.", emotion: "neutral" };

        console.log(`[${persona.name}] Emotion: ${aiData.emotion} | Reply: ${aiData.reply}`);

        // Update session state
        session.emotion = aiData.emotion;
        session.lastMessage = userSpeech;
        session.lastCallTime = Date.now();
        session.history.push({ role: 'user', content: userSpeech });
        session.history.push({ role: 'ai', content: aiData.reply });
        if (session.history.length > 20) session.history.shift();

        // Proactive Follow-Up Logic
        if ((aiData.emotion === 'sad' || aiData.emotion === 'stressed') && !session.isFollowUp) {
            console.log(`Scheduling follow-up for ${phone} in 5 minutes`);
            setTimeout(() => triggerFollowUp(phone), 5 * 60 * 1000);
        }

        twiml.say({ language: 'hi-IN', voice: persona.voice }, aiData.reply);

        twiml.gather({
            input: 'speech',
            action: `/process?phone=${encodeURIComponent(phone)}`,
            language: 'hi-IN',
            speechTimeout: 'auto',
            enhanced: true,
            speechModel: 'phone_call'
        });

    } catch (error) {
        console.error('Process Error:', error.message);
        twiml.say({ language: 'hi-IN', voice: persona.voice }, "Hmm.. network mein kuch issue hai. Phir se bolo?");
        twiml.gather({
            input: 'speech',
            action: `/process?phone=${encodeURIComponent(phone)}`,
            language: 'hi-IN',
            speechTimeout: 'auto'
        });
    }

    res.type('text/xml').send(twiml.toString());
});

async function triggerFollowUp(phone) {
    const session = sessions[phone];
    if (!session) return;
    const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    try {
        session.isFollowUp = true;
        await client.calls.create({
            url: `${process.env.PUBLIC_BASE_URL}/voice?phone=${encodeURIComponent(phone)}`,
            to: phone,
            from: process.env.TWILIO_PHONE_NUMBER,
        });
    } catch (e) {
        console.error('Follow-up Failed:', e);
    }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
