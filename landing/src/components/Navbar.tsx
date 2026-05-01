"use client";

import { motion } from "framer-motion";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 pt-5">
        <div className="glass-strong rounded-full flex items-center justify-between px-5 py-2.5">
          <Logo />

          <nav className="hidden md:flex items-center gap-7 text-[13px] text-zinc-300">
            <a href="#story" className="hover:text-white transition-colors">Story</a>
            <a href="#product" className="hover:text-white transition-colors">Product</a>
            <a href="#how" className="hover:text-white transition-colors">How it works</a>
            <a href="#why" className="hover:text-white transition-colors">Why CallAgent</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </nav>

          <a href="#waitlist" className="text-[13px] font-medium px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
            Get early access
          </a>
        </div>
      </div>
    </motion.header>
  );
}
