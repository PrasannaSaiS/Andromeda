"use client";

import { motion } from "framer-motion";
import { buttonHover, buttonTap } from "@/lib/motion";

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  onClick,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-wide transition-colors duration-200 cursor-pointer whitespace-nowrap";

  const variants = {
    primary:
      "bg-[var(--color-primary)] text-white text-[1rem] px-8 py-3.5 hover:bg-[var(--color-primary-dark)] shadow-[0_4px_16px_rgba(89,32,161,0.22)]",
    secondary:
      "bg-transparent text-[var(--color-primary)] border-2 border-[var(--color-primary)] text-[1rem] px-8 py-3.5 hover:bg-[rgba(89,32,161,0.05)]",
    ghost:
      "bg-transparent text-[var(--color-secondary)] text-[1rem] px-0 py-2 hover:text-[var(--color-primary)] group",
    inverted:
      "bg-white text-[var(--color-primary)] text-[1rem] px-8 py-3.5 hover:bg-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.12)]",
  };

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      whileHover={buttonHover}
      whileTap={buttonTap}
      {...props}
    >
      {children}
      {variant === "ghost" && (
        <motion.span
          className="inline-block"
          initial={{ x: 0 }}
          whileHover={{ x: 6 }}
          transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          →
        </motion.span>
      )}
    </Tag>
  );
}
