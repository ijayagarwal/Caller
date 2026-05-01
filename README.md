# CallAgent.dev

The autonomous AI sales agent. Calls every lead in their language, handles objections, books real meetings on your calendar — while you sleep. **Pay per meeting attended, never per minute.**

> Status: pre-launch · landing page live · core platform in build

---

## What's in this repo

```
pro1/
├── landing/                          # Next.js 14 marketing landing page (callagent.dev)
├── product_blueprint_first_principles.html   # full product blueprint
└── ACCOUNTS_TODO.md                  # external accounts to provision (vendor + infra)
```

## Landing page — local dev

```bash
cd landing
npm install
npm run dev
# open http://localhost:3000
```

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide Icons · Inter + Space Grotesk.

## Sections

1. **Hero** — animated signal-orb with orbiting nodes, dual-line headline, trust strip
2. **Stats marquee** — infinite-scroll metrics ribbon
3. **Story** — 5-chapter scroll-driven narrative ("The day Maya stopped dialing forever")
4. **Live call demo** — animated bubble-by-bubble Hindi/Hinglish/English conversation with side-cards (meeting booked, WhatsApp confirmation, transcript analysed)
5. **Voice visual** — animated waveform + auto-cycling multilingual phrases (Hindi · Hinglish · English · Tamil · Spanish · Arabic …)
6. **Features grid** — 8 capabilities
7. **How it works** — 4-step flow
8. **Why CallAgent** — comparison vs other AI dialers
9. **Pricing** — outcome-based tiers
10. **Waitlist** — email capture
11. **Footer** — global brand + system-status

## Deploying

The `landing/` folder is a standalone Next.js app. Deploy to Vercel:

```bash
cd landing
npx vercel --prod
```

Set the production domain to `www.callagent.dev`.

## What's next (roadmap)

The full 40-chunk product roadmap lives in [product_blueprint_first_principles.html](./product_blueprint_first_principles.html). Phase 1 starts with the autonomous voice calling engine — the chunk that proves the product works end-to-end on a single live call.

External accounts that need to be created before Phase 1 begins are listed in [ACCOUNTS_TODO.md](./ACCOUNTS_TODO.md).
