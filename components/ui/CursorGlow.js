"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

// Tight spring for the sharp dot
const DOT_SPRING  = { stiffness: 600, damping: 40, mass: 0.4 };
// Slow spring for the trailing glow orb
const ORB_SPRING  = { stiffness: 90,  damping: 22, mass: 0.6 };

export default function CursorGlow() {
  const [mounted,  setMounted]  = useState(false);
  const [isTouch,  setIsTouch]  = useState(true);   // hidden until we confirm pointer:fine
  const [visible,  setVisible]  = useState(false);
  const [hovered,  setHovered]  = useState(false);
  const [clicking, setClicking] = useState(false);

  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);

  const dotX = useSpring(rawX, DOT_SPRING);
  const dotY = useSpring(rawY, DOT_SPRING);
  const orbX = useSpring(rawX, ORB_SPRING);
  const orbY = useSpring(rawY, ORB_SPRING);

  useEffect(() => {
    setMounted(true);
    // Only activate on fine-pointer (mouse) devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsTouch(false);

    const move = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
    };
    const leave  = () => setVisible(false);
    const enter  = () => setVisible(true);
    const down   = () => setClicking(true);
    const up     = () => setClicking(false);
    const over   = (e) => {
      setHovered(!!e.target.closest(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor]"
      ));
    };

    document.addEventListener("mousemove",  move,  { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mousedown",  down);
    document.addEventListener("mouseup",    up);
    document.addEventListener("mouseover",  over,  { passive: true });

    return () => {
      document.removeEventListener("mousemove",  move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mousedown",  down);
      document.removeEventListener("mouseup",    up);
      document.removeEventListener("mouseover",  over);
    };
  }, [rawX, rawY]);

  // Don't render on SSR or touch devices
  if (!mounted || isTouch) return null;

  const dotSize = clicking ? 5 : hovered ? 6 : 7;
  const orbSize = clicking ? 32 : hovered ? 56 : 40;

  return (
    <>
      {/* ── Trailing glow orb ── */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: orbX,
          y: orbY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 99997,
          width:  orbSize,
          height: orbSize,
          background: hovered
            ? "radial-gradient(circle, rgba(239,90,152,0.7) 0%, rgba(89,32,161,0.3) 45%, transparent 70%)"
            : "radial-gradient(circle, rgba(89,32,161,0.55) 0%, rgba(59,64,196,0.2) 45%, transparent 70%)",
          opacity: visible ? 1 : 0,
          filter: "blur(0.5px)",
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.25s ease, background 0.25s ease",
        }}
      />

      {/* ── Hover ring — expands around interactive elements ── */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 rounded-full pointer-events-none border"
        style={{
          x: orbX,
          y: orbY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 99998,
          borderColor: clicking
            ? "rgba(239,90,152,0.8)"
            : "rgba(89,32,161,0.4)",
          opacity: visible ? 1 : 0,
          transition: "border-color 0.2s ease, opacity 0.25s ease",
        }}
        animate={{
          width:  hovered ? 46 : 0,
          height: hovered ? 46 : 0,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── Sharp dot — snaps to exact cursor position ── */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 99999,
          width:  dotSize,
          height: dotSize,
          backgroundColor: hovered
            ? "rgba(239,90,152,1)"
            : "rgba(89,32,161,1)",
          opacity: visible ? 1 : 0,
          boxShadow: hovered
            ? "0 0 10px 2px rgba(239,90,152,0.55)"
            : "0 0 8px 2px rgba(89,32,161,0.45)",
          transition: "width 0.15s ease, height 0.15s ease, background-color 0.2s ease, box-shadow 0.2s ease, opacity 0.25s ease",
        }}
      />
    </>
  );
}
