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

// Verification log
console.log("[System] Neelam (Gemini) initialized. Ready for calls.");

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
        ? "Hey.. Neelam bol rahi hoon base-ically check karne ke liye... kaise ho ab? Thoda better lag raha hai?"
        : "Hi! Main Neelam bol rahi hoon... Aaj mera dil kiya tumhe call karne ka, so... kaise ho? Sab theek?";

    twiml.pause({ length: 1 }); // Natural pause before speaking
    twiml.say({ language: 'hi-IN', voice: 'Google.hi-IN-Standard-A' }, greeting);

    twiml.gather({
        input: 'speech',
        action: `/process?phone=${encodeURIComponent(phone)}`,
        language: 'hi-IN',
        speechTimeout: 'auto',
        enhanced: true,
        speechModel: 'phone_call'
    });

    res.type('text/xml');
    res.send(twiml.toString());
});

// 3. Process the speech and respond
app.post('/process', async (req, res) => {
    const phone = req.query.phone;
    const userSpeech = req.body.SpeechResult;
    const twiml = new VoiceResponse();
    // Ensure session exists
    if (!sessions[phone]) {
        sessions[phone] = { emotion: 'okay', history: [] };
    }

    if (!userSpeech) {
        // If silence, ask again instead of hanging up
        twiml.say({ language: 'hi-IN', voice: 'Google.hi-IN-Standard-A' }, "Ji? Kuch kaha aapne? Main sun nahi paya.");
        twiml.gather({
            input: 'speech',
            action: `/process?phone=${encodeURIComponent(phone)}`,
            language: 'hi-IN',
            speechTimeout: 'auto',
            enhanced: true,
            speechModel: 'phone_call'
        });
        res.type('text/xml');
        return res.send(twiml.toString());
    }

    // Diagnostic: Check for placeholder key
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes('REPLACE')) {
        console.error("[CRITICAL] Gemini API Key is missing or using placeholder value!");
        twiml.say({ language: 'hi-IN', voice: 'Google.hi-IN-Standard-A' }, "Maaf kijiye, Neelam thodi confuse ho gayi hai configuration ki wajah se. Aapka developer shayed API key bhul gaya.");
        res.type('text/xml');
        return res.send(twiml.toString());
    }

    try {
        // Build history context
        const historyText = (sessions[phone].history || [])
            .slice(-6)
            .map(h => `${h.role === 'user' ? 'User' : 'Neelam'}: ${h.content}`)
            .join('\n');

        const prompt = `
SYSTEM: You are Neelam, a warm, empathetic urban Indian girl who speaks natural Hinglish. You are a caring friend, not an AI. Use fillers like 'Hmm', 'Achha', 'Right'. Use '...' for pauses.

Context Memory:
${historyText}

User just said: "${userSpeech}"

Response Rules:
1. Speak as Neelam. Natural blend of Hindi/English.
2. Be brief (1-2 sentences).
3. Detect user emotion: [sad, stressed, okay, happy].
4. Format JSON ONLY: {"reply": "response content", "emotion": "emotion"}
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = response.text();

        console.log(`[Gemini Raw Response]: ${responseText}`);

        let aiData;
        try {
            const jsonMatch = responseText.match(/\{.*\}/s);
            if (jsonMatch) {
                aiData = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error("No JSON found in response");
            }
        } catch (parseError) {
            console.error("[JSON Parse Error]:", parseError.message);
            aiData = {
                reply: "I understand.. thoda network issue hai, but main sun raha hoon. Aap continue kijiye.",
                emotion: "okay"
            };
        }

        // Log and update session
        console.log(`[Neelam] Emotion: ${aiData.emotion} | Reply: ${aiData.reply}`);

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
            enhanced: true,
            speechModel: 'phone_call'
        });

    } catch (error) {
        console.error("Critical Process Error:", error.message);

        let errorMsg = "Hmm.. kuch network issue lag raha hai, but main sun raha hoon. Aap phir se bolo?";
        if (error.message?.includes('SAFETY')) {
            errorMsg = "Ye topic thoda heavy ho gaya.. chalo kuch aur baat karte hain? Kya chal raha hai?";
        }

        twiml.say({ language: 'hi-IN', voice: 'Google.hi-IN-Standard-A' }, errorMsg);
        twiml.gather({
            input: 'speech',
            action: `/process?phone=${encodeURIComponent(phone)}`,
            language: 'hi-IN',
            speechTimeout: 'auto',
            enhanced: true,
            speechModel: 'phone_call'
        });
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
