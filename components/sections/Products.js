"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { fadeUp } from "@/lib/motion";

const PRODUCTS = [
  {
    title: "Apps",
    description: "Intelligent applications crafted for end-users, blending powerful AI capabilities with seamless, intuitive interfaces.",
    // Abstract App UI Visual
    visual: (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-surface-tinted group-hover:bg-transparent transition-colors duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
        <motion.div 
          className="w-3/4 h-3/4 bg-white/80 backdrop-blur-md border border-white rounded-xl flex flex-col p-4 relative z-10"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ ease: "easeOut", duration: 0.4 }}
        >
          <div className="w-full h-4 bg-border/50 rounded-full mb-3" />
          <div className="w-2/3 h-4 bg-border/30 rounded-full mb-auto" />
          <div className="w-full h-1/2 bg-[var(--color-primary)]/5 rounded-lg border border-[var(--color-primary)]/10" />
        </motion.div>
      </div>
    )
  },
  {
    title: "Plugins",
    description: "Modular integrations that drop into your existing workflow, instantly supercharging your platforms with zero friction.",
    // Abstract Plugin Visual
    visual: (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-surface-tinted group-hover:bg-transparent transition-colors duration-500">
         <div className="absolute inset-0 bg-gradient-to-bl from-[var(--color-secondary)] to-[var(--color-primary)] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
         <motion.div 
          className="relative z-10 flex gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ ease: "easeOut", duration: 0.4 }}
         >
           <motion.div 
             className="w-12 h-12 bg-white rounded-lg border border-border flex items-center justify-center"
             animate={{ y: [0, -4, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           >
             <div className="w-4 h-4 rounded-full bg-[var(--color-primary)]/40" />
           </motion.div>
           <motion.div 
             className="w-12 h-12 bg-[var(--color-primary)] rounded-lg flex items-center justify-center"
             animate={{ y: [0, 4, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
           >
             <div className="w-4 h-4 rounded-full bg-white/60" />
           </motion.div>
         </motion.div>
      </div>
    )
  },
  {
    title: "Developer Tools",
    description: "Command-line interfaces, SDKs, and APIs designed for developer joy. Built for speed, typed strictly, and documented deeply.",
    // Abstract CLI Visual
    visual: (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-surface-tinted group-hover:bg-transparent transition-colors duration-500">
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-secondary)] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
        <motion.div 
          className="w-3/4 h-2/3 bg-black rounded-lg flex flex-col relative z-10 overflow-hidden"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ ease: "easeOut", duration: 0.4 }}
        >
          {/* Terminal Header */}
          <div className="h-6 bg-white/10 flex items-center px-3 gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
          {/* Terminal Body */}
          <div className="p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-primary)] font-mono text-xs">❯</span>
              <div className="h-2 w-16 bg-white/40 rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-24 bg-[var(--color-secondary)]/60 rounded-full ml-4" />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[var(--color-primary)] font-mono text-xs">❯</span>
              <motion.div 
                className="h-3 w-2 bg-white/80"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    )
  }
];

export default function Products() {
  return (
    <Section id="products" className="section-padding">
      <div className="mb-[var(--space-8)] max-w-2xl text-center mx-auto section-container">
        <span className="text-overline text-[var(--color-primary)] mb-[var(--space-3)] block">Ecosystem</span>
        <h2 className="text-h2 mb-[var(--space-4)]">Built to be tangible.</h2>
        <p className="text-body text-muted">
          From full-scale applications to precise developer tooling, our products exist to accelerate your velocity.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            }
          }
        }}
      >
        {PRODUCTS.map((product, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            className="group flex flex-col bg-surface-elevated rounded-2xl overflow-hidden border border-border
                       hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500"
          >
            {/* Visual Header Region */}
            <div className="h-56 w-full border-b border-border/50 relative">
              {product.visual}
            </div>
            
            {/* Text Content */}
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-h3 mb-3 text-black group-hover:text-[var(--color-primary)] transition-colors duration-300">
                {product.title}
              </h3>
              <p className="text-body-sm text-muted">
                {product.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
