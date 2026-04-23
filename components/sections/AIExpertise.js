"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { fadeUp, slideLeft, slideRight, staggerContainer } from "@/lib/motion";
import { CosmicTopLeft, CosmicBottomRight, OrbitRing } from "@/components/ui/CosmicCorners";

const EXPERTISE = [
  "Artificial Intelligence",
  "Machine Learning",
  "Deep Learning",
  "Data Science",
];

export default function AIExpertise() {
  return (
    <Section id="ai-expertise" className="section-padding bg-surface section-divide-top overflow-hidden relative">
      <CosmicTopLeft className="opacity-60" />
      <CosmicBottomRight className="opacity-50" />
      {/* Slow background orbit */}
      <OrbitRing size={500} x="90%" y="50%" color="secondary" className="opacity-30" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Left — copy */}
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.1)}
        >
          <motion.span variants={fadeUp} className="text-overline text-[var(--color-primary)] mb-4 block">
            Intelligence
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-h2 mb-6">
            Cognitive infrastructure at scale.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-body text-[var(--color-muted)] mb-10 leading-relaxed">
            We don't just use APIs. We architect neural systems, train bespoke models, and deploy intelligence directly to the edge. Data is your raw material; we build the refinery.
          </motion.p>

          <motion.ul className="space-y-4" variants={staggerContainer(0.1)}>
            {EXPERTISE.map((item, i) => (
              <motion.li key={i} variants={fadeUp}
                className="flex items-center gap-4 text-[1rem] font-semibold text-black group"
              >
                <motion.div
                  className="w-8 h-px bg-[var(--color-primary)] origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right — orbital visual */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-72 h-72 lg:w-96 lg:h-96">
            {/* Outer ring — CSS spin */}
            <div
              className="absolute inset-0 rounded-full border border-dashed border-[var(--color-primary)] opacity-15"
              style={{ animation: "cosmic-spin 40s linear infinite" }}
            />
            {/* Mid ring — CSS spin reverse */}
            <div
              className="absolute inset-8 rounded-full border border-[var(--color-secondary)] opacity-10"
              style={{ animation: "cosmic-spin 28s linear infinite reverse" }}
            />
            {/* Inner ring — CSS spin */}
            <div
              className="absolute inset-16 rounded-full border border-[var(--color-primary)] opacity-20"
              style={{ animation: "cosmic-spin 18s linear infinite" }}
            />

            {/* Orbiting dot — CSS spin */}
            <div
              className="absolute inset-0"
              style={{ animation: "cosmic-spin 8s linear infinite" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_rgba(239,90,152,0.6)]" />
            </div>

            {/* Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-full w-28 h-28 flex flex-col items-center justify-center border border-[var(--color-border)] shadow-sm">
                <div className="text-[2rem] font-heading text-[var(--color-primary)] leading-none">AI</div>
                <div className="text-[0.625rem] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)] mt-1">Native</div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </Section>
  );
}
