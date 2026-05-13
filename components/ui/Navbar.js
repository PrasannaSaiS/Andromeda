"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cinematicScroll } from "@/lib/cinematicScroll";

const NAV_LINKS = [
  { name: "Capabilities", href: "#services"     },
  { name: "Products",     href: "#products"     },
  { name: "AI",          href: "#ai-expertise" },
  { name: "Process",     href: "#process"      },
  { name: "Contact",     href: "#contact"      },
];

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [active,   setActive]           = useState("#top");
  const [menuOpen, setMenuOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;

      // Scroll progress for the top bar
      document.documentElement.style.setProperty(
        "--scroll-progress",
        total > 0 ? (sy / total).toString() : "0"
      );

      setScrolled(sy > 40);

      if (sy < 80) { setActive("#top"); return; }
      for (const link of NAV_LINKS) {
        const el = document.querySelector(link.href);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 140 && bottom >= 140) { setActive(link.href); return; }
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    if (href === "#top") { cinematicScroll(0, 800); return; }
    const el = document.querySelector(href);
    if (el) {
      cinematicScroll(el.getBoundingClientRect().top + window.scrollY - 72, 900);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
          scrolled
            ? "bg-white/86 backdrop-blur-2xl border-b border-[var(--color-border)] shadow-[0_1px_24px_rgba(0,0,0,0.05)]"
            : "bg-transparent"
        }`}
        style={{ height: "var(--navbar-height)" }}
      >
        <div className="container h-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => scrollTo(e, "#top")}
            className="flex items-center flex-shrink-0 group"
          >
            <Image
              src="/logo.png"
              alt="Andromeda"
              width={168}
              height={52}
              className="object-contain transition-opacity duration-200 group-hover:opacity-80"
              priority
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className={`relative text-[0.9rem] font-semibold tracking-wide py-1 transition-colors duration-200 ${
                    isActive ? "text-[var(--color-primary)]" : "text-black/45 hover:text-black/80"
                  }`}
                >
                  {link.name}
                  {/* Active underline with layoutId */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-line"
                      className="absolute -bottom-px left-0 w-full h-[1.5px] bg-[var(--color-primary)] rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 36 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA button */}
          <motion.a
            href="#contact"
            onClick={(e) => scrollTo(e, "#contact")}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.34, 1.56, 0.64, 1] }}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] text-white text-[0.875rem] font-semibold px-5 py-2 hover:bg-[var(--color-primary-dark)] transition-colors duration-200 shadow-[0_4px_16px_rgba(89,32,161,0.22)] flex-shrink-0"
          >
            Get in touch
          </motion.a>

          {/* Hamburger */}
          <button
            className="md:hidden relative z-50 p-2 -mr-1.5 text-black"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <div className="w-5 flex flex-col items-end gap-[4px]">
              <span className={`block h-[1.5px] bg-current rounded-full transition-all duration-250 ${menuOpen ? "w-5 rotate-45 translate-y-[5.5px]" : "w-5"}`} />
              <span className={`block h-[1.5px] bg-current rounded-full transition-all duration-250 ${menuOpen ? "opacity-0 w-5" : "w-3.5"}`} />
              <span className={`block h-[1.5px] bg-current rounded-full transition-all duration-250 ${menuOpen ? "w-5 -rotate-45 -translate-y-[5.5px]" : "w-4"}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col md:hidden"
            style={{ paddingTop: "var(--navbar-height)" }}
          >
            <div className="flex flex-col px-6 pt-10 pb-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={`text-[2rem] font-heading py-4 border-b border-[var(--color-border)] ${
                    active === link.href ? "text-[var(--color-primary)]" : "text-black/60"
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => scrollTo(e, "#contact")}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.35 }}
                className="btn-primary mt-8 self-start text-[1rem]"
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
