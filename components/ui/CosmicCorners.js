"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";

/* ── Twinkling star ─────────────────────────────────────────────── */
function Star({ x, y, r = 2, color, delay = 0, baseOp = 0.6 }) {
  return (
    <motion.circle
      cx={x} cy={y} r={r} fill={color}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: baseOp, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      animate={{ opacity: [baseOp, Math.min(1, baseOp * 1.9), baseOp * 0.5, baseOp] }}
      // @ts-ignore framer accepts transition on animate
      style={{ animationDuration: `${2 + delay * 3}s` }}
    />
  );
}

/* ── Cross / sparkle ────────────────────────────────────────────── */
function Sparkle({ x, y, size = 8, color, delay = 0 }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.34, 1.56, 0.64, 1] }}
      animate={{ rotate: [0, 180, 360], opacity: [0.7, 1, 0.7] }}
    >
      <line x1={x - size} y1={y} x2={x + size} y2={y} stroke={color} strokeWidth="1" strokeOpacity="0.8" />
      <line x1={x} y1={y - size} x2={x} y2={y + size} stroke={color} strokeWidth="1" strokeOpacity="0.8" />
      <line x1={x - size*0.7} y1={y - size*0.7} x2={x + size*0.7} y2={y + size*0.7} stroke={color} strokeWidth="0.6" strokeOpacity="0.5" />
      <line x1={x + size*0.7} y1={y - size*0.7} x2={x - size*0.7} y2={y + size*0.7} stroke={color} strokeWidth="0.6" strokeOpacity="0.5" />
    </motion.g>
  );
}

/* ── Constellation line ─────────────────────────────────────────── */
function ConLine({ x1, y1, x2, y2, color = "rgba(89,32,161,0.28)", delay = 0, pulse = true }) {
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color} strokeWidth="1"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
      animate={pulse ? { opacity: [0.6, 1, 0.6] } : undefined}
    />
  );
}

/* ── Top-left ───────────────────────────────────────────────────── */
export function CosmicTopLeft({ className = "" }) {
  return (
    <svg className={`absolute top-0 left-0 pointer-events-none ${className}`}
      width="280" height="220" viewBox="0 0 280 220" fill="none" aria-hidden>
      <ConLine x1={18} y1={170} x2={90} y2={95}  color="rgba(89,32,161,0.30)"  delay={0} />
      <ConLine x1={90} y1={95}  x2={190} y2={55} color="rgba(89,32,161,0.25)"  delay={0.18} />
      <ConLine x1={90} y1={95}  x2={140} y2={170} color="rgba(59,64,196,0.22)" delay={0.32} />
      <ConLine x1={190} y1={55} x2={250} y2={30} color="rgba(59,64,196,0.18)"  delay={0.45} />
      <ConLine x1={18} y1={170} x2={60}  y2={210} color="rgba(89,32,161,0.15)" delay={0.55} />

      <Star x={18}  y={170} r={2.5} color="rgba(89,32,161,0.75)"  delay={0}    baseOp={0.75} />
      <Star x={90}  y={95}  r={3.5} color="rgba(89,32,161,0.90)"  delay={0.12} baseOp={0.90} />
      <Star x={190} y={55}  r={2.2} color="rgba(59,64,196,0.70)"  delay={0.28} baseOp={0.70} />
      <Star x={140} y={170} r={1.8} color="rgba(89,32,161,0.60)"  delay={0.40} baseOp={0.60} />
      <Star x={250} y={30}  r={1.5} color="rgba(59,64,196,0.55)"  delay={0.50} baseOp={0.55} />
      <Star x={55}  y={35}  r={1.2} color="rgba(239,90,152,0.65)" delay={0.60} baseOp={0.65} />
      <Star x={220} y={130} r={1.0} color="rgba(89,32,161,0.45)"  delay={0.70} baseOp={0.45} />

      <Sparkle x={90} y={95} size={10} color="rgba(89,32,161,0.5)" delay={0.8} />
      <Sparkle x={55} y={35} size={6}  color="rgba(239,90,152,0.6)" delay={1.0} />

      <motion.path d="M 0 200 Q 70 80 200 10"
        stroke="rgba(89,32,161,0.10)" strokeWidth="1.2" fill="none" strokeDasharray="5 7"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: [0.16,1,0.3,1] }} />
    </svg>
  );
}

/* ── Top-right ──────────────────────────────────────────────────── */
export function CosmicTopRight({ className = "" }) {
  return (
    <svg className={`absolute top-0 right-0 pointer-events-none ${className}`}
      width="260" height="200" viewBox="0 0 260 200" fill="none" aria-hidden>
      <ConLine x1={242} y1={165} x2={165} y2={88}  color="rgba(59,64,196,0.30)"  delay={0} />
      <ConLine x1={165} y1={88}  x2={75}  y2={50}  color="rgba(89,32,161,0.26)"  delay={0.18} />
      <ConLine x1={165} y1={88}  x2={210} y2={25}  color="rgba(239,90,152,0.22)" delay={0.30} />
      <ConLine x1={75}  y1={50}  x2={30}  y2={20}  color="rgba(89,32,161,0.18)"  delay={0.44} />
      <ConLine x1={242} y1={165} x2={260} y2={195} color="rgba(59,64,196,0.14)"  delay={0.55} />

      <Star x={242} y={165} r={2.5} color="rgba(59,64,196,0.75)"  delay={0}    baseOp={0.75} />
      <Star x={165} y={88}  r={3.5} color="rgba(89,32,161,0.90)"  delay={0.12} baseOp={0.90} />
      <Star x={75}  y={50}  r={2.2} color="rgba(89,32,161,0.70)"  delay={0.28} baseOp={0.70} />
      <Star x={210} y={25}  r={2.0} color="rgba(239,90,152,0.75)" delay={0.38} baseOp={0.75} />
      <Star x={30}  y={20}  r={1.5} color="rgba(89,32,161,0.55)"  delay={0.50} baseOp={0.55} />
      <Star x={40}  y={150} r={1.2} color="rgba(59,64,196,0.45)"  delay={0.62} baseOp={0.45} />

      <Sparkle x={165} y={88}  size={11} color="rgba(89,32,161,0.55)"  delay={0.8} />
      <Sparkle x={210} y={25}  size={7}  color="rgba(239,90,152,0.65)" delay={1.0} />

      <motion.path d="M 260 180 Q 180 70 50 10"
        stroke="rgba(59,64,196,0.10)" strokeWidth="1.2" fill="none" strokeDasharray="5 7"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: [0.16,1,0.3,1] }} />
    </svg>
  );
}

/* ── Bottom-left ────────────────────────────────────────────────── */
export function CosmicBottomLeft({ className = "" }) {
  return (
    <svg className={`absolute bottom-0 left-0 pointer-events-none ${className}`}
      width="240" height="200" viewBox="0 0 240 200" fill="none" aria-hidden>
      <ConLine x1={20}  y1={30}  x2={100} y2={100} color="rgba(89,32,161,0.28)"  delay={0} />
      <ConLine x1={100} y1={100} x2={200} y2={140} color="rgba(59,64,196,0.24)"  delay={0.20} />
      <ConLine x1={100} y1={100} x2={70}  y2={170} color="rgba(89,32,161,0.20)"  delay={0.35} />
      <ConLine x1={200} y1={140} x2={230} y2={180} color="rgba(59,64,196,0.16)"  delay={0.48} />

      <Star x={20}  y={30}  r={2.0} color="rgba(89,32,161,0.70)"  delay={0}    baseOp={0.70} />
      <Star x={100} y={100} r={3.2} color="rgba(89,32,161,0.88)"  delay={0.14} baseOp={0.88} />
      <Star x={200} y={140} r={2.2} color="rgba(59,64,196,0.68)"  delay={0.28} baseOp={0.68} />
      <Star x={70}  y={170} r={1.8} color="rgba(239,90,152,0.60)" delay={0.40} baseOp={0.60} />
      <Star x={160} y={50}  r={1.2} color="rgba(89,32,161,0.45)"  delay={0.55} baseOp={0.45} />

      <Sparkle x={100} y={100} size={10} color="rgba(89,32,161,0.50)" delay={0.8} />

      <motion.path d="M 0 10 Q 100 100 220 190"
        stroke="rgba(89,32,161,0.08)" strokeWidth="1.2" fill="none" strokeDasharray="4 8"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: [0.16,1,0.3,1] }} />
    </svg>
  );
}

/* ── Bottom-right ───────────────────────────────────────────────── */
export function CosmicBottomRight({ className = "" }) {
  return (
    <svg className={`absolute bottom-0 right-0 pointer-events-none ${className}`}
      width="240" height="200" viewBox="0 0 240 200" fill="none" aria-hidden>
      <ConLine x1={220} y1={30}  x2={140} y2={100} color="rgba(59,64,196,0.28)"  delay={0} />
      <ConLine x1={140} y1={100} x2={40}  y2={140} color="rgba(89,32,161,0.24)"  delay={0.20} />
      <ConLine x1={140} y1={100} x2={170} y2={170} color="rgba(239,90,152,0.20)" delay={0.35} />
      <ConLine x1={40}  y1={140} x2={10}  y2={180} color="rgba(89,32,161,0.16)"  delay={0.48} />

      <Star x={220} y={30}  r={2.0} color="rgba(59,64,196,0.70)"  delay={0}    baseOp={0.70} />
      <Star x={140} y={100} r={3.2} color="rgba(89,32,161,0.88)"  delay={0.14} baseOp={0.88} />
      <Star x={40}  y={140} r={2.2} color="rgba(89,32,161,0.68)"  delay={0.28} baseOp={0.68} />
      <Star x={170} y={170} r={1.8} color="rgba(239,90,152,0.65)" delay={0.40} baseOp={0.65} />
      <Star x={80}  y={50}  r={1.2} color="rgba(89,32,161,0.45)"  delay={0.55} baseOp={0.45} />

      <Sparkle x={140} y={100} size={10} color="rgba(89,32,161,0.50)" delay={0.8} />
      <Sparkle x={170} y={170} size={6}  color="rgba(239,90,152,0.55)" delay={1.0} />

      <motion.path d="M 240 10 Q 140 100 20 190"
        stroke="rgba(59,64,196,0.08)" strokeWidth="1.2" fill="none" strokeDasharray="4 8"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: [0.16,1,0.3,1] }} />
    </svg>
  );
}

/* ── Orbit ring with glowing dot ────────────────────────────────── */
export function OrbitRing({ size = 300, x = "50%", y = "50%", color = "primary", speed = 60, className = "" }) {
  const rgb = color === "accent" ? "239,90,152" : color === "secondary" ? "59,64,196" : "89,32,161";
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size, height: size,
        left: x, top: y,
        transform: "translate(-50%,-50%)",
        border: `1px solid rgba(${rgb},0.18)`,
        boxShadow: `inset 0 0 ${size * 0.15}px rgba(${rgb},0.04)`,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      <div style={{
        position: "absolute", width: 6, height: 6,
        top: -3, left: "50%", marginLeft: -3,
        borderRadius: "50%",
        background: `rgba(${rgb},0.85)`,
        boxShadow: `0 0 12px 3px rgba(${rgb},0.55), 0 0 4px rgba(${rgb},0.9)`,
      }} />
    </motion.div>
  );
}

/* ── Floating ambient orbs ──────────────────────────────────────── */
const ORB_DATA = [
  { w:320, h:320, left:"8%",  top:"15%", color:"89,32,161",  op:0.06, dur:22, dx:18, dy:12 },
  { w:240, h:240, left:"78%", top:"8%",  color:"59,64,196",  op:0.05, dur:28, dx:-14,dy:16 },
  { w:200, h:200, left:"88%", top:"55%", color:"89,32,161",  op:0.05, dur:18, dx:-10,dy:-8 },
  { w:280, h:280, left:"5%",  top:"70%", color:"239,90,152", op:0.04, dur:24, dx:12, dy:-14},
  { w:180, h:180, left:"50%", top:"90%", color:"59,64,196",  op:0.05, dur:20, dx:-8, dy:10 },
];

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden>
      {ORB_DATA.map((o, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{
            width: o.w, height: o.h,
            left: o.left, top: o.top,
            background: `radial-gradient(circle, rgba(${o.color},${o.op}) 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, o.dx, -o.dx * 0.5, 0],
            y: [0, o.dy, -o.dy * 0.5, 0],
          }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
        />
      ))}
    </div>
  );
}
