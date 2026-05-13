"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { cinematicScroll } from "@/lib/cinematicScroll";

const PARALLAX_SPRING = { stiffness: 45, damping: 20, mass: 1 };

// Deterministic orb positions for a professional ambient background
const AMBIENT_ORBS = [
  { size: 550, x: "10%",  y: "20%", color: "89,32,161",  op: 0.07, dur: 22 },
  { size: 450, x: "85%", y: "15%",  color: "59,64,196",  op: 0.05, dur: 28 },
  { size: 350, x: "80%", y: "75%", color: "239,90,152", op: 0.04, dur: 32 },
  { size: 600, x: "25%", y: "85%", color: "89,32,161", op: 0.04, dur: 25 },
];

// Partner Logos Configuration
const PARTNERS = [
  { id: 1, name: "Vertex", logo: "M12 2L2 22h20L12 2zm0 6l5.5 11h-11L12 8z" },
  { id: 2, name: "Lumina", logo: "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-15h2v6h-2V7zm0 8h2v2h-2v-2z" },
  { id: 3, name: "Echo", logo: "M20 12V8h-2v4h-4V4h-2v8H8V6H6v6H2v2h4v6h2v-6h4v8h2v-8h4v4h2v-4h2v-2h-2z" },
  { id: 4, name: "Nexus", logo: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { id: 5, name: "Quantum", logo: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 16a6 6 0 110-12 6 6 0 010 12zm0-10a4 4 0 100 8 4 4 0 000-8z" },
  { id: 6, name: "Stellar", logo: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
  { id: 7, name: "Prism", logo: "M12 2L2 22h20L12 2zm0 6.5L16.5 19h-9L12 8.5z" },
  { id: 8, name: "Apex", logo: "M12 2L2 12l10 10 10-10L12 2zm0 4l6 6-6 6-6-6 6-6z" },
];

const ShootingStar = ({ delay = 0, top = "20%", left = "-10%" }) => (
  <motion.div
    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
    animate={{ 
      x: ["0vw", "120vw"], 
      y: ["0vh", "50vh"], 
      opacity: [0, 1, 1, 0],
      scale: [0, 1.5, 1.5, 0]
    }}
    transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent rotate-[20deg] z-[1] pointer-events-none w-[200px]"
    style={{ top, left }}
  />
);

const InfiniteMarquee = () => {
  return (
    <div className="relative w-full overflow-hidden border-t border-[var(--color-border-subtle)] bg-white/70 backdrop-blur-xl pt-10 pb-12 z-10">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
      `}</style>
      
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      
      <div className="flex items-center justify-center mb-10 z-20 relative">
         <span className="text-overline text-[var(--color-muted)] tracking-[0.25em] text-[0.65rem] md:text-xs">
           Trusted by industry leaders
         </span>
      </div>

      <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] transition-all duration-300">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-14 md:space-x-28 px-7 md:px-14 w-max">
            {PARTNERS.map((partner) => (
              <div 
                key={`${i}-${partner.id}`} 
                className="group flex flex-col items-center justify-center gap-4 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-500 cursor-pointer"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 relative flex items-center justify-center transform group-hover:-translate-y-1 transition-transform duration-500 ease-out">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-black group-hover:text-[var(--color-primary)] transition-colors duration-500">
                    <path d={partner.logo} />
                  </svg>
                </div>
                <span className="font-heading text-sm md:text-base font-semibold tracking-wide text-black/70 group-hover:text-[var(--color-primary)] transition-colors duration-500">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scrollY  = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const scrollOp = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const orbX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-45, 45]), PARALLAX_SPRING);
  const orbY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-45, 45]), PARALLAX_SPRING);

  // Subtle interactive light coordinates
  const lightX = useSpring(useTransform(mouseX, [-0.5, 0.5], ["35%", "65%"]), PARALLAX_SPRING);
  const lightY = useSpring(useTransform(mouseY, [-0.5, 0.5], ["35%", "65%"]), PARALLAX_SPRING);

  useEffect(() => {
    const isTouch  = window.matchMedia("(pointer: coarse)").matches;
    const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

  const scrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) cinematicScroll(el.getBoundingClientRect().top + window.scrollY - 72, 900);
  };

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100dvh] flex flex-col items-center justify-between overflow-hidden bg-white"
    >
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden
      >
        {AMBIENT_ORBS.map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width:  orb.size,
              height: orb.size,
              left:   orb.x,
              top:    orb.y,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, rgba(${orb.color},${orb.op}) 0%, transparent 70%)`,
              animation: `ambient-drift ${orb.dur}s ease-in-out infinite alternate`,
              animationDelay: `${i * -4}s`,
              filter: "blur(24px)",
            }}
          />
        ))}
      </motion.div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-0"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-primary) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-primary) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      {/* ── Neural Network Pattern Layer (Visible on Hover) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='%235920a1' fill-opacity='0.6'/%3E%3Ccircle cx='60' cy='60' r='1' fill='%235920a1' fill-opacity='0.3'/%3E%3Cpath d='M2 2 L60 60' stroke='%235920a1' stroke-width='0.5' stroke-opacity='0.15'/%3E%3Cpath d='M60 60 L120 2' stroke='%235920a1' stroke-width='0.5' stroke-opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: "120px 120px",
          maskImage: useTransform(
            [lightX, lightY],
            ([x, y]) => `radial-gradient(circle 350px at ${x} ${y}, black 10%, transparent 80%)`
          ),
          WebkitMaskImage: useTransform(
            [lightX, lightY],
            ([x, y]) => `radial-gradient(circle 350px at ${x} ${y}, black 10%, transparent 80%)`
          )
        }}
        aria-hidden
      />

      {/* ── Enhanced Cosmic Interaction Layer ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: useTransform(
            [lightX, lightY],
            ([x, y]) => `
              radial-gradient(circle 450px at ${x} ${y}, rgba(89,32,161,0.12), transparent 100%),
              radial-gradient(circle 180px at ${x} ${y}, rgba(239,90,152,0.08), transparent 100%)
            `
          )
        }}
        aria-hidden
      />

      {/* ── Shooting Star Intro ── */}
      <ShootingStar delay={0.4} top="15%" left="-5%" />
      <ShootingStar delay={0.7} top="40%" left="-15%" />
      <ShootingStar delay={1.1} top="10%" left="20%" />

      <div className="flex-1 w-full" />

      <motion.div
        style={{ y: scrollY, opacity: scrollOp }}
        className="relative z-20 w-full flex flex-col items-center text-center px-4 sm:px-6 md:px-8 mt-24"
      >
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-white/70 backdrop-blur-md px-5 py-2 mb-10 shadow-sm hover:shadow-lg hover:border-[var(--color-primary-light)] transition-all duration-300 cursor-pointer"
          >
            <div className="relative flex h-2 w-2 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-accent)]"></span>
            </div>
            <span className="text-overline text-[var(--color-text-secondary)] tracking-[0.2em] group-hover:text-[var(--color-primary)] transition-colors">
              Andromeda — AI-first technology
            </span>
          </motion.div>

          <h1 className="font-heading text-black leading-[1.05] tracking-tight mb-8 md:mb-10 text-[clamp(2.75rem,8vw,8rem)] flex flex-wrap justify-center gap-x-[0.22em] max-w-[15em] [perspective:1000px]">
            {["We", "build", "what", "comes", "next."].map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, rotateX: -30, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block origin-bottom"
                style={i === 4 ? {
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                } : {}}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="text-body-lg text-[var(--color-text-secondary)] mb-12 md:mb-16 leading-relaxed max-w-[42rem] mx-auto px-4 text-center"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Backend systems, SaaS platforms, and AI solutions engineered for the companies that define tomorrow. We transform complex logic into elegant interfaces.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.a
              href="#services"
              onClick={(e) => scrollTo(e, "#services")}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center justify-center gap-2 px-9 py-4.5 bg-[var(--color-primary)] text-white rounded-full font-body font-semibold text-[1rem] tracking-wide overflow-hidden shadow-[0_10px_30px_rgba(89,32,161,0.25)] hover:shadow-[0_15px_40px_rgba(89,32,161,0.45)] transition-all"
            >
              <span className="relative z-10">Explore capabilities</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary-light)] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </motion.a>
            
            <motion.a
              href="#contact"
              onClick={(e) => scrollTo(e, "#contact")}
              whileHover={{ scale: 1.05, x: 3 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 text-[1rem] font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 px-7 py-4.5 rounded-full hover:bg-[var(--color-primary)]/5"
            >
              Get in touch
              <motion.svg 
                width="18" height="18" viewBox="0 0 16 16" fill="none"
                className="transform group-hover:translate-x-1.5 transition-transform duration-300"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      <div className="flex-1 w-full" />

      <motion.div 
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <InfiniteMarquee />
      </motion.div>

    </section>
  );
}
