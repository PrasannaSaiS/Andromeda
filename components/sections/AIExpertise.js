"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

import { AI_EXPERTISE, AI_DIFFERENTIATORS } from "@/lib/constants";


export default function AIExpertise() {
  return (
    <section
      id="ai-expertise"
      className="section-py divider relative bg-[var(--color-surface-tinted)] overflow-hidden"
    >
      {/* Ambient accent top-right */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 100% 0%, rgba(59,64,196,0.045) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left — copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer(0.1)}
          >
            <motion.span variants={fadeUp} className="text-overline text-[var(--color-primary)] mb-4 block">
              AI Expertise
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-h1 mb-6">
              Intelligence, built{" "}
              <span className="text-gradient">from scratch.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-body text-[var(--color-muted)] mb-12 leading-relaxed max-w-lg">
              We don't wrap APIs and call it AI. We architect neural systems, train bespoke models,
              and deploy intelligence directly to the edge. Your data is the ore — we build the refinery.
            </motion.p>

            <motion.ul className="space-y-5" variants={staggerContainer(0.08)}>
              {AI_EXPERTISE.map((item, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-5"
                >
                  <div className="flex-shrink-0 mt-1.5">
                    <motion.div
                      className="w-6 h-px bg-[var(--color-primary)] origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <div>
                    <div className="text-[0.9375rem] font-semibold text-[var(--color-text)] mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-body-sm text-[var(--color-muted)]">{item.desc}</div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right — clean orbital visual */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-72 h-72 lg:w-80 lg:h-80">
              {/* Outer ring */}
              <div
                className="absolute inset-0 rounded-full border border-dashed"
                style={{
                  borderColor: "rgba(89,32,161,0.14)",
                  animation: "orbit-spin 45s linear infinite",
                }}
              />
              {/* Mid ring */}
              <div
                className="absolute inset-8 rounded-full border"
                style={{
                  borderColor: "rgba(59,64,196,0.1)",
                  animation: "orbit-spin 30s linear infinite reverse",
                }}
              />
              {/* Inner ring */}
              <div
                className="absolute inset-16 rounded-full border"
                style={{
                  borderColor: "rgba(89,32,161,0.16)",
                  animation: "orbit-spin 18s linear infinite",
                }}
              />

              {/* Orbiting accent dot on outer ring */}
              <div
                className="absolute inset-0"
                style={{ animation: "orbit-spin 10s linear infinite" }}
              >
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                  style={{
                    background: "var(--color-accent)",
                    boxShadow: "0 0 12px rgba(239,90,152,0.5)",
                  }}
                />
              </div>

              {/* Orbiting dot on mid ring (opposite direction) */}
              <div
                className="absolute inset-8"
                style={{ animation: "orbit-spin 16s linear infinite reverse" }}
              >
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "var(--color-secondary)",
                    boxShadow: "0 0 8px rgba(59,64,196,0.4)",
                  }}
                />
              </div>

              {/* Center badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-28 h-28 rounded-full flex flex-col items-center justify-center border border-[var(--color-border)] bg-white shadow-sm"
                >
                  <div className="text-[2rem] font-heading text-[var(--color-primary)] leading-none">AI</div>
                  <div className="text-[0.5625rem] font-bold uppercase tracking-[0.22em] text-[var(--color-muted)] mt-1">Native</div>
                </div>
              </div>

              {/* Stats overlaid */}
              <div className="absolute -bottom-14 left-0 right-0 flex items-center justify-center gap-8">
                {AI_DIFFERENTIATORS.map((d, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[1.375rem] font-heading text-[var(--color-primary)] leading-none">{d.value}</div>
                    <div className="text-[0.6875rem] text-[var(--color-muted)] mt-0.5">{d.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
