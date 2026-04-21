"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NAV_LINKS = [
  { name: "Home", href: "#top" },
  { name: "Capabilities", href: "#services" },
  { name: "Products", href: "#products" },
  { name: "Process", href: "#process" }, // Future section
  { name: "Contact", href: "#cta" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#top");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle Scroll and Active State
  useEffect(() => {
    const handleScroll = () => {
      // Toggle frosted glass effect
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll Spy Logic
      let currentSection = "#top";
      for (const link of NAV_LINKS) {
        if (link.href === "#top") continue;
        const element = document.querySelector(link.href);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is near the top of the viewport
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = link.href;
          }
        }
      }
      
      // Edge case for top of page
      if (window.scrollY < 100) {
        currentSection = "#top";
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      // Offset by 80px (navbar height) to not overlap content
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-lg border-b border-border shadow-sm py-4"
            : "bg-transparent border-b border-transparent py-6"
        }`}
      >
        <div className="section-container flex items-center justify-between">
          
          {/* Left: Logo */}
          <a
            href="#top"
            onClick={(e) => handleLinkClick(e, "#top")}
            className="flex items-center gap-3 relative z-50"
          >
            {/* We provide a fallback text if logo.png fails to load */}
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <Image 
                src="/logo.png" 
                alt="Andromeda Logo" 
                fill 
                className="object-contain"
                sizes="40px"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <span className="font-heading text-xl font-bold uppercase text-[var(--color-primary)]">
              Andromeda
            </span>
          </a>

          {/* Right: Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-body-sm font-semibold transition-colors duration-300 relative group ${
                    isActive ? "text-[var(--color-primary)]" : "text-black hover:text-[var(--color-primary)]"
                  }`}
                >
                  {link.name}
                  
                  {/* Hover Underline Animation (scaleX) */}
                  <span 
                    className={`absolute -bottom-1 left-0 w-full h-[2px] bg-[var(--color-primary)] origin-left transition-transform duration-300 ease-out ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`} 
                  />
                </a>
              );
            })}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className="md:hidden relative z-50 p-2 text-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="w-6 flex flex-col items-end gap-1.5">
              <span className={`block h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? "w-6 rotate-45 translate-y-[8px]" : "w-6"}`} />
              <span className={`block h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "w-4"}`} />
              <span className={`block h-[2px] bg-current transition-all duration-300 ${isMobileMenuOpen ? "w-6 -rotate-45 -translate-y-[8px]" : "w-5"}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 items-center text-center">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-h2 font-heading w-full py-4 border-b border-border transition-colors ${
                    activeSection === link.href ? "text-[var(--color-primary)]" : "text-black"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
