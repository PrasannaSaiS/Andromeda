"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { CosmicTopLeft, CosmicBottomRight } from "@/components/ui/CosmicCorners";

const INFO_ITEMS = [
  {
    label: "Email",
    value: "hello@andromeda.dev",
    href: "mailto:hello@andromeda.dev",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "Response time",
    value: "Within 24 hours",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: "Based in",
    value: "Global · Remote-first",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Required";
    if (!formData.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Invalid email";
    if (!formData.message.trim()) e.message = "Required";
    else if (formData.message.trim().length < 10) e.message = "At least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent(`Contact from ${formData.name}${formData.company ? ` — ${formData.company}` : ""}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}${formData.company ? `\nCompany: ${formData.company}` : ""}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:hello@andromeda.dev?subject=${subject}&body=${body}`;
    setShowSuccess(true);
    setFormData({ name: "", email: "", company: "", message: "" });
    setTimeout(() => setShowSuccess(false), 6000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const inputClass = (field) =>
    `w-full px-5 py-4 rounded-xl border text-[1rem] bg-white transition-all duration-200 outline-none placeholder:text-black/30 ${
      errors[field]
        ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
        : "border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[rgba(89,32,161,0.08)]"
    }`;

  return (
    <Section id="contact" className="section-padding bg-surface relative overflow-hidden">
      <CosmicTopLeft className="opacity-50" />
      <CosmicBottomRight className="opacity-40" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer(0.1)}
        className=""
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-16">
          <span className="text-overline text-[var(--color-primary)] mb-3 block">GET IN TOUCH</span>
          <h2 className="text-h1 mb-4">Let's build something great</h2>
          <p className="text-body text-black/60 max-w-xl mx-auto">
            Have a project in mind? Tell us about it — we'll get back to you within a day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left Info Panel */}
          <motion.div variants={fadeUp} className="lg:col-span-2 flex flex-col gap-6">
            <div className="rounded-2xl bg-[var(--color-surface-tinted)] border border-[var(--color-border)] p-8">
              <h3 className="text-[1.125rem] font-heading mb-6 text-black">Contact information</h3>
              <div className="flex flex-col gap-5">
                {INFO_ITEMS.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[rgba(89,32,161,0.08)] flex items-center justify-center text-[var(--color-primary)] flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[0.75rem] font-semibold uppercase tracking-widest text-black/40 mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-[0.9375rem] font-semibold text-black hover:text-[var(--color-primary)] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-[0.9375rem] font-semibold text-black">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[var(--color-primary)] p-8 text-white">
              <div className="text-[1.5rem] font-heading leading-snug mb-3">
                "The quietest stars burn the brightest."
              </div>
              <div className="text-[0.875rem] text-white/60">— Andromeda</div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <div className="rounded-2xl bg-white border border-[var(--color-border)] shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-8 md:p-10">
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-[0.875rem] font-semibold"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  Message sent — we'll be in touch soon.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-[0.8125rem] font-semibold text-black/70 mb-1.5">
                      Full name <span className="text-[var(--color-accent)]">*</span>
                    </label>
                    <input
                      type="text" id="name" name="name"
                      value={formData.name} onChange={handleChange}
                      className={inputClass("name")} placeholder="Jane Smith"
                    />
                    {errors.name && <p className="mt-1.5 text-[0.8125rem] text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[0.8125rem] font-semibold text-black/70 mb-1.5">
                      Email <span className="text-[var(--color-accent)]">*</span>
                    </label>
                    <input
                      type="email" id="email" name="email"
                      value={formData.email} onChange={handleChange}
                      className={inputClass("email")} placeholder="jane@company.com"
                    />
                    {errors.email && <p className="mt-1.5 text-[0.8125rem] text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-[0.8125rem] font-semibold text-black/70 mb-1.5">
                    Company <span className="text-black/30 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text" id="company" name="company"
                    value={formData.company} onChange={handleChange}
                    className={inputClass("company")} placeholder="Acme Inc."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[0.8125rem] font-semibold text-black/70 mb-1.5">
                    Message <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <textarea
                    id="message" name="message"
                    value={formData.message} onChange={handleChange}
                    rows={5}
                    className={`${inputClass("message")} resize-none`}
                    placeholder="Tell us about your project, timeline, and goals..."
                  />
                  {errors.message && <p className="mt-1.5 text-[0.8125rem] text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full mt-1 bg-[var(--color-primary)] text-white rounded-full py-3.5 text-[0.9375rem] font-semibold tracking-[0.02em] hover:bg-[var(--color-primary-dark)] transition-all duration-200 shadow-[0_4px_20px_rgba(89,32,161,0.25)] hover:shadow-[0_8px_30px_rgba(89,32,161,0.35)] hover:-translate-y-0.5 active:translate-y-0"
                >
                  Send message →
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
