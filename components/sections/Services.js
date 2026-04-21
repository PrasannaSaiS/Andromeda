"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { fadeUp } from "@/lib/motion";

const SERVICES = [
  {
    title: "Backend Systems",
    description: "Robust, scalable server architectures built for high availability and extreme performance. We handle the complexity so you can focus on scale.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="8" x="2" y="2" rx="2" y="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" y="14" />
        <line x1="6" x2="6.01" y1="6" y2="6" />
        <line x1="6" x2="6.01" y1="18" y2="18" />
      </svg>
    )
  },
  {
    title: "AI & Machine Learning",
    description: "Production-grade intelligence. From predictive models to generative AI, we integrate intelligence directly into your core product.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
        <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4 4.5 4.5 0 0 1-3-4" />
      </svg>
    )
  },
  {
    title: "SaaS Development",
    description: "End-to-end platform engineering. We build multi-tenant applications with sophisticated billing, auth, and state management.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 12 12 17 22 12" />
        <polyline points="2 17 12 22 22 17" />
      </svg>
    )
  },
  {
    title: "Full Stack Engineering",
    description: "Seamless integration from database to UI. We deliver flawless user experiences powered by rock-solid backend logic.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" x2="20" y1="19" y2="19" />
      </svg>
    )
  }
];

export default function Services() {
  return (
    <Section id="services" tinted className="border-t border-border section-padding">
      <div className="mb-[var(--space-8)] max-w-2xl section-container">
        <span className="text-overline text-[var(--color-primary)] mb-[var(--space-3)] block">Our Expertise</span>
        <h2 className="text-h2 mb-[var(--space-4)]">Capabilities designed for the future.</h2>
        <p className="text-body text-muted">
          We bring high-end engineering to ambitious teams. Our focus is narrow so our impact can be deep.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            }
          }
        }}
      >
        {SERVICES.map((service, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            className="group relative bg-surface-elevated rounded-2xl p-8 transition-all duration-300 border border-border
                       hover:-translate-y-1 hover:border-[var(--color-border-hover)] 
                       hover:shadow-[0_8px_30px_rgba(0,0,0,0.04),0_0_20px_rgba(89,32,161,0.03)]"
          >
            {/* Subtle Glow Overlay */}
            <div className="absolute inset-0 bg-[var(--color-primary)] opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300 rounded-2xl pointer-events-none" />
            
            <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-surface)] text-[var(--color-primary)] border border-border group-hover:border-[var(--color-border-hover)] transition-colors duration-300">
              {service.icon}
            </div>
            
            <h3 className="text-h3 mb-3">{service.title}</h3>
            <p className="text-body-sm text-muted">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
