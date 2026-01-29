require('dotenv').config();
const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// 1. Trigger the call
app.post('/api/call', async (req, res) => {
    const { phone } = req.body;
    if (!phone) {
        return res.status(400).json({ error: 'Missing "phone" in request body' });
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    try {
        const call = await client.calls.create({
            url: `${process.env.PUBLIC_BASE_URL}/voice`,
            to: phone,
            from: process.env.TWILIO_PHONE_NUMBER,
        });
        res.json({ message: 'Call initiated', callSid: call.sid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error initiating call: ' + error.message });
    }
});

// 2. Handle the call answer
app.post('/voice', (req, res) => {
    const twiml = new VoiceResponse();

    twiml.say("Hi, this is your AI calling you first. How are you feeling today?");
    twiml.gather({
        input: 'speech',
        action: '/process',
        speechTimeout: 'auto',
    });

    res.type('text/xml');
    res.send(twiml.toString());
});

// 3. Process the speech and respond
app.post('/process', async (req, res) => {
    const twiml = new VoiceResponse();
    const userSpeech = req.body.SpeechResult;

    if (!userSpeech) {
        twiml.say("I didn't catch that. Goodbye.");
        res.type('text/xml');
        return res.send(twiml.toString());
    }

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful and polite telephone assistant. Keep your answer short and conversational." },
                { role: "user", content: userSpeech },
            ],
            model: "gpt-3.5-turbo", // or gpt-4
            max_tokens: 60,
        });

        const aiResponse = completion.choices[0].message.content;

        twiml.say(aiResponse);
        // The call ends here as there is no further gathering or redirection
    } catch (error) {
        console.error("OpenAI Error:", error);
        twiml.say("I'm having trouble thinking right now. Goodbye.");
    }

    res.type('text/xml');
    res.send(twiml.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
