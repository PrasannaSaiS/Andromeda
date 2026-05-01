"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { cinematicScroll } from "@/lib/cinematicScroll";
import { CosmicTopLeft, CosmicTopRight, CosmicBottomLeft, CosmicBottomRight, OrbitRing } from "@/components/ui/CosmicCorners";

const HEADLINE_WORDS = ["We", "build", "what", "comes", "next."];
const PARALLAX_SPRING = { stiffness: 60, damping: 18, mass: 0.8 };

export default function Hero() {
  const ref = useRef(null);

  // ── Scroll parallax ───────────────────────────────────────────
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scrollY   = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const scrollOp  = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  // ── Mouse parallax ────────────────────────────────────────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX  = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]),  PARALLAX_SPRING);
  const tiltY  = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), PARALLAX_SPRING);

  useEffect(() => {
    const isTouch   = window.matchMedia("(pointer: coarse)").matches;
    const noMotion  = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || noMotion) return;

    const section = ref.current;
    if (!section) return;

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width  - 0.5);
      mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
    };
    const onLeave = () => { mouseX.set(0); mouseY.set(0); };

    section.addEventListener("mousemove",  onMove,  { passive: true });
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove",  onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY]);

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

      {/* Orbit rings — CSS animated */}
      <OrbitRing size={600} x="2%"  y="50%" color="primary"   className="opacity-60" />
      <OrbitRing size={900} x="50%" y="50%" color="secondary" className="opacity-40" />

      {/* Mesh gradient + pulse rings */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(89,32,161,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 80%, rgba(59,64,196,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 10% 70%, rgba(239,90,152,0.05) 0%, transparent 60%)
          `
        }} />
        {[500, 700, 900].map((size, i) => (
          <div key={size}
            className="absolute rounded-full border border-[var(--color-primary)]"
            style={{
              width: size, height: size,
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 0,
              animation: `hero-ring-pulse 9s ease-in-out infinite`,
              animationDelay: `${i * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Scroll parallax wrapper */}
      <motion.div style={{ y: scrollY, opacity: scrollOp }}
        className="relative z-10 flex flex-col items-center text-center px-6 w-full"
      >
        {/* Mouse parallax wrapper */}
        <motion.div
          style={{ x: tiltY, y: tiltX }}
          className="flex flex-col items-center w-full"
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
            className="font-heading leading-none tracking-tight text-black mb-7"
            style={{ fontSize: "clamp(1.75rem, 5.5vw, 5.25rem)", letterSpacing: "-0.03em" }}
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
          >
            {HEADLINE_WORDS.map((word, i) => (
              <motion.span key={i}
                variants={{
                  hidden:  { opacity: 0, y: 40, filter: "blur(4px)" },
                  visible: { opacity: 1, y: 0,  filter: "blur(0px)",
                    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
                }}
                style={{ display: "inline-block", marginRight: i < HEADLINE_WORDS.length - 1 ? "0.28em" : 0 }}
              >{word}</motion.span>
            ))}
          </motion.h1>

          {/* Descriptor */}
          <motion.p
            className="text-[clamp(1rem,1.4vw,1.2rem)] text-[var(--color-muted)] mb-10 leading-relaxed"
            style={{ maxWidth: "36rem" }}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            AI systems. Developer platforms. Invisible infrastructure.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
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
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-black/30 font-semibold">Scroll</span>
        <div className="w-px h-12 bg-[var(--color-border)] relative overflow-hidden">
          <div className="w-full h-4 bg-[var(--color-primary)] absolute top-0"
            style={{ animation: "scroll-dot 2.2s ease-in-out infinite" }} />
        </div>
      </motion.div>
    </section>
  );
}
