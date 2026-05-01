"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Phone, Mic, MessageSquare, Calendar } from "lucide-react";

const turns = [
  { speaker: "AI", lang: "HI", text: "Hi Rohan ji, yeh CallAgent se call hai. Main directly point pe aata hoon — kya aapke paas 60 seconds hain?" },
  { speaker: "HUMAN", lang: "HI", text: "Haan bolo, kya baat hai." },
  { speaker: "AI", lang: "EN", text: "We help businesses like yours run sales calls automatically — your AI agent dials leads, handles objections, and books meetings on your calendar." },
  { speaker: "HUMAN", lang: "EN", text: "How is this different from a normal calling tool?" },
  { speaker: "AI", lang: "HI", text: "Aap sirf book hui meetings ke liye pay karte ho — minutes ke liye nahi. Friday ko 4 PM ka 15-minute slot kaisa hai?" },
  { speaker: "HUMAN", lang: "EN", text: "Friday 4 PM works." },
  { speaker: "AI", lang: "EN", text: "Booked. Calendar invite WhatsApp pe abhi bhej raha hoon. Thank you Rohan ji!" },
];

export function CallDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (visible >= turns.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 400 : 1100);
    return () => clearTimeout(t);
  }, [inView, visible]);

  return (
    <section id="product" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Live conversation"
          title="Sounds like a real person. Closes like your best one."
          sub="Switches between Hindi, Hinglish, and English mid-sentence — naturally. Books meetings without you lifting a finger."
        />

        <div ref={ref} className="mt-16 grid lg:grid-cols-12 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass rounded-3xl p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-accent-500 to-violet-glow flex items-center justify-center">
                  <Phone className="w-4 h-4 text-ink-950" />
                  <span className="absolute inset-0 rounded-full ring-2 ring-accent-500/40 animate-ping" />
                </div>
                <div>
                  <p className="text-[13px] font-medium">Live call · Rohan Sharma</p>
                  <p className="text-[11px] text-zinc-500">Mumbai · EdTech founder</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                <span className="dot bg-emerald-400 animate-pulse" />
                In progress · 00:42
              </div>
            </div>

            <div className="space-y-3 max-h-[440px] overflow-hidden">
              {turns.slice(0, visible).map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex ${t.speaker === "AI" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
                      t.speaker === "AI"
                        ? "bg-gradient-to-br from-accent-500/15 to-violet-glow/15 border border-accent-500/20 text-zinc-100"
                        : "bg-white/5 border border-white/10 text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-medium tracking-wide ${t.speaker === "AI" ? "text-accent-400" : "text-zinc-400"}`}>
                        {t.speaker === "AI" ? "CALLAGENT" : "ROHAN"}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-400">{t.lang}</span>
                    </div>
                    {t.text}
                  </div>
                </motion.div>
              ))}
              {visible < turns.length && (
                <div className="flex items-center gap-2 text-zinc-500 text-[12px] pl-2">
                  <Mic className="w-3 h-3" />
                  <span className="flex gap-1">
                    <span className="w-1 h-1 rounded-full bg-zinc-500 animate-bounce" />
                    <span className="w-1 h-1 rounded-full bg-zinc-500 animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1 h-1 rounded-full bg-zinc-500 animate-bounce [animation-delay:0.3s]" />
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          <div className="lg:col-span-5 grid gap-4">
            <SideCard
              icon={<Calendar className="w-4 h-4" />}
              title="Meeting booked"
              body="Friday · 4:00 PM IST · 15 min · Auto-confirmed on calendar."
              tone="emerald"
              delay={0.6}
            />
            <SideCard
              icon={<MessageSquare className="w-4 h-4" />}
              title="WhatsApp confirmation sent"
              body="Calendar link + reminder scheduled 1 hour before."
              tone="accent"
              delay={0.8}
            />
            <SideCard
              icon={<Mic className="w-4 h-4" />}
              title="Call transcribed & analysed"
              body="Interest score 9/10 · Language: Hinglish · Promise to follow up: none."
              tone="violet"
              delay={1.0}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SideCard({
  icon, title, body, tone, delay,
}: { icon: React.ReactNode; title: string; body: string; tone: "emerald" | "accent" | "violet"; delay: number }) {
  const ring = tone === "emerald" ? "ring-emerald-400/30" : tone === "accent" ? "ring-accent-400/30" : "ring-violet-glow/30";
  const chip = tone === "emerald" ? "bg-emerald-400/15 text-emerald-300" : tone === "accent" ? "bg-accent-400/15 text-accent-400" : "bg-violet-glow/15 text-violet-300";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className={`glass rounded-2xl p-5 ring-1 ${ring}`}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <span className={`w-7 h-7 rounded-lg flex items-center justify-center ${chip}`}>{icon}</span>
        <p className="text-[14px] font-medium">{title}</p>
      </div>
      <p className="text-[13px] text-zinc-400 leading-relaxed">{body}</p>
    </motion.div>
  );
}

export function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="max-w-3xl">
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-accent-400"
      >
        <span className="w-6 h-px bg-accent-400" /> {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display mt-3 text-[34px] sm:text-[48px] leading-[1.05] tracking-tight font-semibold"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-4 text-[15px] sm:text-[17px] text-zinc-400 leading-relaxed"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
