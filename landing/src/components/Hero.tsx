"use client";

import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <SignalOrb />

      <div className="relative mx-auto max-w-7xl px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-strong rounded-full px-3.5 py-1.5 text-[12px] text-zinc-300 mb-7"
          >
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-400" />
            </span>
            Coming soon · The autonomous AI sales agent
          </motion.div>

          <h1 className="font-display tracking-tight text-[44px] sm:text-[68px] md:text-[88px] leading-[0.96] font-semibold max-w-[1100px]">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="block"
            >
              Hire one AI agent.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="block shine-text"
            >
              Replace your sales floor.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-7 max-w-[660px] text-[16px] sm:text-[19px] text-zinc-400 leading-relaxed"
          >
            CallAgent dials every lead, pitches in their language, handles objections, and books real meetings on your calendar — while you sleep.
            <span className="text-zinc-200"> Pay per meeting attended. Never per minute.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <a href="#waitlist" className="btn-primary inline-flex items-center gap-2 group">
              Reserve your AI agent
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#product" className="btn-ghost inline-flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              Hear it in action
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="mt-16 flex items-center gap-x-7 gap-y-3 flex-wrap justify-center text-[12px] text-zinc-500"
          >
            <Trust>Speaks 11 languages · Hindi, Hinglish, English native</Trust>
            <Trust>Sub-second voice latency</Trust>
            <Trust>Outcome-based pricing</Trust>
            <Trust>Self-serve in 10 minutes</Trust>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Trust({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="dot bg-accent-400" /> {children}
    </div>
  );
}

function SignalOrb() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="w-[820px] h-[820px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(56,189,248,0.32), rgba(139,92,246,0.20) 50%, transparent 75%)",
          filter: "blur(48px)",
        }}
      />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 rounded-full border border-white/10"
          style={{ width: 320 + i * 180, height: 320 + i * 180, x: "-50%", y: "-50%" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60 + i * 30, repeat: Infinity, ease: "linear" }}
        >
          <span
            className="absolute w-2 h-2 rounded-full bg-accent-400 shadow-[0_0_20px_rgba(56,189,248,0.9)]"
            style={{ top: -4, left: "50%" }}
          />
        </motion.div>
      ))}
    </div>
  );
}
