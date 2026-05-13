"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function CTA() {
  return (
    <section id="cta" className="section-py divider relative bg-[var(--color-surface)] overflow-hidden">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.1)}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.97, y: 20 },
              visible: {
                opacity: 1, scale: 1, y: 0,
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
              }
            }}
            className="relative overflow-hidden rounded-3xl px-10 py-20 md:px-20 md:py-24 text-center"
            style={{
              background: "linear-gradient(140deg, #5920a1 0%, #3b40c4 55%, #4c2f9e 100%)",
            }}
          >
            {/* Restrained background texture — subtle inner glow only */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 60%)",
              }}
              aria-hidden
            />
            {/* Very subtle dot grid */}
            <div
              className="absolute inset-0 opacity-[0.035] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "30px 30px",
              }}
              aria-hidden
            />

            <div className="relative z-10">
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 mb-8 backdrop-blur-sm"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"
                  style={{ animation: "glow-pulse 2.5s ease-in-out infinite" }}
                />
                <span className="text-overline text-white/65">Start a conversation</span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-[clamp(2rem,5vw,4rem)] font-heading leading-tight tracking-tight text-white mb-5"
              >
                Ready to build what&apos;s{" "}
                <span style={{ color: "var(--color-accent)" }}>next</span>?
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-body-lg text-white/70 mb-10 max-w-lg mx-auto leading-relaxed"
              >
                Talk to our team. No pitch decks, no sales scripts. Just an honest conversation about what you&apos;re building.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[var(--color-primary)] font-semibold text-[1rem] px-8 py-4 hover:bg-white/92 shadow-[0_8px_28px_rgba(0,0,0,0.18)] transition-all duration-200"
                >
                  Get Started
                </motion.a>
                <motion.a
                  href="#products"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white font-semibold text-[1rem] px-8 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-200"
                >
                  Explore our work
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
