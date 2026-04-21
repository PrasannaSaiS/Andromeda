"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/motion";

/**
 * Section — wrapper for every page section.
 * Handles consistent padding, max-width, and scroll-triggered reveal.
 */
const Section = forwardRef(({
  children,
  className = "",
  id,
  tinted = false,
  fullWidth = false,
  noPadding = false,
  autoHeight = false,
}, ref) => {
  const bgClass = tinted ? "bg-surface-tinted" : "bg-surface";
  const containerClass = fullWidth
    ? "section-container--full"
    : "section-container";
    
  const heightClass = autoHeight ? "" : "min-h-screen flex flex-col justify-center";

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`snap-start ${heightClass} ${bgClass} ${noPadding ? "" : "section-padding"} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={fadeUp}
    >
      <div className={containerClass}>{children}</div>
    </motion.section>
  );
});

Section.displayName = "Section";

export default Section;
