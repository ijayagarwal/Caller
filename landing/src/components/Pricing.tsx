"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHeader } from "./CallDemo";

const tiers = [
  {
    name: "Starter",
    price: "₹5,000",
    sub: "/ month",
    plus: "+ ₹500 per confirmed meeting",
    feats: ["Up to 1,000 calls / month", "WhatsApp + SMS follow-up", "Transcript & analysis", "Hindi · Hinglish · English"],
    highlight: false,
  },
  {
    name: "Growth",
    price: "₹12,000",
    sub: "/ month",
    plus: "+ ₹400 per confirmed meeting",
    feats: ["Unlimited calls", "Multi-channel orchestration", "Aggregate analytics", "AI script suggestions"],
    highlight: true,
  },
  {
    name: "Scale",
    price: "₹25,000",
    sub: "/ month",
    plus: "+ ₹300 per confirmed meeting",
    feats: ["AI lead sourcing", "Custom voice cloning", "CRM sync (Zoho · HubSpot)", "Priority support"],
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Pricing"
          title="Pay for meetings. Not minutes."
          sub="No-shows are never charged. Free trial includes 50 calls. No credit card to start."
        />

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`relative rounded-3xl p-7 ${
                t.highlight
                  ? "bg-gradient-to-b from-accent-500/15 to-violet-glow/10 ring-1 ring-accent-400/30 shadow-[0_0_40px_-10px_rgba(56,189,248,0.4)]"
                  : "glass"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] tracking-widest font-medium px-3 py-1 rounded-full bg-accent-500 text-ink-950">
                  MOST POPULAR
                </span>
              )}
              <p className="text-[13px] text-zinc-400">{t.name}</p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-[40px] font-semibold tracking-tight">{t.price}</span>
                <span className="text-[14px] text-zinc-500">{t.sub}</span>
              </div>
              <p className="mt-1 text-[13px] text-accent-400">{t.plus}</p>
              <div className="mt-6 h-px bg-white/5" />
              <ul className="mt-6 space-y-3">
                {t.feats.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-zinc-300">
                    <Check className="w-4 h-4 text-accent-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#waitlist" className="mt-7 block text-center text-[13px] font-medium py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                Reserve early access
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
