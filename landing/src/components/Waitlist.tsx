"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section id="waitlist" className="relative py-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[28px] overflow-hidden p-10 sm:p-14 text-center hairline"
          style={{
            background:
              "radial-gradient(800px 300px at 50% 0%, rgba(56,189,248,0.18), transparent 60%), linear-gradient(180deg, rgba(16,19,30,0.7), rgba(10,12,20,0.7))",
          }}
        >
          <span className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-[12px] text-zinc-300 mb-6">
            <span className="dot bg-accent-400" /> Limited early access · 100 founding teams
          </span>
          <h2 className="font-display text-[36px] sm:text-[52px] leading-[1.05] tracking-tight font-semibold">
            Be one of the first 100 teams
            <span className="block shine-text">running sales on autopilot.</span>
          </h2>
          <p className="mt-5 text-[15px] text-zinc-400 max-w-xl mx-auto">
            Join the waitlist. We personally onboard the first cohort, free of cost, until your AI books its first meeting.
          </p>

          {!done ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.includes("@")) return;
                setDone(true);
              }}
              className="mt-9 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@work-email.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-[14px] placeholder:text-zinc-500 focus:outline-none focus:border-accent-400/50 focus:bg-white/[0.07] transition"
              />
              <button type="submit" className="btn-primary inline-flex items-center justify-center gap-2 group">
                Get early access
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-9 inline-flex items-center gap-2.5 glass rounded-full px-5 py-3 text-[14px]"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>You're on the list. We'll be in touch on <span className="text-accent-400">{email}</span>.</span>
            </motion.div>
          )}

          <p className="mt-6 text-[12px] text-zinc-500">
            We'll never spam. Unsubscribe in one click. By joining you agree to our Terms.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
