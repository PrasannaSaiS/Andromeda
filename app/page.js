"use client";

import { motion } from "framer-motion";
import { METRICS, TESTIMONIAL } from "@/lib/constants";
import Section from "@/components/ui/Section";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Services  from "@/components/sections/Services";
import Products  from "@/components/sections/Products";
import AIExpertise from "@/components/sections/AIExpertise";
import Hero      from "@/components/sections/Hero";
import CTA       from "@/components/sections/CTA";
import Footer    from "@/components/sections/Footer";
import Contact   from "@/components/sections/Contact";
import Partners  from "@/components/sections/Partners";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { CosmicTopRight, CosmicBottomLeft, CosmicTopLeft, CosmicBottomRight, OrbitRing } from "@/components/ui/CosmicCorners";

const STATEMENTS = [
  "Intelligence, engineered.",
  "Platforms, invisible.",
  "Impact, undeniable.",
];

function BrandEssence() {
  return (
    <Section className="section-padding bg-surface section-divide-top relative overflow-hidden">
      <CosmicTopRight className="opacity-40" />
      <div className="relative pl-10 md:pl-16">
        {/* Left rail */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--color-border)]">
          <motion.div
            className="absolute top-0 left-0 w-full bg-[var(--color-accent)] rounded-full"
            style={{ height: "60px" }}
            initial={{ y: 0, opacity: 0 }}
            whileInView={{ y: [0, 120, 240], opacity: [0, 1, 0] }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
          />
        </div>

        <div className="space-y-14 md:space-y-20">
          {STATEMENTS.map((stmt, i) => (
            <motion.h2
              key={i}
              className="text-[clamp(2rem,4vw,3.75rem)] font-heading leading-tight tracking-tight"
              initial={{ opacity: 0, x: -32, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.85, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {stmt}
            </motion.h2>
          ))}
        </div>
      </div>
    </Section>
  );
}

function MetricsSection() {
  return (
    <Section className="section-padding bg-white section-divide-top relative overflow-hidden">
      <CosmicTopLeft className="opacity-40" />
      <CosmicBottomRight className="opacity-30" />
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)] rounded-2xl overflow-hidden"
        initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer(0.15)}
      >
        {METRICS.map((metric, i) => (
          <motion.div key={i} variants={fadeUp}
            className="flex flex-col items-center justify-center text-center bg-white px-8 py-14 group hover:bg-[var(--color-surface-tinted)] transition-colors duration-300"
          >
            <div className="text-[clamp(3rem,5.5vw,5rem)] font-heading text-[var(--color-primary)] leading-none mb-3 tabular-nums">
              <AnimatedCounter target={metric.value} suffix={metric.suffix} />
            </div>
            <div className="w-8 h-px bg-[var(--color-accent)] mb-3" />
            <span className="text-[0.8125rem] font-bold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              {metric.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function TestimonialSection() {
  return (
    <Section className="section-padding bg-surface-tinted section-divide-top relative overflow-hidden">
      <CosmicTopRight className="opacity-50" />
      <CosmicBottomLeft className="opacity-40" />
      <OrbitRing size={400} x="5%" y="50%" color="accent" className="opacity-20" />
      <div className="relative flex flex-col items-center text-center">
        {/* Giant quote mark */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 font-heading text-[12rem] leading-none text-[var(--color-primary)] opacity-[0.04] select-none pointer-events-none" aria-hidden>
          "
        </div>

        <motion.p
          className="relative text-[clamp(1.375rem,2.8vw,2.25rem)] font-heading italic leading-relaxed mb-10 max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {TESTIMONIAL.quote}
        </motion.p>

        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-heading text-lg">
            {TESTIMONIAL.author.charAt(0)}
          </div>
          <div className="text-left">
            <div className="text-[0.9375rem] font-bold text-black">{TESTIMONIAL.author}</div>
            <div className="text-[0.8125rem] text-[var(--color-muted)]">{TESTIMONIAL.title}</div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <BrandEssence />
      <Services />
      <Products />
      <AIExpertise />
      <Partners />
      <MetricsSection />
      <TestimonialSection />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
}
