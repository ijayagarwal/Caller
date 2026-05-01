"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./CallDemo";

const steps = [
  {
    num: "01",
    title: "Tell us what you sell",
    body: "Answer 7 simple questions. We auto-generate your AI's pitch, opener, and objection handlers. No prompts to write.",
  },
  {
    num: "02",
    title: "Upload leads — or let AI source them",
    body: "Drop a CSV or just describe your ideal customer. We scrape, enrich, and queue leads automatically.",
  },
  {
    num: "03",
    title: "AI calls every lead",
    body: "Hindi, Hinglish, English. Handles objections, books meetings, follows up across WhatsApp + email.",
  },
  {
    num: "04",
    title: "You see meetings, not minutes",
    body: "Every booked meeting lands on your calendar. Pay only for the ones that actually happen.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="How it works"
          title="From signup to first booked meeting in 24 hours."
        />

        <div className="mt-16 grid lg:grid-cols-4 gap-px bg-white/5 rounded-3xl overflow-hidden hairline">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-ink-900 p-8 relative"
            >
              <div className="text-[11px] tracking-[0.2em] text-accent-400 mb-5">STEP {s.num}</div>
              <h3 className="font-display text-[22px] font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-[14px] text-zinc-400 leading-relaxed">{s.body}</p>
              <div className="mt-6 h-px bg-gradient-to-r from-accent-500/40 via-violet-glow/30 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
