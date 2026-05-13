"use client";

import { motion } from "framer-motion";
import { METRICS, TESTIMONIAL } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Hero       from "@/components/sections/Hero";
import Services   from "@/components/sections/Services";
import Products   from "@/components/sections/Products";
import AIExpertise from "@/components/sections/AIExpertise";
import Process    from "@/components/sections/Process";
import Contact    from "@/components/sections/Contact";
import CTA        from "@/components/sections/CTA";
import Footer     from "@/components/sections/Footer";

// ── Brand Statements — calm, authoritative ────────────────────────
const STATEMENTS = [
  "Intelligence, engineered.",
  "Platforms, invisible.",
  "Impact, undeniable.",
];

function BrandEssence() {
  return (
    <section className="section-py divider relative bg-white overflow-hidden">
      {/* Hairline left rail */}
      <div className="container">
        <div className="relative pl-10 md:pl-16 border-l border-[var(--color-border)]">
          {/* Animated rail dot */}
          <motion.div
            className="absolute left-0 top-0 w-px"
            style={{ height: "56px", translateX: "-0.5px" }}
          >
            <motion.div
              className="w-full bg-[var(--color-primary)] rounded-full"
              style={{ height: "100%" }}
              initial={{ y: 0, opacity: 0 }}
              whileInView={{ y: [0, 160, 320], opacity: [0, 1, 0] }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 2.6, ease: "easeInOut" }}
            />
          </motion.div>

          <div className="space-y-12 md:space-y-16">
            {STATEMENTS.map((stmt, i) => (
              <motion.h2
                key={i}
                className="font-heading leading-tight tracking-tight text-black"
                style={{ fontSize: "clamp(1.875rem, 3.5vw, 3.5rem)", letterSpacing: "-0.025em" }}
                initial={{ opacity: 0, x: -24, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {stmt}
              </motion.h2>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Metrics — clean numbers ────────────────────────────────────────
function MetricsSection() {
  return (
    <section className="divider relative bg-[var(--color-surface)] overflow-hidden">
      <div className="container">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.12)}
        >
          {METRICS.map((metric, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col items-center justify-center text-center px-8 py-16 group"
            >
              <div
                className="text-[clamp(3rem,5vw,4.5rem)] font-heading leading-none mb-3 tabular-nums"
                style={{ color: "var(--color-primary)", letterSpacing: "-0.03em" }}
              >
                <AnimatedCounter target={metric.value} suffix={metric.suffix} />
              </div>
              <div
                className="w-6 h-px mb-3 transition-all duration-300 group-hover:w-10"
                style={{ background: "var(--color-accent)" }}
              />
              <span className="text-overline text-[var(--color-muted)]">{metric.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Testimonial — calm, centered ──────────────────────────────────
function TestimonialSection() {
  return (
    <section className="section-py divider relative bg-white overflow-hidden">
      {/* Very subtle ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(89,32,161,0.025) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="container">
        <div className="flex flex-col items-center text-center">
          {/* Decorative quote mark */}
          <div
            className="font-heading text-[8rem] leading-none select-none pointer-events-none mb-2"
            style={{ color: "var(--color-primary)", opacity: 0.06 }}
            aria-hidden
          >
            &ldquo;
          </div>

          <motion.p
            className="relative text-[clamp(1.25rem,2.4vw,2rem)] font-heading italic leading-relaxed mb-10"
            style={{ maxWidth: "44rem", letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {TESTIMONIAL.quote}
          </motion.p>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            {/* Author avatar */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-heading text-base flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #5920a1, #3b40c4)" }}
            >
              {TESTIMONIAL.author.charAt(0)}
            </div>
            <div className="text-left">
              <div className="text-[0.9375rem] font-bold text-black">{TESTIMONIAL.author}</div>
              <div className="text-caption">{TESTIMONIAL.title}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <BrandEssence />
      <MetricsSection />
      <Services />
      <Products />
      <AIExpertise />
      <Process />
      <TestimonialSection />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
}
