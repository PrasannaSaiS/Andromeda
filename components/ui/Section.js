"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { viewportConfig } from "@/lib/motion";

const sectionVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const Section = forwardRef(({
  children,
  className = "",
  id,
  tinted    = false,
  fullWidth = false,
  noPadding = false,
}, ref) => {
  const bgClass        = tinted ? "bg-surface-tinted" : "bg-surface";
  const containerClass = fullWidth ? "section-container--full" : "section-container";

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`${bgClass} ${noPadding ? "" : "section-padding"} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={sectionVariants}
      style={{ willChange: "transform, opacity" }}
    >
      <div className={containerClass}>{children}</div>
    </motion.section>
  );
});

Section.displayName = "Section";
export default Section;
