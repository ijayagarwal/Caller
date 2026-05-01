"use client";

import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-12">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Logo size="md" />
            <p className="mt-4 text-[13px] text-zinc-400 leading-relaxed max-w-sm">
              The autonomous AI sales agent. Calls every lead, in their language, books real meetings — while you sleep.
            </p>
            <p className="mt-6 text-[11px] text-zinc-600 code-tag">
              callagent.dev · made with care, somewhere between Bengaluru and the cloud
            </p>
          </div>

          <FooterCol title="Product" items={[
            { label: "Story", href: "#story" },
            { label: "Live demo", href: "#product" },
            { label: "How it works", href: "#how" },
            { label: "Pricing", href: "#pricing" },
          ]}/>
          <FooterCol title="Company" items={[
            { label: "Why CallAgent", href: "#why" },
            { label: "Waitlist", href: "#waitlist" },
            { label: "hello@callagent.dev", href: "mailto:hello@callagent.dev" },
          ]}/>
          <FooterCol title="Legal" items={[
            { label: "Privacy", href: "#" },
            { label: "Terms", href: "#" },
            { label: "DPA", href: "#" },
          ]}/>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-zinc-600">
          <span>© {new Date().getFullYear()} CallAgent.dev — All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="dot bg-emerald-400 animate-pulse" /> All systems normal
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div className="md:col-span-2">
      <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 mb-4">{title}</p>
      <ul className="space-y-2.5">
        {items.map((i) => (
          <li key={i.label}>
            <a href={i.href} className="text-[13px] text-zinc-300 hover:text-white transition-colors">
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
