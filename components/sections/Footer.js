"use client";

import Link from "next/link";

const LINKS = [
  { label: "Platform", href: "#" },
  { label: "Documentation", href: "#" },
  { label: "Company", href: "#" },
  { label: "Contact", href: "#" },
];

const SOCIALS = [
  { label: "Twitter", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="snap-start w-full border-t border-border bg-surface px-6 py-12 md:py-20">
      <div className="max-w-[1120px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="font-heading tracking-tight text-xl font-bold uppercase text-[var(--color-primary)] mb-4 inline-block">
              Andromeda
            </Link>
            <p className="text-body-sm text-muted max-w-xs">
              Engineering intelligence. Delivering scalable systems for the future of technology.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-body font-bold text-black mb-4">Explore</h4>
            <ul className="space-y-3">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-body-sm text-muted hover:text-[var(--color-primary)] transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-body font-bold text-black mb-4">Connect</h4>
            <ul className="space-y-3">
              {SOCIALS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-body-sm text-muted hover:text-[var(--color-primary)] transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-caption text-muted">
            &copy; {currentYear} Andromeda Technologies. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-caption text-muted hover:text-black transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="#" className="text-caption text-muted hover:text-black transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
