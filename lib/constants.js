/**
 * Andromeda — Site Constants
 *
 * Centralized content and configuration data.
 * Single source of truth for all copy, navigation, and metadata.
 */

export const SITE = {
  name: "Andromeda",
  tagline: "We build what comes next.",
  description:
    "Backend systems, SaaS platforms, and AI solutions engineered for the companies that define tomorrow.",
  url: "https://andromeda.dev",
};

export const NAV_LINKS = [
  { name: "Capabilities", href: "#services"     },
  { name: "Products",     href: "#products"     },
  { name: "AI",          href: "#ai-expertise" },
  { name: "Process",     href: "#process"      },
  { name: "Contact",     href: "#contact"      },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "We immerse in your domain, map constraints, and define the exact problem worth solving. No assumptions, no shortcuts.",
    accent: "#5920a1",
  },
  {
    number: "02",
    title: "Architect",
    description:
      "We design systems built to last — scalable, maintainable, and elegant from the foundation up.",
    accent: "#3b40c4",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Rapid, iterative engineering with continuous feedback loops. You see real progress, not a black box.",
    accent: "#5920a1",
  },
  {
    number: "04",
    title: "Launch & Partner",
    description:
      "Battle-tested deployment with monitoring, scaling, and ongoing collaboration. We ship, then we stay.",
    accent: "#3b40c4",
  },
];

export const METRICS = [
  { value: 99.9, suffix: "%", label: "Uptime" },
  { value: 50, suffix: "M+", label: "API Calls" },
  { value: 200, suffix: "+", label: "Teams Served" },
];

export const TESTIMONIAL = {
  quote:
    "Andromeda doesn't just build software — they build the kind of infrastructure you forget exists because it never fails.",
  author: "Sarah Chen",
  title: "CTO, Nexus Technologies",
};

export const FOOTER_COLS = [
  {
    heading: "Product",
    links: [
      { label: "Backend Systems", href: "#services" },
      { label: "SaaS Platforms",  href: "#services" },
      { label: "AI Solutions",    href: "#ai-expertise" },
      { label: "Developer Tools", href: "#products" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",   href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog",    href: "#" },
      { label: "Press",   href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Status",        href: "#" },
      { label: "Changelog",     href: "#" },
    ],
  },
];

export const AI_EXPERTISE = [
  {
    label: "Artificial Intelligence",
    desc: "LLM integration, fine-tuning, and custom model development",
  },
  {
    label: "Machine Learning",
    desc: "Prediction pipelines, recommender systems, and anomaly detection",
  },
  {
    label: "Deep Learning",
    desc: "Neural architectures for vision, language, and multimodal tasks",
  },
  {
    label: "Data Infrastructure",
    desc: "Scalable data pipelines, warehouses, and real-time stream processing",
  },
];

export const AI_DIFFERENTIATORS = [
  { value: "100%", label: "AI-native architecture" },
  { value: "Edge",  label: "Inference deployment" },
  { value: "0",     label: "Black-box APIs relied upon" },
];

