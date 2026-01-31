# Proactive Hinglish AI Caller Prototype

This project is a believable demo of a proactive AI phone caller that speaks Hinglish and triggers follow-up calls based on user emotion.

## Features
- **Proactive Calling**: AI speaks first in Hinglish.
- **Multilingual (Hinglish)**: Understands and responds in Hindi, English, and Hinglish.
- **Emotion Aware**: Detects [sad, stressed, okay, happy] and schedules a check-in call after 5 minutes if the user is sad/stressed.
- **Google Gemini Integration**: Uses Gemini 1.5 Flash for fast, natural conversations.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS (Deployed on Vercel)
- **Backend**: Node.js, Express, Twilio, Google Gemini (Deployed on Render)

---

## Setup Instructions

### Backend Setup
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and fill in:
   - `TWILIO_ACCOUNT_SID` & `TWILIO_AUTH_TOKEN` (from Twilio Console)
   - `TWILIO_PHONE_NUMBER` (your Twilio number)
   - `GEMINI_API_KEY` (from Google AI Studio)
   - `PUBLIC_BASE_URL` (your Render URL or Ngrok tunnel)
   - `FRONTEND_ORIGIN` (your Vercel URL)

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and fill in:
   - `VITE_BACKEND_URL` (your Backend URL)

---

## Deployment Instructions

### Deploying Backend (Render)
1. Push the code to GitHub.
2. Create a new **Web Service** on Render.
3. Set **Root Directory** to `backend`.
4. Build Command: `npm install`
5. Start Command: `node index.js`
6. Add all environment variables from `.env`.

### Deploying Frontend (Vercel)
1. Create a new project on Vercel.
2. Set **Root Directory** to `frontend`.
3. Add Environment Variable: `VITE_BACKEND_URL` pointing to your Render service.

---

## How to Test End-to-End
1. Visit the landing page.
2. Click **Try Demo**.
3. Enter your phone number (with country code, e.g., +91).
4. Answer the call. 
5. Say something "sad" or "stressed" (e.g., "Main aaj bohot upset hoon, life is hard").
6. The AI will respond caringly and detect your emotion.
7. Wait **5 minutes**—you will receive an automatic follow-up call:
   *"Main wapas call kar raha tha bas check karne ke liye. Ab thoda better lag raha hai?"*

## Follow-up Logic
- The backend stores the session in memory.
- If Gemini detects "sad" or "stressed", it triggers a `setTimeout` function.
- After 300 seconds (5 minutes), the `triggerFollowUp` function initiates a new call via Twilio.
