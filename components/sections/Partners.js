"use client";

import Section from "@/components/ui/Section";
import { motion } from "framer-motion";

const PARTNERS = ["VERTEX", "LUMINA", "ECHO", "NEXUS", "QUANTUM", "STELLAR", "PRISM", "APEX"];

const keyframes = `
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .marquee-track { animation: marquee 32s linear infinite; }
  .marquee-track:hover { animation-play-state: paused; }
`;

export default function Partners() {
  return (
    <Section noPadding className="py-16 bg-white section-divide-top overflow-hidden">
      <style>{keyframes}</style>

      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-overline text-[var(--color-muted)]">Trusted by teams building the future</span>
      </motion.div>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, white 0%, transparent 100%)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, white 0%, transparent 100%)" }} />

        <div className="marquee-track flex">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <div key={i}
              className="flex-shrink-0 font-heading text-[1.375rem] font-bold text-black/18 hover:text-[var(--color-primary)] transition-colors duration-300 whitespace-nowrap px-12 cursor-default select-none"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
