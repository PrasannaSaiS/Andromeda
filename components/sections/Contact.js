"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

const INFO = [
  {
    label: "Email",
    value: "hello@andromeda.dev",
    href: "mailto:hello@andromeda.dev",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
  {
    label: "Response time",
    value: "Within 24 hours",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: "Based in",
    value: "Global · Remote-first",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
        <path d="M2 12h20"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const [form, setForm]         = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors]     = useState({});
  const [success, setSuccess]   = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name = "Required";
    if (!form.email.trim())   e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Required";
    else if (form.message.trim().length < 10) e.message = "At least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent(`Contact from ${form.name}${form.company ? ` — ${form.company}` : ""}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}${form.company ? `\nCompany: ${form.company}` : ""}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:hello@andromeda.dev?subject=${subject}&body=${body}`;
    setSuccess(true);
    setForm({ name: "", email: "", company: "", message: "" });
    setTimeout(() => setSuccess(false), 6000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: "" }));
  };

  const inputCls = (field) =>
    `w-full px-4 py-3.5 rounded-xl border text-[1rem] bg-white transition-all duration-200 outline-none placeholder:text-black/25 font-body ${
      errors[field]
        ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-50"
        : "border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[rgba(89,32,161,0.07)]"
    }`;

  return (
    <section
      id="contact"
      className="section-py divider relative bg-[var(--color-surface)] overflow-hidden"
    >
      {/* Subtle ambient */}
      <div
        className="absolute top-0 left-0 w-80 h-80 pointer-events-none"
        style={{ background: "radial-gradient(circle at 0% 0%, rgba(89,32,161,0.035) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={staggerContainer(0.1)}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-16 max-w-xl">
            <span className="text-overline text-[var(--color-primary)] mb-4 block">Contact</span>
            <h2 className="text-h1 mb-5">Let&apos;s build something great</h2>
            <p className="text-body text-[var(--color-muted)]">
              Have a project in mind? Tell us about it — we respond within a day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

            {/* Info panel */}
            <motion.div variants={fadeUp} className="lg:col-span-2 flex flex-col gap-5">
              {/* Contact info card */}
              <div className="rounded-2xl bg-white border border-[var(--color-border)] p-7">
                <h3 className="text-[1rem] font-heading mb-6 text-[var(--color-text)]">
                  Contact information
                </h3>
                <div className="flex flex-col gap-5">
                  {INFO.map((item) => (
                    <div key={item.label} className="flex items-start gap-3.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: "rgba(89,32,161,0.07)", color: "var(--color-primary)" }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-[0.6875rem] font-bold uppercase tracking-widest text-[var(--color-muted)] mb-0.5">
                          {item.label}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-[0.9375rem] font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-[0.9375rem] font-semibold text-[var(--color-text)]">{item.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote card */}
              <div
                className="rounded-2xl p-7"
                style={{ background: "linear-gradient(140deg, #5920a1 0%, #3b40c4 100%)" }}
              >
                <p className="text-[1.125rem] font-heading italic text-white/90 leading-snug mb-3">
                  &ldquo;The quietest stars burn the brightest.&rdquo;
                </p>
                <div className="text-[0.8125rem] text-white/50">— Andromeda</div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div variants={fadeUp} className="lg:col-span-3">
              <div className="rounded-2xl bg-white border border-[var(--color-border)] shadow-[0_8px_32px_rgba(0,0,0,0.05)] p-7 md:p-9">

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-[0.875rem] font-semibold"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                    Message sent — we&apos;ll be in touch soon.
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-[0.8125rem] font-semibold text-[var(--color-text-secondary)] mb-1.5">
                        Full name <span style={{ color: "var(--color-accent)" }}>*</span>
                      </label>
                      <input
                        type="text" id="name" name="name"
                        value={form.name} onChange={handleChange}
                        className={inputCls("name")} placeholder="Jane Smith"
                        autoComplete="name"
                      />
                      {errors.name && <p className="mt-1 text-[0.8125rem] text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[0.8125rem] font-semibold text-[var(--color-text-secondary)] mb-1.5">
                        Email <span style={{ color: "var(--color-accent)" }}>*</span>
                      </label>
                      <input
                        type="email" id="email" name="email"
                        value={form.email} onChange={handleChange}
                        className={inputCls("email")} placeholder="jane@company.com"
                        autoComplete="email"
                      />
                      {errors.email && <p className="mt-1 text-[0.8125rem] text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-[0.8125rem] font-semibold text-[var(--color-text-secondary)] mb-1.5">
                      Company <span className="text-[var(--color-muted)] font-normal">(optional)</span>
                    </label>
                    <input
                      type="text" id="company" name="company"
                      value={form.company} onChange={handleChange}
                      className={inputCls("company")} placeholder="Acme Inc."
                      autoComplete="organization"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[0.8125rem] font-semibold text-[var(--color-text-secondary)] mb-1.5">
                      Message <span style={{ color: "var(--color-accent)" }}>*</span>
                    </label>
                    <textarea
                      id="message" name="message"
                      value={form.message} onChange={handleChange}
                      rows={5}
                      className={`${inputCls("message")} resize-none`}
                      placeholder="Tell us about your project, timeline, and goals..."
                    />
                    {errors.message && <p className="mt-1 text-[0.8125rem] text-red-500">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="mt-1 w-full btn-primary justify-center text-[0.9375rem] py-3.5 rounded-xl"
                    style={{ borderRadius: "0.75rem" }}
                  >
                    Send message
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
