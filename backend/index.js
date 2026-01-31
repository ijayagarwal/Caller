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

// 1. Initiate outbound call
app.post('/api/call', async (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: 'Phone number required' });

    const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    try {
        sessions[phone] = { phone, lastMessage: '', emotion: 'neutral', lastCallTime: Date.now(), isFollowUp: false };

        await client.calls.create({
            url: `${process.env.PUBLIC_BASE_URL}/voice?phone=${encodeURIComponent(phone)}`,
            to: phone,
            from: process.env.TWILIO_PHONE_NUMBER,
        });

        res.json({ message: 'You will receive a call shortly' });
    } catch (error) {
        console.error('Call Error:', error);
        res.status(500).json({ error: 'Failed to initiate call' });
    }
});

// 2. TwiML Endpoint (Called when user answers)
app.post('/voice', (req, res) => {
    const phone = req.query.phone;
    const session = sessions[phone] || {};
    const twiml = new VoiceResponse();

    const greeting = session.isFollowUp
        ? "Main bas dubara check karne ke liye call kar raha tha. Ab thoda better lag raha hai?"
        : "Hi, main tumhara AI hoon. Main khud call kar raha hoon. Aaj tum kaise feel kar rahe ho?";

    twiml.say({ language: 'hi-IN' }, greeting);

    twiml.gather({
        input: 'speech',
        action: `/process?phone=${encodeURIComponent(phone)}`,
        language: 'hi-IN',
        speechTimeout: 'auto',
    });

    res.type('text/xml').send(twiml.toString());
});

// 3. Process speech and generate response
app.post('/process', async (req, res) => {
    const phone = req.query.phone;
    const userSpeech = req.body.SpeechResult;
    const twiml = new VoiceResponse();

    if (!userSpeech) {
        twiml.say({ language: 'hi-IN' }, "I didn't catch that. Phir milte hain. Bye.");
        return res.type('text/xml').send(twiml.toString());
    }

    try {
        const prompt = `
You are a caring, friendly AI calling a human proactively. 
The user may speak Hindi, English, or Hinglish.

Rules:
- Reply in the SAME language and style as the user
- Be warm, friendly, and human
- If user sounds sad or stressed, acknowledge gently
- Keep replies SHORT (1–2 sentences)
- Avoid formal or robotic tone
- Detect emotion: [sad, stressed, neutral, happy]
- Format JSON ONLY: {"reply": "...", "emotion": "..."}

User said: "${userSpeech}"
`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const jsonMatch = responseText.match(/\{.*\}/s);
        const aiData = jsonMatch ? JSON.parse(jsonMatch[0]) : { reply: "Theek hai, dhanyawad.", emotion: "neutral" };

        // Update session state
        if (sessions[phone]) {
            sessions[phone].emotion = aiData.emotion;
            sessions[phone].lastMessage = userSpeech;
            sessions[phone].lastCallTime = Date.now();

            // Proactive Follow-Up Logic
            if ((aiData.emotion === 'sad' || aiData.emotion === 'stressed') && !sessions[phone].isFollowUp) {
                console.log(`Scheduling follow-up for ${phone} in 5 minutes`);
                setTimeout(() => triggerFollowUp(phone), 5 * 60 * 1000);
            }
        }

        twiml.say({ language: 'hi-IN' }, aiData.reply);

        // Listen for next response
        twiml.gather({
            input: 'speech',
            action: `/process?phone=${encodeURIComponent(phone)}`,
            language: 'hi-IN',
            speechTimeout: 'auto',
        });

    } catch (error) {
        console.error('Gemini Error:', error);
        twiml.say({ language: 'hi-IN' }, "Maaf kijiye, network issue hai. Bye.");
    }

    res.type('text/xml').send(twiml.toString());
});

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
    } catch (e) {
        console.error('Follow-up Failed:', e);
    }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
