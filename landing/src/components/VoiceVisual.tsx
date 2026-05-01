"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Globe2, Languages } from "lucide-react";

const lines = [
  { lang: "Hindi",    flag: "🇮🇳", text: "Sir, main aapke liye Friday 4 PM ka slot reserve kar deta hoon?" },
  { lang: "Hinglish", flag: "🇮🇳", text: "Honestly, ye 15 minute aapki team ke productivity ko 3x kar sakta hai." },
  { lang: "English",  flag: "🇺🇸", text: "We pay only for meetings that actually happen — no-shows are never charged." },
  { lang: "Tamil",    flag: "🇮🇳", text: "Naanga unga business-ku innum efficient-a sales podradhukku help pannuvom." },
  { lang: "Spanish",  flag: "🇪🇸", text: "Reservo una demostración para el viernes a las 4 de la tarde, ¿le parece bien?" },
  { lang: "Arabic",   flag: "🇦🇪", text: "هل يمكنني حجز موعد عرض توضيحي يوم الجمعة الساعة الرابعة مساءً؟" },
];

export function VoiceVisual() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % lines.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-accent-400">
              <span className="w-6 h-px bg-accent-400" /> One agent · Every language
            </span>
            <h2 className="font-display mt-4 text-[34px] sm:text-[48px] leading-[1.05] tracking-tight font-semibold">
              Your customer never <br />
              <span className="gradient-text">code-switches alone.</span>
            </h2>
            <p className="mt-5 text-[16px] text-zinc-400 leading-relaxed max-w-lg">
              Real Indian conversations don't happen in one language. CallAgent flows between Hindi, Hinglish, and English mid-sentence — and ships in 11 more languages out of the box.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-2">
              {["Hindi", "Hinglish", "English", "Tamil", "Telugu", "Bengali", "Marathi", "Spanish", "Arabic", "Portuguese", "French", "Indonesian"].map((l) => (
                <span key={l} className="text-[12px] px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">{l}</span>
              ))}
            </div>
            <div className="mt-7 flex items-center gap-5 text-[12px] text-zinc-500">
              <div className="flex items-center gap-2"><Globe2 className="w-3.5 h-3.5 text-accent-400" /> 11 languages live</div>
              <div className="flex items-center gap-2"><Languages className="w-3.5 h-3.5 text-violet-glow" /> Mid-sentence switching</div>
            </div>
          </div>

          <div className="relative">
            <div className="gradient-border p-7 sm:p-9">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-[12px] text-zinc-400">
                  <span className="dot bg-emerald-400 animate-pulse" /> CallAgent · live
                </div>
                <div className="code-tag text-zinc-600">latency 412ms</div>
              </div>

              <div className="h-24 flex items-end justify-center gap-1.5">
                {Array.from({ length: 36 }).map((_, i) => (
                  <span
                    key={i}
                    className="bar w-1 rounded-full"
                    style={{
                      height: `${20 + ((i * 13) % 70)}%`,
                      animationDelay: `${(i * 80) % 1100}ms`,
                      background: i % 3 === 0
                        ? "linear-gradient(to top, #38bdf8, #8b5cf6)"
                        : "linear-gradient(to top, rgba(56,189,248,0.6), rgba(139,92,246,0.6))",
                    }}
                  />
                ))}
              </div>

              <div className="mt-6 min-h-[120px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[18px]">{lines[idx].flag}</span>
                      <span className="text-[11px] uppercase tracking-wider text-accent-400">{lines[idx].lang}</span>
                    </div>
                    <p className="text-[16px] sm:text-[17px] text-zinc-100 leading-snug" dir={lines[idx].lang === "Arabic" ? "rtl" : "ltr"}>
                      "{lines[idx].text}"
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-6 flex items-center justify-between text-[11px] text-zinc-500">
                <div className="flex gap-4">
                  <span>STT · Deepgram + Sarvam</span>
                  <span>LLM · Claude</span>
                  <span>TTS · ElevenLabs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
