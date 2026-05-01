"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./CallDemo";
import { PhoneCall, Languages, Brain, MessagesSquare, BarChart3, ShieldCheck, Database, Workflow } from "lucide-react";

const features = [
  { icon: PhoneCall, title: "Autonomous voice calls", body: "AI dials your leads in waves, handles full sales conversations, and books meetings — 24×7, with sub-second response latency." },
  { icon: Languages, title: "Native Hindi & Hinglish", body: "Switch languages mid-sentence. Sounds like a sharp Indian salesperson, not a robotic American voicebot." },
  { icon: Brain, title: "Anti-hallucination guardrails", body: "Every product fact is verified against your knowledge base before the AI says it. No invented prices, ever." },
  { icon: MessagesSquare, title: "Multi-channel follow-up", body: "Coordinated WhatsApp, SMS, and email sequences automatically triggered by every call outcome." },
  { icon: BarChart3, title: "Transcript intelligence", body: "Every call transcribed, sentiment-tagged, and analysed. Your script gets smarter with every conversation." },
  { icon: Workflow, title: "Self-serve onboarding", body: "Answer 7 plain questions. Your AI agent is configured, your script is generated, your first campaign is live in 10 minutes." },
  { icon: ShieldCheck, title: "Outcome-based pricing", body: "Pay per confirmed meeting attended. No-shows are not charged. Trust built into the price." },
  { icon: Database, title: "AI lead sourcing", body: "Describe your ideal customer in one sentence. We source enriched leads from JustDial, IndiaMART, LinkedIn." },
];

export function Features() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="What CallAgent does"
          title="The full sales motion. On autopilot."
          sub="Not just dialling. CallAgent runs the whole sales loop — lead → call → follow-up → meeting → closed — across every channel your customer uses."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-3xl overflow-hidden hairline">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="group relative bg-ink-900 p-7 hover:bg-ink-800 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500/20 to-violet-glow/20 ring-1 ring-white/10 flex items-center justify-center mb-5 group-hover:ring-accent-400/40 transition">
                <f.icon className="w-4 h-4 text-accent-400" />
              </div>
              <h3 className="text-[15px] font-medium tracking-tight">{f.title}</h3>
              <p className="mt-2 text-[13px] text-zinc-400 leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
