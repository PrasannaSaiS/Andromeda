"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cinematicScroll } from "@/lib/cinematicScroll";
import { CosmicTopLeft, CosmicTopRight, CosmicBottomLeft, CosmicBottomRight, OrbitRing } from "@/components/ui/CosmicCorners";

const HEADLINE = "We build what comes next.";

const Ring = ({ size, delay, duration = 9 }) => (
  <motion.div
    className="absolute rounded-full border border-[var(--color-primary)]"
    style={{ width: size, height: size, top: "50%", left: "50%", x: "-50%", y: "-50%", opacity: 0 }}
    animate={{ scale: [0.85, 1.15, 0.85], opacity: [0, 0.055, 0] }}
    transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const handleCTA = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) cinematicScroll(el.getBoundingClientRect().top + window.scrollY - 80, 1000);
  };

  return (
    <section ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-surface w-full"
      style={{ paddingTop: "var(--navbar-height)" }}
    >
      {/* Cosmic corner decorations */}
      <CosmicTopLeft />
      <CosmicTopRight />
      <CosmicBottomLeft />
      <CosmicBottomRight />

      {/* Slow orbit rings in background */}
      <OrbitRing size={600} x="2%" y="50%" color="primary"   className="opacity-60" />
      <OrbitRing size={900} x="50%" y="50%" color="secondary" className="opacity-40" />

      {/* Mesh gradient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(89,32,161,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 80%, rgba(59,64,196,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 10% 70%, rgba(239,90,152,0.05) 0%, transparent 60%)
          `
        }} />
        <Ring size={500} delay={0} />
        <Ring size={700} delay={3} />
        <Ring size={900} delay={6} />
      </div>

      {/* Parallax content */}
      <motion.div style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 w-full"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/80 backdrop-blur-sm px-4 py-1.5 mb-8 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
            AI-first infrastructure
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-heading leading-none tracking-tight text-black mb-7 whitespace-nowrap"
          style={{ fontSize: "clamp(1.75rem, 5.5vw, 5.25rem)", letterSpacing: "-0.03em" }}
          initial="hidden" animate="visible"
        >
          {HEADLINE.split("").map((char, i) => (
            <motion.span key={i}
              variants={{
                hidden:  { opacity: 0, y: 56, filter: "blur(4px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)",
                  transition: { duration: 0.85, delay: 0.3 + i * 0.026, ease: [0.16, 1, 0.3, 1] } },
              }}
              style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
            >{char}</motion.span>
          ))}
        </motion.h1>

        {/* Descriptor */}
        <motion.p
          className="text-[clamp(1rem,1.4vw,1.2rem)] text-[var(--color-muted)] mb-10 leading-relaxed"
          style={{ maxWidth: "36rem" }}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
        >
          AI systems. Developer platforms. Invisible infrastructure.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.a href="#services" onClick={(e) => handleCTA(e, "#services")}
            whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] text-white font-semibold text-[1rem] px-8 py-4 hover:bg-[var(--color-primary-dark)] shadow-[0_8px_32px_rgba(89,32,161,0.32)] hover:shadow-[0_12px_40px_rgba(89,32,161,0.42)] transition-colors duration-200"
          >
            Explore Andromeda
          </motion.a>
          <motion.a href="#contact" onClick={(e) => handleCTA(e, "#contact")}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 text-[1rem] font-semibold text-black/60 hover:text-[var(--color-primary)] transition-colors duration-200"
          >
            Get in touch
            <motion.span className="inline-block"
              initial={{ x: 0 }} whileHover={{ x: 5 }}
              transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            >→</motion.span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-black/30 font-semibold">Scroll</span>
        <div className="w-px h-12 bg-[var(--color-border)] relative overflow-hidden">
          <motion.div className="w-full h-4 bg-[var(--color-primary)] absolute top-0"
            animate={{ y: [0, 48, 48, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
        </div>
      </motion.div>
    </section>
  );
}
