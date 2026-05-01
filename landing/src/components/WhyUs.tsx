"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./CallDemo";
import { Check, X } from "lucide-react";

const rows = [
  { feature: "Self-serve in under 10 minutes", us: true, them: false },
  { feature: "Pay per meeting attended, not per minute", us: true, them: false },
  { feature: "Native Hinglish (not just English)", us: true, them: false },
  { feature: "Multi-channel (call + WA + SMS + email)", us: true, them: false },
  { feature: "Built-in lead sourcing", us: true, them: false },
  { feature: "Transcript intelligence + script learning", us: true, them: false },
  { feature: "Anti-hallucination guardrails by design", us: true, them: false },
];

export function WhyUs() {
  return (
    <section id="why" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Why CallAgent"
          title="Built for the modern world. Priced for trust."
          sub="Most AI calling tools charge per minute, ship in English only, and hallucinate prices. CallAgent is built the opposite way."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 glass rounded-3xl overflow-hidden"
        >
          <div className="grid grid-cols-12 px-6 py-4 text-[12px] uppercase tracking-wider text-zinc-500 border-b border-white/5">
            <div className="col-span-6">Capability</div>
            <div className="col-span-3 text-center">
              <span className="font-display text-[14px] normal-case tracking-tight gradient-text">CallAgent</span>
            </div>
            <div className="col-span-3 text-center">Other AI dialers</div>
          </div>
          {rows.map((r, i) => (
            <motion.div
              key={r.feature}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="grid grid-cols-12 px-6 py-4 items-center border-b border-white/5 last:border-0"
            >
              <div className="col-span-6 text-[14px] text-zinc-200">{r.feature}</div>
              <div className="col-span-3 flex justify-center">
                <span className="w-7 h-7 rounded-full bg-emerald-400/15 ring-1 ring-emerald-400/30 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-emerald-300" strokeWidth={3} />
                </span>
              </div>
              <div className="col-span-3 flex justify-center">
                <span className="w-7 h-7 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center">
                  <X className="w-3.5 h-3.5 text-zinc-500" strokeWidth={2.5} />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
