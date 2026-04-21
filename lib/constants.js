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
    "AI systems. Developer platforms. Invisible infrastructure.",
  url: "https://andromeda.dev",
};

export const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "Solutions", href: "#solutions" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const CAPABILITIES = [
  {
    title: "Backend Systems",
    description:
      "Scalable, resilient server architectures that power millions of requests with zero downtime.",
    icon: "server",
  },
  {
    title: "SaaS Platforms",
    description:
      "End-to-end platforms built for growth — from auth to analytics, billing to real-time sync.",
    icon: "layers",
  },
  {
    title: "AI · ML · DL",
    description:
      "Production-grade intelligence pipelines — from training to inference at planetary scale.",
    icon: "brain",
  },
  {
    title: "Developer Tools",
    description:
      "Plugins, SDKs, and CLI tools that make complex workflows feel effortless.",
    icon: "terminal",
  },
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Discover",
    description:
      "We listen deeply, map your constraints, and define the problem worth solving.",
  },
  {
    step: 2,
    title: "Build",
    description:
      "Rapid, iterative engineering with continuous feedback loops and transparent progress.",
  },
  {
    step: 3,
    title: "Launch",
    description:
      "Battle-tested deployment with monitoring, scaling, and ongoing partnership.",
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

export const FOOTER_LINKS = {
  Product: [
    { label: "Backend", href: "#" },
    { label: "SaaS Platform", href: "#" },
    { label: "AI Solutions", href: "#" },
    { label: "Developer Tools", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Status", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
  ],
};
