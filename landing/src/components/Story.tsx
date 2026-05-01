"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Frown, Coffee, Phone, Calendar, Smile } from "lucide-react";

const chapters = [
  {
    time: "9:14 AM",
    icon: Frown,
    title: "Maya has 800 leads. And one phone.",
    body: "She runs a 12-person edtech in Pune. The list is fresh. Her two interns will get through maybe 60 calls today. The other 740 leads will go cold by next week.",
    accent: "from-rose-400/30 to-rose-500/0",
    pin: "left",
  },
  {
    time: "10:02 AM",
    icon: Coffee,
    title: "She turns CallAgent on.",
    body: "Seven questions. Upload a brochure. Pick the campaign goal: book demos. Done. In 6 minutes the agent is configured, the script is generated, the dialer is warm.",
    accent: "from-accent-500/30 to-accent-500/0",
    pin: "right",
  },
  {
    time: "10:09 AM",
    icon: Phone,
    title: "It starts calling.",
    body: "Lead by lead. In Hindi when they answer in Hindi. In English when they don't. Handles the same five objections it heard on the last 80 calls — better each time.",
    accent: "from-violet-glow/30 to-violet-glow/0",
    pin: "left",
  },
  {
    time: "1:47 PM",
    icon: Calendar,
    title: "Her phone buzzes. Meeting booked.",
    body: "WhatsApp alert: 'Hot lead — Rohan, Mumbai, interest 9/10, demo Friday 4 PM.' By evening there are 11 more. She didn't dial a single one.",
    accent: "from-emerald-400/30 to-emerald-400/0",
    pin: "right",
  },
  {
    time: "Tomorrow",
    icon: Smile,
    title: "Maya hires a second AI agent.",
    body: "This time for cold follow-ups in Tamil. Same 6-minute setup. Now her two interns spend their days in actual demos — not dialing dead numbers.",
    accent: "from-fuchsia-400/30 to-fuchsia-400/0",
    pin: "left",
  },
];

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="story" ref={ref} className="relative py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-accent-400"
          >
            <span className="w-6 h-px bg-accent-400" /> A short story
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display mt-4 text-[36px] sm:text-[52px] leading-[1.05] tracking-tight font-semibold"
          >
            The day Maya stopped <br />
            <span className="gradient-text">dialing forever.</span>
          </motion.h2>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-white/5" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-1/2 top-0 -translate-x-1/2 w-px bg-gradient-to-b from-accent-400 via-violet-glow to-fuchsia-400"
          />

          <div className="space-y-24">
            {chapters.map((c, i) => (
              <Chapter key={i} {...c} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Chapter({
  time, icon: Icon, title, body, accent, pin, index,
}: typeof chapters[number] & { index: number }) {
  const isLeft = pin === "left";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-16 items-center"
    >
      <div className={`md:order-${isLeft ? 1 : 2} ${isLeft ? "md:text-right md:pr-2" : "md:text-left md:pl-2"}`}>
        <div className={`inline-flex items-center gap-2 mb-3 ${isLeft ? "md:flex-row-reverse" : ""}`}>
          <span className="code-tag text-zinc-500">{time}</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span className="code-tag text-accent-400">CHAPTER 0{index + 1}</span>
        </div>
        <h3 className="font-display text-[24px] sm:text-[30px] leading-tight font-semibold tracking-tight">{title}</h3>
        <p className="mt-3 text-[15px] text-zinc-400 leading-relaxed">{body}</p>
      </div>

      <div className={`md:order-${isLeft ? 2 : 1} flex ${isLeft ? "md:justify-start" : "md:justify-end"} justify-center`}>
        <div className={`relative w-[180px] h-[180px] rounded-3xl bg-gradient-to-br ${accent} ring-1 ring-white/10 overflow-hidden flex items-center justify-center group`}>
          <div className="absolute inset-0 grid-bg opacity-30" />
          <Icon className="w-12 h-12 text-white relative z-10" strokeWidth={1.4} />
        </div>
      </div>

      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
        <span className="w-3 h-3 rounded-full bg-ink-950 ring-2 ring-accent-400 shadow-[0_0_18px_rgba(56,189,248,0.7)]" />
      </div>
    </motion.div>
  );
}
