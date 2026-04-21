"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SITE, NAV_LINKS, CAPABILITIES, METRICS, TESTIMONIAL, FOOTER_LINKS } from "@/lib/constants";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Services from "@/components/sections/Services";
import Products from "@/components/sections/Products";
import AIExpertise from "@/components/sections/AIExpertise";
import Spotlight from "@/components/sections/Spotlight";
import SequenceCanvasSection from "@/components/sections/SequenceCanvasSection";
import Hero from "@/components/sections/Hero";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

function BrandEssence() {
  const statements = [
    "Intelligence, engineered.",
    "Platforms, invisible.",
    "Impact, undeniable."
  ];

  return (
    <Section className="section-padding">
      <div className="relative section-container pl-[var(--space-6)]">
        {/* Accent Tracker */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border">
            <motion.div 
              className="absolute top-0 left-0 w-full h-[60px] bg-[var(--color-primary)]"
              // Accent color removed. Using primary for strict color hierarchy.
            />
        </div>

        <div className="space-y-16">
          {statements.map((stmt, i) => (
            <motion.h2 
              key={i} 
              className="text-display mb-[var(--space-6)]"
              initial={{ opacity: 0.2, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.8 }}
            >
              {stmt}
            </motion.h2>
          ))}
        </div>
      </div>
    </Section>
  );
}

function SocialProof() {
  return (
    <Section autoHeight noPadding className="border-y border-border py-[var(--space-6)] bg-surface">
      <div className="text-center mb-[var(--space-4)]">
        <span className="text-caption tracking-widest uppercase">Trusted by teams building the future</span>
      </div>
      <div className="section-container flex justify-center gap-[var(--space-7)] opacity-50 grayscale hover:grayscale-0 transition-all duration-500 flex-wrap">
        {/* Placeholder Logos */}
        <div className="font-heading text-xl font-bold">VERTEX</div>
        <div className="font-heading text-xl font-bold">LUMINA</div>
        <div className="font-heading text-xl font-bold">ECHO</div>
        <div className="font-heading text-xl font-bold">NEXUS</div>
        <div className="font-heading text-xl font-bold">QUANTUM</div>
      </div>
    </Section>
  );
}

function MetricsSection() {
  return (
    <Section autoHeight className="text-center py-24 bg-surface">
      <div className="flex flex-col md:flex-row justify-center gap-16 md:gap-32">
        {METRICS.map((metric, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="text-display text-[var(--color-primary)] mb-[var(--space-2)]">
              <AnimatedCounter target={metric.value} suffix={metric.suffix} />
            </div>
            <div className="h-[2px] w-[40px] bg-[var(--color-primary)] mb-[var(--space-3)]" />
            <span className="text-body-sm text-muted uppercase tracking-wider">{metric.label}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function TestimonialSection() {
  return (
    <Section className="section-padding relative">
      <div className="section-container text-center relative z-10 flex flex-col items-center">
        <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 text-[160px] font-heading text-[var(--color-primary)] opacity-[0.03] select-none -z-10 leading-none">
          "
        </div>
        <motion.p 
          className="text-h1 italic leading-relaxed mb-[var(--space-7)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {TESTIMONIAL.quote}
        </motion.p>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="font-bold text-body mb-1">{TESTIMONIAL.author}</div>
          <div className="text-body-sm text-muted">{TESTIMONIAL.title}</div>
        </motion.div>
      </div>
    </Section>
  );
}



export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <SequenceCanvasSection />
      <BrandEssence />
      <Services />
      <Products />
      <AIExpertise />
      <Spotlight />
      <SocialProof />
      <MetricsSection />
      <TestimonialSection />
      <CTA />
      <Footer />
    </main>
  );
}
