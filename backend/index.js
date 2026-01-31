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
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
            isFollowUp: false
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
        ? "Main wapas call kar raha tha bas check karne ke liye. Ab thoda better lag raha hai?"
        : "Hi, main tumhara AI hoon. Main khud call kar raha hoon. Aaj tum kaise feel kar rahe ho?";

    twiml.say({ language: 'hi-IN' }, greeting);

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
    const twiml = new VoiceResponse();

    if (!userSpeech) {
        twiml.say({ language: 'hi-IN' }, "I didn't catch that. Phir milte hain. Goodbye.");
        res.type('text/xml');
        return res.send(twiml.toString());
    }

    try {
        const prompt = `
You are a caring AI calling a human proactively. 
The user may speak in Hindi, English, or Hinglish.
Rules:
- Reply in the SAME language and style as the user.
- Be warm, friendly, and emotionally aware.
- Detect emotional state of the user from their speech. Choose exactly one: [sad, stressed, okay, happy].
- Keep replies under 2 sentences.
- Format your response as JSON: {"reply": "the response", "emotion": "the detected emotion"}

User said: "${userSpeech}"
`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Basic JSON extraction as Gemini might wrap in markdown
        const jsonMatch = responseText.match(/\{.*\}/s);
        const aiData = jsonMatch ? JSON.parse(jsonMatch[0]) : { reply: "Theek hai, dhanyawad.", emotion: "okay" };

        // Store state
        if (sessions[phone]) {
            sessions[phone].emotion = aiData.emotion;
            sessions[phone].lastMessage = userSpeech;
            sessions[phone].lastCallTime = Date.now();

            // 4. Proactive Follow-Up Logic
            if ((aiData.emotion === 'sad' || aiData.emotion === 'stressed') && !sessions[phone].isFollowUp) {
                console.log(`Scheduling follow-up for ${phone} in 5 minutes due to emotion: ${aiData.emotion}`);
                setTimeout(() => triggerFollowUp(phone), 5 * 60 * 1000);
            }
        }

        twiml.say({ language: 'hi-IN' }, aiData.reply);

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
