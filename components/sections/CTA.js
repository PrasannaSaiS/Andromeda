"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { fadeUp } from "@/lib/motion";

export default function CTA() {
  return (
    <Section id="cta" className="border-t border-border bg-surface overflow-hidden relative">
      {/* Subtle background flair */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[800px] h-[800px] bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_60%)] opacity-10 rounded-full blur-3xl mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          <motion.h2 
            variants={fadeUp}
            className="text-[clamp(3rem,6vw,6rem)] font-heading leading-tight tracking-tight text-black mb-8 text-balance"
          >
            Let's Build the <span className="text-[var(--color-primary)]">Future</span>
          </motion.h2>
          
          <motion.div variants={fadeUp}>
            <Button variant="primary" size="lg" href="#contact">
              Start with Andromeda
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
