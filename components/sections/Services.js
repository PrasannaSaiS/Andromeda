"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Section from "@/components/ui/Section";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { CosmicTopRight, CosmicBottomLeft } from "@/components/ui/CosmicCorners";

const SERVICES = [
  {
    title: "Backend Systems",
    description: "Robust, scalable server architectures built for high availability and extreme performance.",
    color: "#5920a1",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/>
        <line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>
      </svg>
    ),
  },
  {
    title: "AI & Machine Learning",
    description: "Production-grade intelligence integrated directly into your core product.",
    color: "#3b40c4",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
        <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
      </svg>
    ),
  },
  {
    title: "SaaS Development",
    description: "End-to-end platform engineering with sophisticated billing, auth, and state management.",
    color: "#ef5a98",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/>
      </svg>
    ),
  },
  {
    title: "Full Stack Engineering",
    description: "Seamless integration from database to UI with flawless user experiences.",
    color: "#3b40c4",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>
      </svg>
    ),
  },
];

function TiltCard({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Services() {
  return (
    <Section id="services" className="section-padding bg-white section-divide-top relative overflow-hidden">
      <CosmicTopRight className="opacity-70" />
      <CosmicBottomLeft className="opacity-50" />
      <motion.div
        initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={staggerContainer(0.08)}
      >
        <motion.div variants={fadeUp} className="mb-16 max-w-2xl mx-auto text-center">
          <span className="text-overline text-[var(--color-primary)] mb-4 block">THE CONSTELLATION</span>
          <h2 className="text-h1 mb-5">Capabilities designed for the future</h2>
          <p className="text-body text-black/60 mx-auto">
            We bring high-end engineering to ambitious teams. Our focus is narrow so our impact can be deep.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div key={i} variants={fadeUp}>
              <TiltCard className="h-full">
                <motion.div
                  className="group relative h-full bg-white rounded-2xl p-8 lg:p-10 border border-[var(--color-border)] cursor-default overflow-hidden"
                  whileHover={{ borderColor: `${s.color}40`, boxShadow: `0 24px 64px rgba(0,0,0,0.10), 0 0 0 1px ${s.color}20` }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Subtle gradient on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${s.color}08, transparent)` }} />

                  {/* Number badge */}
                  <div className="absolute top-8 right-8 text-[0.75rem] font-bold tabular-nums text-black/15 font-heading">
                    0{i + 1}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300"
                    style={{ backgroundColor: `${s.color}12`, color: s.color }}>
                    {s.icon}
                  </div>

                  <h3 className="text-h3 mb-3 font-heading">{s.title}</h3>
                  <p className="text-body-sm text-black/60 leading-relaxed">{s.description}</p>

                  {/* Bottom accent line */}
                  <div className="mt-8 h-px w-0 group-hover:w-full transition-all duration-500 ease-out rounded-full"
                    style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
