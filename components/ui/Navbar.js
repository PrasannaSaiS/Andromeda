"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cinematicScroll } from "@/lib/cinematicScroll";

const NAV_LINKS = [
  { name: "Home",         href: "#top" },
  { name: "Capabilities", href: "#services" },
  { name: "Products",     href: "#products" },
  { name: "Process",      href: "#ai-expertise" },
  { name: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [activeSection,    setActiveSection]    = useState("#top");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        total > 0 ? (scrolled / total).toString() : "0"
      );
      setIsScrolled(scrolled > 50);
      if (scrolled < 100) { setActiveSection("#top"); return; }
      for (const link of NAV_LINKS) {
        if (link.href === "#top") continue;
        const el = document.querySelector(link.href);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 160 && bottom >= 160) setActiveSection(link.href);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (href === "#top") {
      cinematicScroll(0, 1000);
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      const target = el.getBoundingClientRect().top + window.scrollY - 80;
      cinematicScroll(target, 1000);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/82 backdrop-blur-2xl border-b border-[var(--color-border)] shadow-[0_1px_32px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
        style={{ height: "var(--navbar-height)" }}
      >
        <div className="section-container h-full flex items-center justify-between">

          {/* Logo */}
          <a href="#top" onClick={(e) => scrollTo(e, "#top")}
            className="flex items-center relative z-50 group flex-shrink-0">
            <Image src="/logo.png" alt="Andromeda" width={181} height={56}
              className="object-contain transition-all duration-300 group-hover:scale-[1.03] group-hover:opacity-90"
              priority />
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a key={link.name} href={link.href} onClick={(e) => scrollTo(e, link.href)}
                  className={`relative text-[0.9375rem] font-semibold tracking-wide py-1.5 transition-colors duration-200 group ${
                    isActive ? "text-[var(--color-primary)]" : "text-black/50 hover:text-black"
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[var(--color-primary)] origin-left transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} />
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-primary)]"
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA */}
          <motion.a href="#contact" onClick={(e) => scrollTo(e, "#contact")}
            whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] text-white text-[0.9375rem] font-semibold px-6 py-2.5 hover:bg-[var(--color-primary-dark)] transition-colors duration-200 shadow-[0_4px_20px_rgba(89,32,161,0.25)] flex-shrink-0"
          >
            Get in touch
          </motion.a>

          {/* Hamburger */}
          <button className="md:hidden relative z-50 p-2 -mr-2 text-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle Menu">
            <div className="w-6 flex flex-col items-end gap-[5px]">
              <span className={`block h-[2px] bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"}`} />
              <span className={`block h-[2px] bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 w-6" : "w-4"}`} />
              <span className={`block h-[2px] bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-5"}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col md:hidden"
            style={{ paddingTop: "var(--navbar-height)" }}
          >
            <div className="flex flex-col px-6 pt-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a key={link.name} href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className={`text-[2rem] font-heading py-4 border-b border-[var(--color-border)] transition-colors ${
                    activeSection === link.href ? "text-[var(--color-primary)]" : "text-black/65"
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a href="#contact" onClick={(e) => scrollTo(e, "#contact")}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.38 }}
                className="mt-8 self-start inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white text-[1.0625rem] font-semibold px-8 py-4 shadow-[0_4px_20px_rgba(89,32,161,0.3)]"
              >
                Get in touch
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
