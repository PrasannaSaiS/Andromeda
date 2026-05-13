"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

const SERVICES = [
  {
    number: "01",
    title: "Backend Systems",
    description: "Scalable, resilient server architectures engineered for high-availability and extreme performance at any scale.",
    color: "#5920a1",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="8" x="2" y="2" rx="2"/>
        <rect width="20" height="8" x="2" y="14" rx="2"/>
        <line x1="6" x2="6.01" y1="6" y2="6"/>
        <line x1="6" x2="6.01" y1="18" y2="18"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI & Machine Learning",
    description: "Production-grade intelligence pipelines — from neural architecture to inference. We build the refinery, you own the ore.",
    color: "#3b40c4",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
        <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "SaaS Platforms",
    description: "End-to-end platform engineering with auth, billing, real-time sync, and analytics — built for growth from day one.",
    color: "#5920a1",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 12 12 17 22 12"/>
        <polyline points="2 17 12 22 22 17"/>
      </svg>
    ),
  },
  {
    number: "04",
    title: "Full Stack Engineering",
    description: "Seamless integration from database to UI. We close the gap between beautiful and bulletproof.",
    color: "#3b40c4",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5"/>
        <line x1="12" x2="20" y1="19" y2="19"/>
      </svg>
    ),
  },
];

function ServiceCard({ service }) {
  const cardRef = useRef(null);
  const spotRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 280, damping: 30 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 280, damping: 30 });

  const onMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top)  / rect.height;
    mx.set(nx - 0.5);
    my.set(ny - 0.5);
    if (spotRef.current) {
      spotRef.current.style.background = `radial-gradient(320px circle at ${nx * 100}% ${ny * 100}%, ${service.color}14, transparent 65%)`;
      spotRef.current.style.opacity = "1";
    }
  };

  const onMouseLeave = () => {
    mx.set(0); my.set(0);
    if (spotRef.current) spotRef.current.style.opacity = "0";
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", perspective: 900 }}
      variants={fadeUp}
    >
      <div
        className="relative h-full bg-white rounded-2xl p-8 lg:p-10 border border-[var(--color-border)] overflow-hidden group cursor-default transition-all duration-400"
        style={{
          transition: "box-shadow 0.3s, border-color 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${service.color}30`;
          e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.09), 0 0 0 1px ${service.color}18`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "";
          e.currentTarget.style.boxShadow = "";
        }}
      >
        {/* Cursor spotlight */}
        <div
          ref={spotRef}
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{ opacity: 0, zIndex: 0 }}
        />

        <div className="relative z-10">
          {/* Number + Icon row */}
          <div className="flex items-start justify-between mb-8">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: `${service.color}10`, color: service.color }}
            >
              {service.icon}
            </div>
            <span className="text-[0.75rem] font-bold tabular-nums text-black/12 font-heading tracking-widest">
              {service.number}
            </span>
          </div>

          <h3 className="text-h3 mb-3 font-heading">{service.title}</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)] leading-relaxed">{service.description}</p>

          {/* Expanding accent line */}
          <div
            className="mt-8 h-px w-0 group-hover:w-full transition-all duration-500 ease-out rounded-full"
            style={{ background: `linear-gradient(90deg, ${service.color}60, transparent)` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="section-py divider relative bg-[var(--color-surface)] overflow-hidden"
    >
      {/* Very subtle tinted gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 80% 20%, rgba(89,32,161,0.03) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={staggerContainer(0.08)}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-16 max-w-xl">
            <span className="text-overline text-[var(--color-primary)] mb-4 block">Capabilities</span>
            <h2 className="text-h1 mb-5">
              Built for the engineering challenges that matter
            </h2>
            <p className="text-body text-[var(--color-muted)]">
              Narrow focus. Deep impact. We bring senior-level engineering to the problems other teams avoid.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES.map((s, i) => (
              <ServiceCard key={i} service={s} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
