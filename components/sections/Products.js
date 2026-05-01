"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { fadeUp, staggerContainer } from "@/lib/motion";

const PRODUCTS = [
  {
    title: "Apps",
    description: "Intelligent applications crafted for end-users, blending powerful AI capabilities with seamless, intuitive interfaces that feel natural.",
    color: "#5920a1",
    gradient: "linear-gradient(135deg, #5920a1 0%, #3b40c4 100%)",
    shape: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" stroke="white" strokeOpacity="0.3" strokeWidth="1.5"/>
        <circle cx="32" cy="32" r="16" stroke="white" strokeOpacity="0.5" strokeWidth="1.5"/>
        <circle cx="32" cy="32" r="6"  fill="white" fillOpacity="0.9"/>
      </svg>
    ),
  },
  {
    title: "Plugins",
    description: "Modular integrations that drop into your existing workflow, instantly supercharging your platforms with zero friction or complexity.",
    color: "#3b40c4",
    gradient: "linear-gradient(135deg, #3b40c4 0%, #5920a1 100%)",
    shape: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="8"  y="8"  width="22" height="22" rx="4" stroke="white" strokeOpacity="0.5" strokeWidth="1.5"/>
        <rect x="34" y="8"  width="22" height="22" rx="4" stroke="white" strokeOpacity="0.3" strokeWidth="1.5"/>
        <rect x="8"  y="34" width="22" height="22" rx="4" stroke="white" strokeOpacity="0.3" strokeWidth="1.5"/>
        <rect x="34" y="34" width="22" height="22" rx="4" fill="white" fillOpacity="0.2" stroke="white" strokeOpacity="0.6" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    title: "Developer Tools",
    description: "Command-line interfaces, SDKs, and APIs designed for developer joy. Built for speed, typed strictly, and documented deeply.",
    color: "#ef5a98",
    gradient: "linear-gradient(135deg, #ef5a98 0%, #5920a1 100%)",
    shape: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <polyline points="12,22 24,32 12,42" stroke="white" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="30" y1="42" x2="52" y2="42" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

// ── Product card with cursor-following header spotlight ───────────
function ProductCard({ p, i }) {
  const cardRef    = useRef(null);
  const headerRef  = useRef(null);
  const spotRef    = useRef(null);

  const onMouseMove = (e) => {
    const rect = headerRef.current?.getBoundingClientRect();
    if (!rect || !spotRef.current) return;
    const nx = ((e.clientX - rect.left) / rect.width)  * 100;
    const ny = ((e.clientY - rect.top)  / rect.height) * 100;
    spotRef.current.style.background =
      `radial-gradient(200px circle at ${nx}% ${ny}%, rgba(255,255,255,0.22), transparent 65%)`;
    spotRef.current.style.opacity = "1";
  };

  const onMouseLeave = () => {
    if (spotRef.current) spotRef.current.style.opacity = "0";
  };

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[var(--color-border)] transition-all duration-500 hover:shadow-[0_28px_72px_rgba(0,0,0,0.12)] hover:-translate-y-2"
      style={{ "--card-color": p.color }}
    >
      {/* Gradient header with cursor spotlight */}
      <div
        ref={headerRef}
        className="h-44 w-full flex items-center justify-center relative overflow-hidden"
        style={{ background: p.gradient }}
      >
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />

        {/* Cursor spotlight — DOM-mutated */}
        <div
          ref={spotRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{ opacity: 0 }}
        />

        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 transition-transform duration-500 group-hover:scale-110"
        >
          {p.shape}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-125"
            style={{ background: p.color }} />
          <h3 className="text-h3 font-heading">{p.title}</h3>
        </div>
        <p className="text-body-sm text-black/60 leading-relaxed">{p.description}</p>
        <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
          <span className="text-[0.875rem] font-semibold text-[var(--color-primary)] flex items-center gap-2 transition-all duration-200 group-hover:gap-3">
            Learn more
            <motion.span
              className="inline-block"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            >→</motion.span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  return (
    <Section id="products" className="section-padding bg-surface-tinted section-divide-top">
      <motion.div
        initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={staggerContainer(0.1)}
      >
        <motion.div variants={fadeUp} className="mb-16 max-w-2xl mx-auto text-center">
          <span className="text-overline text-[var(--color-secondary)] mb-4 block">ECOSYSTEM</span>
          <h2 className="text-h1 mb-5">Built to be tangible</h2>
          <p className="text-body text-black/60 mx-auto">
            From full-scale applications to precise developer tooling, our products exist to accelerate your velocity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={i} p={p} i={i} />
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
