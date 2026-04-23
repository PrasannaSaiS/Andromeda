"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { fadeUp, staggerContainer } from "@/lib/motion";

// Deterministic orbs — no Math.random() to avoid SSR hydration mismatch
const ORBS = [
  { w: 320, h: 320, top: "-10%", left: "-5%",  delay: 0,   dur: 18 },
  { w: 240, h: 240, top: "60%",  left: "70%",  delay: 4,   dur: 22 },
  { w: 180, h: 180, top: "20%",  left: "85%",  delay: 8,   dur: 16 },
  { w: 200, h: 200, top: "75%",  left: "10%",  delay: 2,   dur: 20 },
];

export default function CTA() {
  return (
    <Section id="cta" className="section-padding section-divide-top">
      <motion.div
        initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer(0.12)}
      >
        <motion.div
          variants={{ hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}
          className="relative overflow-hidden rounded-3xl px-10 py-20 md:px-20 md:py-24 text-center"
          style={{ background: "linear-gradient(135deg, #5920a1 0%, #3b40c4 60%, #5920a1 100%)" }}
        >
          {/* Animated background orbs — CSS only */}
          {ORBS.map((orb, i) => (
            <div key={i}
              className="absolute rounded-full pointer-events-none"
              style={{ width: orb.w, height: orb.h, top: orb.top, left: orb.left,
                       background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
                       animation: `cta-pulse ${orb.dur}s ease-in-out infinite`,
                       animationDelay: `${orb.delay}s` }}
            />
          ))}

          {/* Dot grid overlay */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />

          <div className="relative z-10">
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <span className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white/70">
                Let's talk
              </span>
            </motion.div>

            <motion.h2 variants={fadeUp}
              className="text-[clamp(2.25rem,5vw,4rem)] font-heading leading-tight tracking-tight text-white mb-5"
            >
              Ready to build what's{" "}
              <span className="text-[var(--color-accent)]">next</span>?
            </motion.h2>

            <motion.p variants={fadeUp}
              className="text-[clamp(1rem,1.2vw,1.125rem)] text-white/75 mb-10 max-w-xl mx-auto leading-relaxed"
            >
              Talk to our team. No pitch decks. Just conversation.
            </motion.p>

            <motion.div variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a href="#contact"
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[var(--color-primary)] font-semibold text-[1rem] px-8 py-4 hover:bg-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-colors duration-200"
              >
                Get Started
              </motion.a>
              <motion.a href="#products"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 text-white font-semibold text-[1rem] px-8 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-200"
              >
                See Our Work
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
