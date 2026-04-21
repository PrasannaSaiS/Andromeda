"use client";

import { motion } from "framer-motion";
import { fadeUp, slideRight } from "@/lib/motion";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

// Dummy Icons
const ServerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="8" x="2" y="2" rx="2" y="2" />
    <rect width="20" height="8" x="2" y="14" rx="2" y="14" />
    <line x1="6" x2="6.01" y1="6" y2="6" />
    <line x1="6" x2="6.01" y1="18" y2="18" />
  </svg>
);

const LayersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 12 12 17 22 12" />
    <polyline points="2 17 12 22 22 17" />
  </svg>
);

const BrainIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4 4.5 4.5 0 0 1-3-4" />
  </svg>
);

const TerminalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" x2="20" y1="19" y2="19" />
  </svg>
);

const iconMap = {
  server: <ServerIcon />,
  layers: <LayersIcon />,
  brain: <BrainIcon />,
  terminal: <TerminalIcon />,
};

export default function Capabilities({ capabilities }) {
  return (
    <Section id="products" className="relative">
      {/* Background dot grid */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex justify-center opacity-40">
        <div className="w-full max-w-[1280px] h-full bg-[radial-gradient(var(--color-border)_2px,transparent_2px)] [background-size:40px_40px]" />
      </div>

      <div className="relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1000px] mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="group bg-surface-elevated border border-border rounded-2xl p-8 hover:bg-[var(--color-surface-tinted)] hover:border-[var(--color-border-hover)] transition-colors duration-400"
            >
              <div className="text-[var(--color-primary)] mb-6">
                {iconMap[cap.icon]}
              </div>
              <h3 className="text-h3 mb-3">{cap.title}</h3>
              <p className="text-body-sm text-muted">{cap.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
