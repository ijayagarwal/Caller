"use client";

import { motion } from "framer-motion";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? 36 : size === "sm" ? 24 : 28;
  const text = size === "lg" ? "text-[18px]" : "text-[15px]";
  return (
    <a href="#" className="flex items-center gap-2.5 group">
      <motion.div
        whileHover={{ rotate: 8, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 250 }}
        className="relative rounded-[10px] flex items-center justify-center overflow-hidden"
        style={{
          width: dim,
          height: dim,
          background: "linear-gradient(135deg, #38bdf8 0%, #8b5cf6 100%)",
          boxShadow: "0 0 24px -4px rgba(56,189,248,0.55)",
        }}
      >
        <span
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4), transparent 50%)" }}
        />
        <svg viewBox="0 0 24 24" width={dim * 0.55} height={dim * 0.55} fill="none">
          <path
            d="M5 6.5C5 5.67 5.67 5 6.5 5h2c.83 0 1.5.67 1.5 1.5v2c0 .83-.67 1.5-1.5 1.5h-.86c.92 3.59 3.78 6.45 7.36 7.36v-.86c0-.83.67-1.5 1.5-1.5h2c.83 0 1.5.67 1.5 1.5v2c0 .83-.67 1.5-1.5 1.5C9.94 19 5 14.06 5 8c0-.83.67-1.5 1.5-1.5z"
            fill="#05060a"
          />
        </svg>
      </motion.div>
      <span className={`font-display font-semibold tracking-tight ${text}`}>
        Call<span className="gradient-text">Agent</span>
        <span className="text-zinc-500 font-normal">.dev</span>
      </span>
    </a>
  );
}
