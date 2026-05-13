"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function CTA() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const glowX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const glowY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  return (
    <section id="cta" className="section-py divider relative bg-white overflow-hidden">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.1)}
        >
          <motion.div
            ref={cardRef}
            onMouseMove={onMouseMove}
            variants={{
              hidden: { opacity: 0, scale: 0.97, y: 20 },
              visible: {
                opacity: 1, scale: 1, y: 0,
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
              }
            }}
            className="relative overflow-hidden rounded-[2.5rem] px-8 py-20 md:px-20 md:py-28 text-center group shadow-[0_40px_100px_rgba(89,32,161,0.25)]"
            style={{
              background: "linear-gradient(135deg, #5920a1 0%, #3b40c4 100%)",
            }}
          >
            {/* Bright Radiant Accents */}
            <div
              className="absolute inset-0 opacity-100 pointer-events-none"
              style={{
                background: `
                  radial-gradient(circle at 0% 0%, #3b40c4 0%, transparent 50%),
                  radial-gradient(circle at 100% 100%, #3b40c4 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, var(--color-primary) 0%, transparent 100%)
                `,
              }}
            />

            {/* Animated Shimmer Flare */}
            <motion.div
              className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 30%, white 0%, transparent 40%)",
                  "radial-gradient(circle at 80% 70%, white 0%, transparent 40%)",
                  "radial-gradient(circle at 20% 30%, white 0%, transparent 40%)",
                ]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Mouse following glow (Vibrant White/Primary) */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: useTransform(
                  [glowX, glowY],
                  ([x, y]) => `radial-gradient(circle 400px at ${x}px ${y}px, rgba(255,255,255,0.25), transparent 70%)`
                )
              }}
            />

            {/* Restrained background texture — subtle inner glow only */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 60%)",
              }}
              aria-hidden
            />

            {/* Floating Particles (Decorative) — Client side only to avoid hydration mismatch */}
            {mounted && [...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-20 pointer-events-none"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  scale: 0
                }}
                animate={{
                  y: ["-10%", "110%"],
                  opacity: [0, 0.4, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear"
                }}
              />
            ))}

            <div
              className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
              aria-hidden
            />

            <div className="relative z-10">
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 mb-8 backdrop-blur-md"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]"
                  style={{ animation: "glow-pulse 2.5s ease-in-out infinite" }}
                />
                <span className="text-overline text-white font-semibold">Start a conversation</span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-[clamp(2rem,5vw,4rem)] font-heading leading-tight tracking-tight text-white mb-5"
              >
                Ready to build what&apos;s{" "}
                <span style={{ color: "var(--color-accent)" }}>next</span>?
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-body-lg text-white font-medium mb-10 max-w-lg mx-auto leading-relaxed drop-shadow-sm"
              >
                Talk to our team. No pitch decks, no sales scripts. Just an honest conversation about what you&apos;re building.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[var(--color-primary)] font-semibold text-[1rem] px-8 py-4 hover:bg-white/92 shadow-[0_8px_28px_rgba(0,0,0,0.18)] transition-all duration-200"
                >
                  Get Started
                </motion.a>
                <motion.a
                  href="#products"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white font-semibold text-[1rem] px-8 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-200"
                >
                  Explore our work
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
