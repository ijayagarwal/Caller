# Accounts to create — fresh setup checklist

You handle these manually (signup links, KYC, billing). I'll handle every integration in code once keys are ready.

## Tier 0 — Identity & domain (do first)
- [ ] **Brand email** — Google Workspace or Zoho Mail on `callagent.dev` (or final brand). Used everywhere.
- [ ] **Domain** — buy `callagent.dev` (or chosen brand) on Cloudflare Registrar (cheapest, auto-renew, DNS bundled).
- [ ] **GitHub** — create org `callagent-dev` (or use existing `ijayagarwal`). Free tier. We'll push the monorepo here.
- [ ] **Vercel** (free) — for hosting the landing page on the brand domain (1-click from GitHub repo).

## Tier 1 — Voice + telephony (Phase 1 critical path)
- [ ] **Vapi.ai** — sign up at vapi.ai, claim $1,350 grant. Get API key.
- [ ] **Plivo India** — plivo.com, complete Indian KYC + DLT entity registration (3–5 day approval). Rent first DID.
- [ ] **Deepgram** — deepgram.com, claim $15,000 credits.
- [ ] **Sarvam AI** — sarvam.ai, claim $1,000 credits + API key.
- [ ] **ElevenLabs** — elevenlabs.io, claim grant, pick voice (we'll A/B at chunk 7).
- [ ] **Anthropic** — console.anthropic.com, $2,500 credits, request Tier 4.
- [ ] **OpenAI** — platform.openai.com, $2,500 credits.

## Tier 2 — Infra (Phase 1 + 2)
- [ ] **Supabase** — supabase.com, claim $300 credit, create project in `ap-south-1` (Mumbai).
- [ ] **Azure** — azure.microsoft.com, activate $10K credit. Create: App Service plan (B2), Container Apps env, Azure Cache for Redis (Basic C0).
- [ ] **AWS** — aws.amazon.com, activate $10K. Create S3 bucket `aarambh-recordings` in `ap-south-1` with 90-day lifecycle.
- [ ] **Infisical** — infisical.com, claim $500. Create project, invite team.
- [ ] **Langfuse** — langfuse.com, claim $600. Create project.

## Tier 3 — Channels & payments (Phase 4–5)
- [ ] **Razorpay** — razorpay.com, complete Indian business KYC, claim 0% fees grant. Activate Subscriptions + Invoices APIs.
- [ ] **WhatsApp Business API** — via Meta Cloud API direct. Need: Facebook Business Manager, verified business, dedicated number. 5–10 day approval.
- [ ] **AgentMail** — agentmail.to, claim $60. Verify sending domain (DKIM + SPF on callagent.dev).
- [ ] **Cal.com** — cal.com (cloud free tier). Create team workspace.

## Tier 4 — Lead sourcing & growth (Phase 5)
- [ ] **Firecrawl** — firecrawl.dev, claim ~$500.
- [ ] **Browser Use** — browser-use.com, claim $500.

## Tier 5 — Optional / later (Phase 6)
- [ ] Fireworks AI · Unsloth · Tavus · Greptile · Sync. · xAI · Blaxel — claim credits, hold idle until needed.

---

## Hand back to me
Once accounts are live, share keys with me **only via Infisical** (never paste raw keys in chat). I'll read them via SDK at runtime. Required to start chunk 1: GitHub org, Supabase project URL + service-role key, Anthropic API key, Vercel project (for landing deploy).

## Brand
**Locked: CallAgent.dev** — domain owned, landing page already on-brand.
