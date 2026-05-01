"use client";

import { motion } from "framer-motion";

const stats = [
  { v: "<800ms", l: "voice latency" },
  { v: "11", l: "languages live" },
  { v: "₹0", l: "for no-shows" },
  { v: "10 min", l: "to first call" },
  { v: "24×7", l: "always dialing" },
  { v: "100%", l: "transcribed + analysed" },
  { v: "3×", l: "calls/hour vs human SDR" },
];

export function StatsStrip() {
  return (
    <section className="relative py-14 border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-500/[0.04] via-violet-glow/[0.05] to-fuchsia-500/[0.04]" />
      <div className="relative scroll-fade">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap min-w-[200%]"
        >
          {[...stats, ...stats, ...stats].map((s, i) => (
            <div key={i} className="flex items-baseline gap-3 shrink-0">
              <span className="font-display text-[32px] sm:text-[40px] font-semibold gradient-text tracking-tight">
                {s.v}
              </span>
              <span className="text-[13px] text-zinc-500 uppercase tracking-wider">{s.l}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-700 mx-3" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
