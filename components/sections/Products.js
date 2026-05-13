"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

const PRODUCTS = [
  {
    tag: "Applications",
    title: "Apps",
    description: "Intelligent applications blending AI capabilities with seamless, intuitive interfaces built for real human workflows.",
    color: "#5920a1",
    gradient: "linear-gradient(140deg, #5920a1 0%, #3b40c4 100%)",
    visual: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
        <circle cx="28" cy="28" r="24" stroke="white" strokeOpacity="0.25" strokeWidth="1.25"/>
        <circle cx="28" cy="28" r="14" stroke="white" strokeOpacity="0.4" strokeWidth="1.25"/>
        <circle cx="28" cy="28" r="5" fill="white" fillOpacity="0.85"/>
      </svg>
    ),
  },
  {
    tag: "Integrations",
    title: "Plugins",
    description: "Modular integrations that drop into your existing workflow with zero friction — instant capability amplification.",
    color: "#3b40c4",
    gradient: "linear-gradient(140deg, #3b40c4 0%, #5920a1 100%)",
    visual: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
        <rect x="8"  y="8"  width="18" height="18" rx="3.5" stroke="white" strokeOpacity="0.45" strokeWidth="1.25"/>
        <rect x="30" y="8"  width="18" height="18" rx="3.5" stroke="white" strokeOpacity="0.25" strokeWidth="1.25"/>
        <rect x="8"  y="30" width="18" height="18" rx="3.5" stroke="white" strokeOpacity="0.25" strokeWidth="1.25"/>
        <rect x="30" y="30" width="18" height="18" rx="3.5" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.55" strokeWidth="1.25"/>
      </svg>
    ),
  },
  {
    tag: "Developer Experience",
    title: "Developer Tools",
    description: "CLIs, SDKs, and APIs designed for developer joy. Typed strictly, documented deeply, built for speed.",
    color: "#ef5a98",
    gradient: "linear-gradient(140deg, #ef5a98 0%, #5920a1 100%)",
    visual: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
        <polyline points="10,20 22,28 10,36" stroke="white" strokeOpacity="0.85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="28" y1="36" x2="46" y2="36" stroke="white" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

function ProductCard({ p, i }) {
  const headerRef = useRef(null);
  const spotRef   = useRef(null);

  const onMouseMove = (e) => {
    const rect = headerRef.current?.getBoundingClientRect();
    if (!rect || !spotRef.current) return;
    const nx = ((e.clientX - rect.left) / rect.width) * 100;
    const ny = ((e.clientY - rect.top)  / rect.height) * 100;
    spotRef.current.style.background = `radial-gradient(180px circle at ${nx}% ${ny}%, rgba(255,255,255,0.18), transparent 65%)`;
    spotRef.current.style.opacity = "1";
  };

  const onMouseLeave = () => {
    if (spotRef.current) spotRef.current.style.opacity = "0";
  };

  return (
    <motion.div
      variants={fadeUp}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[var(--color-border)] card"
    >
      {/* Visual header */}
      <div
        ref={headerRef}
        className="h-40 w-full flex items-center justify-center relative overflow-hidden flex-shrink-0"
        style={{ background: p.gradient }}
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden
        />
        {/* Cursor spotlight */}
        <div
          ref={spotRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{ opacity: 0 }}
          aria-hidden
        />
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.75, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 transition-transform duration-400 group-hover:scale-110"
        >
          {p.visual}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-7 flex-1 flex flex-col">
        <span
          className="text-overline mb-3 block"
          style={{ color: p.color }}
        >
          {p.tag}
        </span>
        <h3 className="text-h3 font-heading mb-3">{p.title}</h3>
        <p className="text-body-sm text-[var(--color-muted)] leading-relaxed flex-1">{p.description}</p>
        <div className="mt-5 pt-5 border-t border-[var(--color-border)]">
          <span
            className="text-[0.875rem] font-semibold flex items-center gap-2 transition-all duration-200 group-hover:gap-3"
            style={{ color: p.color }}
          >
            Learn more
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  return (
    <section
      id="products"
      className="section-py divider relative bg-white overflow-hidden"
    >
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={staggerContainer(0.1)}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-14 max-w-xl">
            <span className="text-overline text-[var(--color-secondary)] mb-4 block">Products</span>
            <h2 className="text-h1 mb-5">Tangible things we ship</h2>
            <p className="text-body text-[var(--color-muted)]">
              From applications to precision tooling, our products accelerate your velocity and compound over time.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PRODUCTS.map((p, i) => (
              <ProductCard key={i} p={p} i={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
