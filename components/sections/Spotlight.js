"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { slideRight } from "@/lib/motion";

export default function Spotlight() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <Section ref={ref} tinted className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Abstract 3D Visualization Placeholder */}
        <motion.div style={{ y: y1 }} className="relative h-[400px] w-full flex items-center justify-center">
          <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-secondary)] opacity-10 blur-3xl absolute" />
          <div className="w-[200px] h-[200px] rounded-full border border-[var(--color-primary)] opacity-20 absolute" />
          <div className="w-[240px] h-[240px] rounded-full border border-[var(--color-secondary)] opacity-10 absolute rotate-45" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-[100px] h-[100px] rounded-full bg-[var(--color-primary)] opacity-90 shadow-2xl relative z-10"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div variants={slideRight} className="max-w-md">
          <span className="text-overline text-[var(--color-accent)] block mb-4">Flagship</span>
          <h2 className="text-h2 mb-6">Andromeda Core</h2>
          <p className="text-body text-muted mb-8">
            The foundation of invisible infrastructure. Deploy intelligent routing, global state sync, and edge compute without managing a single server.
          </p>
          <Button variant="ghost" href="#">
            Learn more
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
