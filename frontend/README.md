# Caller — AI Voice Companion Waitlist

A premium waitlist landing page for Caller, built with React + Vite.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment (Netlify)

1. Push to GitHub
2. Connect repo to Netlify
3. Netlify auto-detects settings from `netlify.toml`
4. Add custom domain in Netlify settings

### Environment

No environment variables required. Waitlist submissions go directly to Netlify Forms dashboard.

## 📁 Structure

```
├── public/          # Static assets (favicon, sitemap, robots.txt)
├── src/
│   ├── components/  # React components
│   ├── index.css    # Global styles
│   └── main.tsx     # App entry
├── index.html       # HTML template with SEO
├── netlify.toml     # Netlify config
└── vite.config.ts   # Vite config
```

## ✅ Features

- Netlify Forms integration (no backend needed)
- Full SEO optimization (OG tags, structured data, sitemap)
- Responsive design with smooth animations
- Social sharing buttons
- Honeypot spam protection