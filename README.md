# AI Phone Caller Prototype

A working prototype for a proactive AI phone caller with a React frontend and Node.js backend.

## Architecture

-   **Frontend**: React (Vite) + Tailwind CSS + Framer Motion. Located in `frontend/`.
-   **Backend**: Node.js + Express + Twilio + OpenAI. Located in `backend/`.
-   **Deployment**: configured for Render via `render.yaml`.

## Prerequisites

-   Node.js installed
-   [ngrok](https://ngrok.com/) installed
-   Twilio Account (Account SID, Auth Token, Phone Number)
-   OpenAI API Key

## Setup & Running

### 1. Backend Setup

1.  **Navigate to backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    -   Copy `.env.example` to `.env`:
        ```bash
        cp .env.example .env
        ```
    -   Fill in your credentials.

4.  **Start ngrok:**
    Expose port 3000 for Twilio webhooks.
    ```bash
    ngrok http 3000
    ```
    -   Copy the HTTPS URL (e.g., `https://xyz.ngrok-free.app`).
    -   Update `PUBLIC_BASE_URL` in `.env` with this URL.

5.  **Start the Backend Server:**
    ```bash
    npm start
    ```
    The server runs on `http://localhost:3000`.

### 2. Frontend Setup

1.  **Navigate to frontend directory:**
    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Development Server:**
    ```bash
    npm run dev
    ```
    This will usually start on `http://localhost:5173`.

## Deployment (Render)

1.  Push this repository to GitHub.
2.  Connect your GitHub repository to Render.
3.  Render will automatically detect `render.yaml` and configure the service.
4.  Manually add the environment variables in the Render dashboard.

## Usage

1.  Open the frontend in your browser.
2.  Click **"Try Demo"**.
3.  Enter your phone number.
4.  Click **"Call Me"**.

## Troubleshooting

-   **Backend Connection**: Ensure frontend points to the correct backend URL (currently hardcoded to `http://localhost:3000` in `frontend/src/components/Hero.tsx`. For production, update this to your Render URL).
