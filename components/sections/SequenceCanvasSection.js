"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollCanvas from "@/components/ui/ScrollCanvas";

export default function SequenceCanvasSection() {
  const containerRef = useRef(null);

  // Track the scroll progress of this entire 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- TEXT 1: Ideas -> Engineered ---
  // Opacity: fades in (0.05 - 0.15), stays (0.15 - 0.25), fades out (0.25 - 0.35)
  const opacity1 = useTransform(scrollYProgress, [0.05, 0.15, 0.25, 0.35], [0, 1, 1, 0]);
  // Vertical Parallax: moves slightly up while visible
  const y1 = useTransform(scrollYProgress, [0.05, 0.35], [40, -40]);

  // --- TEXT 2: Systems -> Built ---
  // Opacity: fades in (0.35 - 0.45), stays (0.45 - 0.55), fades out (0.55 - 0.65)
  const opacity2 = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.35, 0.65], [40, -40]);

  // --- TEXT 3: Solutions -> Delivered ---
  // Opacity: fades in (0.65 - 0.75), stays (0.75 - 0.90), fades out (0.90 - 1.0)
  const opacity3 = useTransform(scrollYProgress, [0.65, 0.75, 0.9, 1.0], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.65, 1.0], [40, -40]);

  return (
    <section ref={containerRef} className="snap-start relative w-full">
      <ScrollCanvas
        frameCount={240}
        framePrefix="/frames/ezgif-frame-"
        frameSuffix=".png"
        padLength={3}
        containerHeightClass="h-[400vh]" // Provides exactly 4 screens of scrolling
      >
        {/* Absolute container to center all text overlays */}
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center z-10 mix-blend-difference text-white">
          
          <motion.div
            style={{ opacity: opacity1, y: y1 }}
            className="absolute w-full px-4"
          >
            <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-heading leading-tight tracking-tight text-balance">
              <span className="text-white/60">Ideas</span> → Engineered
            </h2>
          </motion.div>

          <motion.div
            style={{ opacity: opacity2, y: y2 }}
            className="absolute w-full px-4"
          >
            <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-heading leading-tight tracking-tight text-balance">
              <span className="text-white/60">Systems</span> → Built
            </h2>
          </motion.div>

          <motion.div
            style={{ opacity: opacity3, y: y3 }}
            className="absolute w-full px-4"
          >
            <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-heading leading-tight tracking-tight text-balance">
              <span className="text-white/60">Solutions</span> → Delivered
            </h2>
          </motion.div>

        </div>
      </ScrollCanvas>
    </section>
  );
}
