"use client";

import { motion } from "framer-motion";
import { buttonHover, buttonTap } from "@/lib/motion";

/**
 * Button — Primary, Secondary, and Ghost variants.
 * Design system: pill shape, sentence case, motion on hover/tap.
 */
export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  onClick,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-body text-[0.9375rem] font-semibold tracking-[0.02em] transition-colors cursor-pointer";

  const variants = {
    primary:
      "bg-[var(--color-primary)] text-white px-8 py-3.5 hover:bg-[var(--color-primary-dark)] shadow-[0_4px_14px_rgba(89,32,161,0.2)]",
    secondary:
      "bg-transparent text-[var(--color-primary)] border-[1.5px] border-[var(--color-primary)] px-8 py-3.5 hover:bg-[rgba(89,32,161,0.05)]",
    ghost:
      "bg-transparent text-[var(--color-secondary)] px-0 py-2 hover:text-[var(--color-primary)]",
    inverted:
      "bg-white text-[var(--color-primary)] px-8 py-3.5 hover:bg-[rgba(255,255,255,0.9)]",
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={buttonHover}
      whileTap={buttonTap}
      {...props}
    >
      {children}
      {variant === "ghost" && (
        <motion.span
          className="inline-block"
          whileHover={{ x: 6 }}
          transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          →
        </motion.span>
      )}
    </Component>
  );
}
