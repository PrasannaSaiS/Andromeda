"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { fadeUp } from "@/lib/motion";

const EXPERTISE = [
  "Artificial Intelligence",
  "Machine Learning",
  "Deep Learning",
  "Data Science",
];

// Abstract flowing lines representing a neural network / intelligence
const FlowingNetwork = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
      <svg className="w-full h-full max-w-[800px]" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        
        {/* Nodes (Points) */}
        {[
          { cx: 100, cy: 300 },
          { cx: 300, cy: 150 },
          { cx: 300, cy: 450 },
          { cx: 500, cy: 250 },
          { cx: 500, cy: 400 },
          { cx: 700, cy: 300 },
        ].map((node, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={node.cx}
            cy={node.cy}
            r="4"
            fill="var(--color-primary)"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Connecting Lines */}
        {[
          { d: "M100 300 C200 300, 200 150, 300 150" },
          { d: "M100 300 C200 300, 200 450, 300 450" },
          { d: "M300 150 C400 150, 400 250, 500 250" },
          { d: "M300 150 C400 150, 400 400, 500 400" },
          { d: "M300 450 C400 450, 400 250, 500 250" },
          { d: "M300 450 C400 450, 400 400, 500 400" },
          { d: "M500 250 C600 250, 600 300, 700 300" },
          { d: "M500 400 C600 400, 600 300, 700 300" },
        ].map((path, i) => (
          <motion.path
            key={`line-${i}`}
            d={path.d}
            stroke="url(#gradient)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.6 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Continuous Flowing Energy Pulses along paths */}
        {[
          { d: "M100 300 C200 300, 200 150, 300 150" },
          { d: "M300 150 C400 150, 400 250, 500 250" },
          { d: "M500 250 C600 250, 600 300, 700 300" },
          { d: "M100 300 C200 300, 200 450, 300 450" },
          { d: "M300 450 C400 450, 400 400, 500 400" },
        ].map((path, i) => (
          <motion.path
            key={`pulse-${i}`}
            d={path.d}
            stroke="var(--color-accent)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 0.2, 0.2, 0],
              pathOffset: [0, 0, 0.8, 1],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.8,
            }}
          />
        ))}

        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="50%" stopColor="var(--color-secondary)" />
            <stop offset="100%" stopColor="var(--color-accent)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default function AIExpertise() {
  return (
    <Section id="ai-expertise" className="relative overflow-hidden bg-surface py-32">
      {/* Background Graphic */}
      <FlowingNetwork />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto gap-16">
        
        {/* Left Side: Copy */}
        <div className="md:w-1/2">
          <span className="text-overline text-[var(--color-accent)] mb-4 block">Intelligence</span>
          <h2 className="text-h2 mb-6">Cognitive infrastructure at scale.</h2>
          <p className="text-body text-muted mb-8">
            We don't just use APIs. We architect neural systems, train bespoke models, and deploy intelligence directly to the edge. Data is your raw material; we build the refinery.
          </p>
          
          <motion.ul 
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 }
              }
            }}
          >
            {EXPERTISE.map((item, i) => (
              <motion.li 
                key={i} 
                variants={fadeUp}
                className="flex items-center gap-4 text-body font-semibold text-black"
              >
                <div className="w-8 h-[1px] bg-[var(--color-primary)]" />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Right Side: Visual Anchor (Optional text or just space to let the SVG shine) */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <motion.div 
            className="w-full max-w-[300px] aspect-square rounded-full border border-border flex items-center justify-center relative backdrop-blur-sm bg-white/30"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="text-center">
              <div className="text-h1 text-[var(--color-primary)] mb-1">AI</div>
              <div className="text-caption text-muted tracking-widest uppercase">Native</div>
            </div>
            
            {/* Orbital Rings */}
            <motion.div 
              className="absolute inset-[-20px] rounded-full border border-[var(--color-secondary)] opacity-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ borderStyle: "dashed" }}
            />
            <motion.div 
              className="absolute inset-[-40px] rounded-full border border-[var(--color-accent)] opacity-10"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>

      </div>
    </Section>
  );
}
