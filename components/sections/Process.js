"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

import { PROCESS_STEPS } from "@/lib/constants";


export default function Process() {
  return (
    <section
      id="process"
      className="section-py divider relative bg-white overflow-hidden"
    >
      {/* Soft left ambient */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 0% 50%, rgba(89,32,161,0.035) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={staggerContainer(0.1)}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-16 max-w-xl">
            <span className="text-overline text-[var(--color-primary)] mb-4 block">How we work</span>
            <h2 className="text-h1 mb-5">A process built on clarity</h2>
            <p className="text-body text-[var(--color-muted)]">
              No surprises. No fog. Working with Andromeda feels like having a senior engineering partner — present, precise, and committed.
            </p>
          </motion.div>

          {/* Steps — horizontal timeline on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 relative">
            {/* Connecting line (desktop) */}
            <div
              className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px"
              style={{ background: "linear-gradient(90deg, transparent, var(--color-border) 10%, var(--color-border) 90%, transparent)" }}
              aria-hidden
            />

            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative flex flex-col lg:items-center lg:text-center px-6 py-8 lg:py-0 lg:px-8 border-l border-[var(--color-border)] lg:border-l-0 first:border-l-0"
              >
                {/* Number circle */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6 text-[0.8125rem] font-bold tracking-widest font-heading border"
                  style={{
                    borderColor: `${step.accent}25`,
                    color: step.accent,
                    backgroundColor: `${step.accent}08`,
                  }}
                >
                  {step.number}
                </div>

                <h3 className="text-h3 mb-3 font-heading">{step.title}</h3>
                <p className="text-body-sm text-[var(--color-muted)] leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
