# Andromeda — Landing Page Architecture

> *"The quietest stars burn the brightest."*

A premium, light-themed landing page for an AI-first company that builds the invisible infrastructure of tomorrow. The design philosophy: **restraint is luxury**.

---

## Brand System

| Token | Value | Usage |
|---|---|---|
| `--primary` | `#5920a1` | Headlines, CTAs, key UI anchors |
| `--secondary` | `#3b40c4` | Supporting text, hover states, links |
| `--accent` | `#ef5a98` | Micro-highlights, badges, notification dots |
| `--text` | `#000000` | Body copy, high-contrast elements |
| `--surface` | `#fafafa` | Page background — warm white, not clinical |
| `--muted` | `#6b7280` | Captions, metadata, secondary info |
| `--divider` | `#e5e7eb` | Section separators, card borders |

**Typography**
- **Headings**: Abril Display — editorial gravity, timeless authority
- **Body**: Filson Soft — warm, humanistic, approachable tech

**Motion Philosophy**
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` — Apple-style spring feel
- Duration: 600–1000ms for reveals, 200–300ms for micro-interactions
- Rule: **Nothing jumps. Everything arrives.**

---

## Page Structure

---

### § 1 — Hero: "The Quiet Arrival"

**Purpose**
First impression. Establish Andromeda as a force of calm intelligence. No noise, no visual overload — just a single, commanding statement that makes the visitor pause.

**Visual Behavior**
- Full-viewport white canvas with a single oversized headline, center-aligned
- Headline text: *"We build what comes next."* — set in Abril Display, `#000000`, ~7vw fluid size
- Below: a single-line descriptor in Filson Soft, muted gray — *"AI systems. Developer platforms. Invisible infrastructure."*
- A single CTA pill button: `#5920a1` background, white text — *"Explore Andromeda"*
- **Ambient element**: A single, faint concentric ring pattern (like a gravitational field) radiates slowly from the center of the page behind the text. Rendered in `#5920a1` at 3–5% opacity. Pulses gently — one cycle every 8 seconds.

**Interaction Notes**
- On load: headline characters stagger in from below (30ms per character), opacity 0→1
- Ring pattern begins expanding only after text fully appears (sequenced choreography)
- Scroll indicator: a thin vertical line at the bottom with a descending dot, fading in at 1.5s delay
- **Parallax**: As user begins scrolling, the headline translates up at 0.6× scroll speed, creating depth

**User Feels**: *"This is different. This is deliberate."*

---

### § 2 — Brand Essence: "The Orbit Statement"

**Purpose**
Crystallize what Andromeda is in one elegant moment. Not a feature list — a philosophy.

**Visual Behavior**
- Three short lines of text, stacked vertically, left-aligned on a wide white field
- Each line is a declaration:
  - *"Intelligence, engineered."*
  - *"Platforms, invisible."*
  - *"Impact, undeniable."*
- Each line set in Abril Display, large (4vw), with generous vertical rhythm (4rem line gap)
- A thin vertical accent line (`#ef5a98`, 2px wide, 60px tall) sits to the left of the active line as a scroll-tracker

**Interaction Notes**
- Lines reveal one-by-one as the user scrolls, using intersection observer with staggered thresholds
- The pink accent line slides down to track which line is currently "active" (in viewport center)
- Each line transitions: `translateY(40px) → 0`, `opacity 0 → 1`, duration 800ms
- Lines that scroll past de-emphasize: opacity drops to 0.2

**User Feels**: *"They know exactly what they are."*

---

### § 3 — Capabilities Grid: "The Constellation"

**Purpose**
Show what Andromeda builds — not as a boring list, but as an interconnected system.

**Visual Behavior**
- A 2×2 bento-style grid of capability cards on white, with subtle `#e5e7eb` borders
- Each card contains:
  - A minimal geometric icon (line-art, single stroke, `#5920a1`)
  - A title in Abril Display: *Backend Systems / SaaS Platforms / AI·ML·DL / Developer Tools*
  - A two-line description in Filson Soft, `#6b7280`
- Between the four cards, faint dotted connector lines form a subtle cross pattern — implying interconnection
- The entire grid sits within a generous white container with `max-width: 1120px`

**Interaction Notes**
- Cards enter with a staggered cascade: top-left → top-right → bottom-left → bottom-right, 150ms apart
- On hover: card background transitions to `#f3f0ff` (very faint purple tint), border color shifts to `#5920a1` at 20% opacity
- The connector lines between cards draw themselves (SVG stroke-dashoffset animation) as the section enters the viewport
- Icons have a subtle continuous rotation (360° over 60 seconds) — so slow it's almost subliminal

**User Feels**: *"Everything they build is connected. This is a system, not a list."*

---

### § 4 — Signature Product Spotlight: "The Gravity Well"

**Purpose**
Showcase one flagship product or capability with cinematic depth. This is the "hero within the hero" — the section that would win an Awwwards nomination on its own.

**Visual Behavior**
- Full-width section with a soft gradient background: white → `#f8f5ff` (barely-there lavender)
- Left side: large product mockup or abstract 3D visualization (a luminous sphere with orbiting data particles, rendered as a lightweight CSS/SVG animation)
- Right side: editorial-style text block
  - Overline: `#ef5a98` uppercase small text — *"FLAGSHIP"*
  - Headline: Abril Display — *"Andromeda Core"*
  - Body: 3–4 lines of Filson Soft describing the product's philosophy
  - A text link with arrow: *"Learn more →"* in `#3b40c4`

**Interaction Notes**
- The 3D sphere/visualization is scroll-linked: as user scrolls through this section, the sphere slowly rotates and particles shift orbit
- Text block enters from the right with a smooth slide (`translateX(60px) → 0`)
- The "Learn more" arrow has a hover micro-animation: arrow translates 6px right, returns with spring easing
- **Scroll parallax**: mockup moves at 0.85× speed, text at 1× — creating a subtle layered depth

**User Feels**: *"This is their main thing. It looks like it matters."*

---

### § 5 — Social Proof Bar: "The Signal"

**Purpose**
Establish trust through association. Minimal, no testimonials — just presence.

**Visual Behavior**
- A narrow horizontal band (80px tall) with a barely-visible top/bottom border
- Contains 5–6 partner/client logos in monochrome gray (`#9ca3af`), evenly spaced
- No background color change — it lives on the same white canvas
- A subtle label above: *"Trusted by teams building the future"* in Filson Soft, `#6b7280`, small caps

**Interaction Notes**
- Logos fade in simultaneously with a 400ms duration as the section enters viewport
- On hover, individual logos transition from gray to their original brand color (or to `#5920a1`)
- Optional: a very slow infinite horizontal scroll (marquee) if more than 6 logos — speed: 40px/second
- No click interaction — purely ambient credibility

**User Feels**: *"They're legitimate. Others trust them."*

---

### § 6 — How It Works: "The Trajectory"

**Purpose**
Demystify the process. Show that working with Andromeda is structured, clear, and human.

**Visual Behavior**
- A horizontal stepped flow (3 steps) connected by a thin progress line (`#5920a1`)
- Each step is a vertical card:
  - Step number in a circle (outlined, `#5920a1`)
  - Title in Abril Display: *"Discover" / "Build" / "Launch"*
  - Short description in Filson Soft
- The connecting line between steps has small dots at equal intervals (like a star chart path)
- On mobile: converts to a vertical stack with the line running down the left edge

**Interaction Notes**
- As the section enters viewport, the connecting line draws itself left-to-right (SVG `stroke-dashoffset`)
- Each step card fades in when the line "reaches" it — creating a sequential reveal
- Step circles fill with `#5920a1` as they activate (border → filled transition)
- Total animation duration across all 3 steps: ~2 seconds

**User Feels**: *"Simple. Clear. I understand exactly how to engage."*

---

### § 7 — Metrics / Impact: "The Magnitude"

**Purpose**
Quantify credibility. Numbers speak louder than adjectives.

**Visual Behavior**
- Three large numbers in a horizontal row, center-aligned
- Each metric: a large animated counter (Abril Display, `#5920a1`, ~6vw) with a label below (Filson Soft, `#6b7280`)
- Example metrics: *"99.9% Uptime" / "50M+ API Calls" / "200+ Teams"*
- A thin horizontal line (`#ef5a98`, 40px wide) sits below each label as a subtle accent

**Interaction Notes**
- Numbers count up from 0 when the section enters viewport (duration: 2s, eased)
- Count animation uses `requestAnimationFrame` for smooth rendering
- Each counter starts with a 200ms stagger
- Numbers have a subtle scale pulse (1.0 → 1.02 → 1.0) when they reach their final value

**User Feels**: *"These numbers are real. This company delivers."*

---

### § 8 — Testimonial: "The Resonance"

**Purpose**
One powerful human voice. Not a carousel of mediocrity — a single, curated endorsement.

**Visual Behavior**
- A single large quote, center-aligned, in Abril Display italic, `#000000`
- Generous whitespace above and below (120px+ padding)
- Below the quote: author name (Filson Soft, bold), title, and a small circular avatar
- A large open-quote mark (`"`) in `#5920a1` at 8% opacity sits behind the text as a watermark
- Optional: a faint radial gradient (`#ef5a98` at 2% opacity) emanates from behind the quote

**Interaction Notes**
- Quote text fades in word-by-word (15ms per word) as the section enters viewport — simulating someone speaking
- Attribution line appears 400ms after the last word
- The background quote mark scales from 0.8 → 1.0 during reveal
- No carousel, no dots, no navigation — stillness is the statement

**User Feels**: *"Someone I respect trusts them. That's enough."*

---

### § 9 — Call to Action: "The Event Horizon"

**Purpose**
Convert intent into action. This is the gravitational pull — once you're here, you commit.

**Visual Behavior**
- A contained card (rounded corners, `max-width: 800px`, centered) with a gradient background: `#5920a1` → `#3b40c4` (left to right)
- White text inside:
  - Headline: Abril Display — *"Ready to build what's next?"*
  - Subtext: Filson Soft — *"Talk to our team. No pitch decks. Just conversation."*
  - Two buttons side by side:
    - Primary: white background, `#5920a1` text — *"Get Started"*
    - Secondary: transparent, white border, white text — *"See Documentation"*
- Subtle noise texture overlay on the gradient (2–3% opacity) for tactile richness

**Interaction Notes**
- Card enters with a gentle scale-up (`scale(0.95) → scale(1)`) and fade
- Buttons have hover states: primary inverts (purple bg, white text), secondary fills white with purple text
- A very faint particle drift (3–4 tiny white dots floating slowly) inside the gradient card — like distant stars
- The gradient subtly shifts its angle on mouse movement (CSS `background-position` linked to cursor)

**User Feels**: *"I want to reach out. The barrier feels low."*

---

### § 10 — Footer: "The Coordinates"

**Purpose**
Navigation, legal, and brand closure. Quiet, functional, trustworthy.

**Visual Behavior**
- Clean white background with a single-pixel top border (`#e5e7eb`)
- Left column: Andromeda wordmark + a one-line tagline in `#6b7280`
- Center columns: link groups (Product, Company, Resources, Legal) in Filson Soft, `#000000`
- Right column: social icons (line-art, `#6b7280`, hover → `#5920a1`)
- Bottom bar: copyright text, very small, `#9ca3af`

**Interaction Notes**
- Links have underline-on-hover using a `scaleX(0) → scaleX(1)` pseudo-element animation
- Social icons scale slightly on hover (1.0 → 1.1) with color transition
- No reveal animations — footer is immediately visible when scrolled to (it's utilitarian)
- A subtle "↑ Back to top" button appears fixed in the bottom-right corner after scrolling past §3

**User Feels**: *"Professional. Complete. I can find what I need."*

---

## UX Emotion Map — The Scroll Journey

```
Scroll Position    Emotion Arc
─────────────────────────────────────────────────
§1  Hero           ◆ Intrigue — "What is this?"
                   │
§2  Brand Essence  ◆ Clarity — "Ah, I understand"
                   │
§3  Capabilities   ◆ Respect — "They do serious work"
                   │
§4  Spotlight      ◆ Desire — "I want this"
                   │
§5  Social Proof   ◆ Trust — "Others want it too"
                   │
§6  How It Works   ◆ Confidence — "I can engage easily"
                   │
§7  Metrics        ◆ Conviction — "The results are real"
                   │
§8  Testimonial    ◆ Connection — "A real person vouches"
                   │
§9  CTA            ◆ Action — "I'm ready"
                   │
§10 Footer         ◆ Closure — "I know where to go"
─────────────────────────────────────────────────
```

The emotional arc follows a classic persuasion funnel: **Attention → Understanding → Credibility → Desire → Action**. Every section has one job. No section tries to do two things.

---

## Global Interaction Rules

| Rule | Detail |
|---|---|
| **Scroll Reveals** | All sections use `IntersectionObserver` with `threshold: 0.15`. No library dependencies. |
| **Reduced Motion** | Respect `prefers-reduced-motion`: disable parallax, replace fades with instant visibility, stop ambient animations. |
| **Performance** | All animations use `transform` and `opacity` only — no layout-triggering properties. |
| **Typography Scale** | Fluid type using `clamp()`: headings `clamp(2rem, 5vw, 5rem)`, body `clamp(1rem, 1.2vw, 1.25rem)`. |
| **Spacing System** | 8px base grid. Section padding: `clamp(80px, 10vw, 160px)` vertical. |
| **Max Content Width** | `1120px` for text content, `1440px` for full-bleed sections. |
| **Cursor** | Custom cursor on desktop: small dot (`#5920a1`) with a trailing ring — subtle, not distracting. |

---

## Mobile Adaptations

- Hero headline scales to `~10vw`, single-column layout throughout
- Capabilities grid → vertical stack with full-width cards
- How It Works → vertical timeline (line on left edge)
- Metrics → vertical stack, numbers centered
- CTA card → full-width, buttons stack vertically
- All parallax effects disabled on touch devices
- Scroll indicator in hero hidden on mobile (natural scroll behavior expected)

---


> [!NOTE]
> This architecture is designed for a **single-page scroll experience** with no routing. If Andromeda requires sub-pages (Pricing, Docs, About), a minimal top navigation bar should be added to §1 with a frosted-glass effect (`backdrop-filter: blur(12px)`) that appears on scroll.
