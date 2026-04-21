"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

/* ── MagneticButton ─────────────────────────────────────────────────
   Wraps any button/link. On hover the element magnetically follows
   the cursor within a radius, snapping back on leave.
   Usage: <MagneticButton><button>…</button></MagneticButton>
──────────────────────────────────────────────────────────────────── */
export function MagneticButton({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 200, damping: 18 });
  const y = useSpring(0, { stiffness: 200, damping: 18 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y, display: "inline-flex" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── TextShimmer ────────────────────────────────────────────────────
   Splits text into words, reveals each with a shimmer sweep.
   Usage: <TextShimmer text="Hello world" className="text-h1" />
──────────────────────────────────────────────────────────────────── */
export function TextShimmer({ text, className = "", delay = 0 }) {
  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="relative inline-block overflow-hidden"
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.75,
            delay: delay + i * 0.09,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
          {/* Shimmer sweep */}
          <motion.span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 30%, rgba(89,32,161,0.18) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
            }}
            initial={{ backgroundPosition: "-100% 0" }}
            whileInView={{ backgroundPosition: "200% 0" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: delay + i * 0.09 + 0.1, ease: "easeOut" }}
          />
        </motion.span>
      ))}
    </span>
  );
}

/* ── GlowDot ────────────────────────────────────────────────────────
   A pulsing glow dot — use as section accent / bullet
──────────────────────────────────────────────────────────────────── */
export function GlowDot({ color = "primary", size = 8 }) {
  const rgb = color === "accent" ? "239,90,152" : color === "secondary" ? "59,64,196" : "89,32,161";
  return (
    <span className="relative inline-flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}>
      <motion.span
        className="absolute rounded-full"
        style={{ width: size * 2.5, height: size * 2.5, background: `rgba(${rgb},0.2)` }}
        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="relative rounded-full"
        style={{ width: size, height: size, background: `rgba(${rgb},0.9)`,
                 boxShadow: `0 0 8px rgba(${rgb},0.7)` }} />
    </span>
  );
}
