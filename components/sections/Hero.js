"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

// Subtle floating particle component
const FloatingParticle = ({ size, color, initialX, initialY, duration, delay }) => (
  <motion.div
    className="absolute rounded-full mix-blend-multiply pointer-events-none"
    style={{
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      left: initialX,
      top: initialY,
      opacity: 0.05, // Very light
    }}
    animate={{
      y: ["0px", "-40px", "0px"],
      x: ["0px", "20px", "0px"],
      scale: [1, 1.1, 1],
      opacity: [0.02, 0.05, 0.02],
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export default function Hero() {
  return (
    <section className="snap-start relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-surface w-full">
      {/* Background soft gradient accents */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FloatingParticle
          size="400px"
          color="var(--color-primary)"
          initialX="10%"
          initialY="20%"
          duration={15}
          delay={0}
        />
        <FloatingParticle
          size="500px"
          color="var(--color-secondary)"
          initialX="60%"
          initialY="10%"
          duration={20}
          delay={2}
        />
        <FloatingParticle
          size="300px"
          color="var(--color-accent)"
          initialX="40%"
          initialY="60%"
          duration={18}
          delay={1}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1120px] mx-auto px-6 flex flex-col items-center text-center">
        {/* Prominent Logo (Text-based for now) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 font-heading tracking-tight text-xl font-bold uppercase text-[var(--color-primary)]"
        >
          Andromeda
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-[clamp(3rem,6vw,5.5rem)] font-heading leading-[1.1] tracking-tight text-black mb-8 max-w-4xl text-balance"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Engineering Intelligence. <br className="hidden md:block" />
          <span className="text-muted/80">Delivering Systems.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-body text-muted mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          We build the invisible infrastructure of tomorrow. From scalable backend
          systems to state-of-the-art AI solutions, our full-stack platforms
          power the next generation of technology.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button variant="primary" href="#products">
            Build with Andromeda
          </Button>
        </motion.div>
      </div>

      {/* Gentle floating scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-caption text-muted/50 uppercase tracking-widest mb-4 font-bold">Scroll</span>
        <div className="w-[1px] h-[60px] bg-border relative overflow-hidden">
          <motion.div
            className="w-full h-1/2 bg-[var(--color-primary)] absolute top-0"
            animate={{ y: [0, 60] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
