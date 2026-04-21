# Andromeda — Design System v1.0

> Every pixel must earn its place. If it doesn't serve clarity, confidence, or conversion — remove it.

---

## 1. Color System

### 1.1 Token Palette

| Token | Hex | Role |
|---|---|---|
| `primary` | `#5920a1` | Brand anchor — CTAs, headlines, active states, icons |
| `secondary` | `#3b40c4` | Links, hover states, supporting interactive elements |
| `accent` | `#ef5a98` | Micro-highlights only — badges, overlines, progress indicators |
| `black` | `#000000` | Body text, high-contrast display text |
| `surface` | `#fafafa` | Default page background |
| `surface-elevated` | `#ffffff` | Cards, modals, elevated containers |
| `surface-tinted` | `#f8f5ff` | Subtle section differentiation (barely-there lavender) |
| `muted` | `#6b7280` | Captions, metadata, placeholders, secondary labels |
| `border` | `#e5e7eb` | Dividers, card borders, separators |
| `border-hover` | `rgba(89, 32, 161, 0.15)` | Interactive border on hover |

### 1.2 Usage Rules

| Element | Color | Rule |
|---|---|---|
| **Page background** | `surface` | Always `#fafafa`. Never pure white `#fff` for full-page bg. |
| **Card background** | `surface-elevated` | Pure `#ffffff` to lift off the surface. |
| **Section alternation** | `surface` ↔ `surface-tinted` | Alternate sparingly (max 2 tinted sections per page). |
| **Primary CTA** | `primary` bg, `#fff` text | One primary CTA visible per viewport. Never two competing. |
| **Secondary CTA** | Transparent bg, `primary` border + text | Always paired next to a primary. Never standalone. |
| **Body text** | `black` | Never use `muted` for body paragraphs. Only for captions. |
| **Links (inline)** | `secondary` | Underline on hover only. No underline at rest. |
| **Accent color** | `accent` | **Maximum 3 uses per page.** Overlines, badges, tiny indicators. Never for backgrounds or large elements. |
| **Icons** | `primary` at rest, `secondary` on hover | Line-weight: 1.5px. Never filled. |
| **Gradients** | `primary` → `secondary` | **Only in the CTA card (§9).** Nowhere else. This is law. |

### 1.3 Opacity Scale

| Use Case | Opacity |
|---|---|
| Watermark / decorative text | 5–8% |
| Ambient geometric shapes | 3–5% |
| Disabled states | 40% |
| Hover overlays | 4–6% |

---

## 2. Background System

### 2.1 Core Rule
The page is **light**. Always. The "futuristic" feeling comes from **motion and typography**, not from dark surfaces or heavy textures.

### 2.2 Layer Stack (bottom to top)

```
Layer 0  │  #fafafa solid base
Layer 1  │  Ambient geometry (concentric rings, dot grids) — primary @ 3% opacity
Layer 2  │  Content containers (cards at #ffffff)
Layer 3  │  Text and interactive elements
```

### 2.3 Section Background Rules

| Section Type | Background |
|---|---|
| **Standard** | `surface` (`#fafafa`) — no decoration |
| **Emphasis** | `surface-tinted` (`#f8f5ff`) — use for max 2 sections |
| **CTA block** | Gradient card (`primary → secondary`) — contained within a card, never full-bleed |
| **Footer** | `surface` with 1px top border (`border`) |

### 2.4 Ambient Elements (The Space Vibe)

These are **background-layer decorations** that create the subtle space feeling:

| Element | Spec | Where Used |
|---|---|---|
| **Concentric rings** | 3 rings, `primary` @ 3% opacity, expanding slowly (1 cycle / 8s) | Hero only |
| **Dot grid** | 2px dots, `border` color, 40px spacing | Behind capabilities grid, clipped to section |
| **Connector lines** | 1px dotted, `border` color, SVG | Between capability cards, "How It Works" steps |
| **Floating particles** | 3–4 circles, 2px, `#ffffff` @ 60% | Inside CTA gradient card only |

> [!IMPORTANT]
> **Ambient elements are not decorations for the sake of decoration.** Each must reinforce the "constellation / orbital" metaphor. If it doesn't read as "space-adjacent," remove it.

---

## 3. Typography Scale

### 3.1 Font Stack

| Role | Family | Weight | Fallback |
|---|---|---|---|
| **Headings** | Abril Fatface | 400 (regular — it's already display weight) | Georgia, serif |
| **Body** | Filson Soft (or Nunito) | 400 regular, 600 semi-bold, 700 bold | system-ui, sans-serif |

> [!NOTE]
> Abril Fatface (Google Fonts) is the free equivalent of Abril Display. Use this unless the commercial Abril Display license is secured.

### 3.2 Type Scale (Fluid)

All sizes use `clamp()` for fluid responsiveness. Base: `16px = 1rem`.

| Token | Mobile | Fluid | Desktop | Usage |
|---|---|---|---|---|
| `display` | 40px | `clamp(2.5rem, 6vw, 5rem)` | 80px | Hero headline only (§1) |
| `h1` | 32px | `clamp(2rem, 4.5vw, 3.75rem)` | 60px | Section headlines |
| `h2` | 26px | `clamp(1.625rem, 3vw, 2.5rem)` | 40px | Sub-headlines, product titles |
| `h3` | 20px | `clamp(1.25rem, 2vw, 1.75rem)` | 28px | Card titles |
| `body` | 16px | `clamp(1rem, 1.15vw, 1.125rem)` | 18px | Paragraph text |
| `body-sm` | 14px | `clamp(0.875rem, 1vw, 0.9375rem)` | 15px | Descriptions, card text |
| `caption` | 12px | `clamp(0.75rem, 0.85vw, 0.8125rem)` | 13px | Labels, metadata, legal |
| `overline` | 11px | `clamp(0.6875rem, 0.8vw, 0.75rem)` | 12px | Category labels, section tags |

### 3.3 Typography Rules

| Rule | Detail |
|---|---|
| **Line height — headings** | 1.1 (tight, editorial) |
| **Line height — body** | 1.6 (comfortable reading) |
| **Letter spacing — headings** | `-0.02em` (tighten for elegance) |
| **Letter spacing — overlines** | `0.1em` (wide, uppercase) |
| **Max line width** | `65ch` for body text. Never wider. |
| **Heading color** | `black` for most. `primary` only for metrics numbers. |
| **Never** | Never use heading font for body. Never use body font for headlines. |

---

## 4. Spacing System

### 4.1 Base Unit
**8px grid.** All spacing values are multiples of 8.

### 4.2 Spacing Scale

| Token | Value | Common Usage |
|---|---|---|
| `space-1` | 4px | Icon-to-label gap, tight internal padding |
| `space-2` | 8px | Inline element gaps |
| `space-3` | 12px | Small component internal padding |
| `space-4` | 16px | Card internal padding (small), list gaps |
| `space-5` | 24px | Default component gap, card padding |
| `space-6` | 32px | Section sub-group spacing |
| `space-7` | 48px | Between content groups within a section |
| `space-8` | 64px | Between sub-sections |
| `space-9` | 96px | Section vertical padding (mobile) |
| `space-10` | 128px | Section vertical padding (desktop) |
| `space-11` | 160px | Hero section padding, maximum breathing room |

### 4.3 Section Rhythm

| Rule | Value |
|---|---|
| **Section padding (vertical)** | `clamp(80px, 10vw, 160px)` top and bottom |
| **Content max-width** | `1120px` (text-heavy), `1280px` (grid layouts) |
| **Full-bleed max** | `1440px` with auto margins |
| **Between headline and body** | `space-5` (24px) |
| **Between body and CTA** | `space-6` (32px) |
| **Between cards in a grid** | `space-5` (24px) gap |

### 4.4 Whitespace Rules

- **More whitespace = more premium.** When in doubt, add space, don't remove it.
- The hero section should feel like **60% empty space**.
- No section should feel "packed." If content is dense, split into two sections.
- Between sections: no visible divider. Whitespace alone creates separation. Exception: footer gets a 1px top border.

---

## 5. Button System

### 5.1 Button Anatomy

```
┌─────────────────────────────────┐
│   [icon?]  Label Text  [icon?]  │   ← content
│                                 │
│   padding: 14px 32px            │   ← spacing
│   border-radius: 100px          │   ← full pill shape
│   font: Filson Soft 600         │   ← typography
│   font-size: body-sm (15px)     │
│   letter-spacing: 0.02em        │
└─────────────────────────────────┘
```

### 5.2 Button Variants

| Variant | Rest State | Hover State | Active State |
|---|---|---|---|
| **Primary** | `primary` bg, `#fff` text, no border | Darken bg 8% (`#4e1b8e`), lift `translateY(-1px)`, subtle shadow | Scale `0.98`, shadow removed |
| **Secondary** | Transparent bg, 1.5px `primary` border, `primary` text | `primary` bg @ 5% fill, border stays | Scale `0.98` |
| **Ghost** | No bg, no border, `secondary` text, arrow `→` | Arrow translates 6px right, text color → `primary` | Arrow returns with spring |
| **CTA Inverted** | `#fff` bg, `primary` text (used inside gradient CTA card) | `#fff` bg @ 90%, slight lift | Scale `0.98` |

### 5.3 Button Rules

| Rule | Detail |
|---|---|
| **Max per viewport** | 1 primary + 1 secondary. Never 2 primaries in view. |
| **Min touch target** | 48px height on mobile |
| **Label casing** | Sentence case. Never ALL CAPS for buttons. |
| **Icon usage** | Arrow icons only. No emoji. No decorative icons in buttons. |
| **Disabled state** | `muted` text, `border` bg, no hover, `cursor: not-allowed` |
| **Shadow (primary only)** | `0 4px 14px rgba(89, 32, 161, 0.2)` — on hover only |

---

## 6. Card System

### 6.1 Base Card

| Property | Value |
|---|---|
| Background | `surface-elevated` (`#ffffff`) |
| Border | 1px solid `border` (`#e5e7eb`) |
| Border radius | 16px |
| Padding | `space-6` (32px) |
| Shadow (rest) | None — card is flat at rest |
| Shadow (hover) | `0 8px 30px rgba(0, 0, 0, 0.04)` |

### 6.2 Card Variants

**Capability Card** (used in §3)

| Property | Value |
|---|---|
| Size | Equal-width within 2×2 grid |
| Icon | 32×32px, line-art, `primary` color, 1.5px stroke |
| Title | `h3` size, Abril Fatface, `black` |
| Description | `body-sm`, Filson Soft, `muted` |
| Hover bg | `#f3f0ff` (faint purple tint) |
| Hover border | `border-hover` (`primary` @ 15%) |
| Spacing | Icon → Title: `space-4` (16px), Title → Desc: `space-3` (12px) |

**Spotlight Card** (used in §4)

| Property | Value |
|---|---|
| Layout | Two-column: visual left, text right |
| Background | `surface-tinted` → `surface` gradient (very subtle) |
| Border | None |
| Overline | `overline` size, `accent` color, uppercase, tracked wide |
| Headline | `h2` size, Abril Fatface |
| Body | `body` size, `black`, max `55ch` width |
| Link | Ghost button style ("Learn more →") |

**CTA Card** (used in §9)

| Property | Value |
|---|---|
| Background | Linear gradient `primary` → `secondary`, 135° angle |
| Border radius | 24px |
| Max width | 800px, centered |
| Text color | `#ffffff` for all text inside |
| Noise overlay | Subtle grain texture at 2–3% opacity for tactile feel |
| Padding | `space-8` (64px) vertical, `space-7` (48px) horizontal |

### 6.3 Card Rules

- **No drop shadows at rest.** Shadows appear on hover only. Flat = premium.
- **Never nest cards.** A card does not contain another card.
- **Max content density:** icon + title + 2 lines of description. If more is needed, link out.
- **No colored backgrounds** for cards except the CTA card.

---

## 7. Motion Guidelines

### 7.1 Motion Philosophy

> *Motion is the voice of the brand. It should feel like gravity — natural, inevitable, effortless.*

Three principles:
1. **Purposeful** — Every animation communicates something (entry, feedback, hierarchy)
2. **Restrained** — If the user notices the animation before the content, it's too much
3. **Physical** — Movement follows natural physics: ease-out on entry, spring on interaction

### 7.2 Easing Curves

| Token | Curve | Usage |
|---|---|---|
| `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | **Default for all reveals.** Content entering viewport. |
| `ease-in-out` | `cubic-bezier(0.45, 0, 0.55, 1)` | Hover transitions, color changes |
| `spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Button presses, micro-interactions (slight overshoot) |

### 7.3 Duration Scale

| Token | Value | Usage |
|---|---|---|
| `instant` | 100ms | Color transitions, opacity micro-changes |
| `fast` | 200ms | Hover states, button feedback |
| `normal` | 400ms | Small element reveals (icons, labels) |
| `slow` | 700ms | Section content reveals (headlines, cards) |
| `cinematic` | 1000ms | Hero entrance, major visual moments |
| `ambient` | 8000ms+ | Background animations (rings, particles, icon rotation) |

### 7.4 Reveal Patterns

**Fade Up** (default for most content)
```
Initial:   opacity: 0,  translateY: 30px
Final:     opacity: 1,  translateY: 0
Duration:  slow (700ms)
Easing:    ease-out-expo
Trigger:   IntersectionObserver, threshold 0.15
```

**Stagger Cascade** (for groups: cards, metrics, nav items)
```
Same as Fade Up, but each child delays:
Delay:     index × 120ms
Max items: 6 (cap stagger to prevent excessive wait)
```

**Character Reveal** (hero headline only)
```
Each character wraps in a span
Initial:   opacity: 0,  translateY: 100%
Final:     opacity: 1,  translateY: 0
Delay:     index × 30ms
Easing:    ease-out-expo
Duration:  cinematic (1000ms)
```

**Line Draw** (SVG connectors, progress lines)
```
Initial:   stroke-dashoffset: full path length
Final:     stroke-dashoffset: 0
Duration:  1500ms
Easing:    ease-in-out
```

**Counter** (metrics section numbers)
```
Start:     0
End:       target value
Duration:  2000ms
Method:    requestAnimationFrame with eased interpolation
Stagger:   200ms between each counter
End pulse: scale 1.0 → 1.02 → 1.0 (spring, 300ms)
```

### 7.5 Hover Interactions

| Element | Hover Effect | Duration |
|---|---|---|
| **Primary button** | Darken + lift 1px + shadow appears | `fast` |
| **Secondary button** | Background fill 5% | `fast` |
| **Ghost link** | Arrow → translate 6px right | `fast`, spring easing |
| **Card** | Shadow appears + border color shift | `normal` |
| **Nav link** | Underline scales in (`scaleX 0→1`) from left | `fast` |
| **Social icon** | Color `muted` → `primary` + scale 1.1 | `fast` |
| **Logo (social proof)** | Grayscale → color (or → `primary`) | `normal` |

### 7.6 Scroll-Linked Animations

| Element | Behavior | Rate |
|---|---|---|
| **Hero headline** | Translates up on scroll | `0.6× scroll speed` |
| **Product mockup (§4)** | Translates up, slight rotation | `0.85× scroll speed` |
| **Orbit Statement accent line** | Tracks active line vertically | Linked to scroll position |
| **Back-to-top button** | Appears after scrolling past §3 | Fade in, `normal` duration |

### 7.7 Ambient / Continuous Animations

| Element | Animation | Speed | Rule |
|---|---|---|---|
| **Hero rings** | Scale outward + fade | 8s per cycle | Pause when section leaves viewport |
| **Capability icons** | Rotate 360° | 60s per rotation | So slow it's subliminal |
| **CTA particles** | Drift randomly | 15–20s loops | Random start positions, no synchronization |

### 7.8 Motion Rules — Non-Negotiable

| # | Rule |
|---|---|
| 1 | **Only animate `transform` and `opacity`.** Never animate `width`, `height`, `margin`, `padding`, `top/left`. |
| 2 | **Respect `prefers-reduced-motion`.** Disable all scroll-linked and ambient animations. Keep instant state changes. |
| 3 | **No bounce.** Spring easing is allowed only for micro-interactions (buttons). Content reveals never bounce. |
| 4 | **No animation on scroll-up.** Elements that have already revealed stay visible. No re-triggering. |
| 5 | **Content before chrome.** Text reveals before decorative elements. Always. |
| 6 | **Maximum stagger: 6 items.** If a group has more than 6 items, reveal in batches, not individually. |
| 7 | **No animation longer than 1200ms** except ambient/continuous loops. |
| 8 | **60fps or nothing.** If an animation drops frames, simplify or remove it. |

---

## 8. Responsive Breakpoints

| Token | Value | Target |
|---|---|---|
| `mobile` | `< 640px` | Phones |
| `tablet` | `640px – 1024px` | Tablets, small laptops |
| `desktop` | `1024px – 1440px` | Standard screens |
| `wide` | `> 1440px` | Large monitors — content caps at max-width |

**Approach:** Mobile-first. Base styles are mobile. Layer up with `min-width` queries.

---

## 9. Iconography

| Property | Value |
|---|---|
| Style | Line-art, single stroke, open paths |
| Stroke weight | 1.5px |
| Size | 24×24px default, 32×32px in cards |
| Color | `primary` at rest |
| Format | Inline SVG (no icon fonts) |
| Source | Lucide, Phosphor, or custom — must match line-art aesthetic |

---

## Quick-Reference Cheat Sheet

```
COLORS:     primary=#5920a1  secondary=#3b40c4  accent=#ef5a98 (max 3 uses!)
FONTS:      Headings=Abril Fatface  Body=Filson Soft (or Nunito)
SPACING:    8px grid, sections clamp(80px, 10vw, 160px)
RADIUS:     Buttons=100px(pill)  Cards=16px  CTA card=24px
SHADOWS:    Hover only. 0 8px 30px rgba(0,0,0,0.04)
MOTION:     ease-out-expo for reveals, 700ms default, transform+opacity only
GRADIENTS:  CTA card ONLY. primary→secondary at 135°.
MAX WIDTH:  Content=1120px  Full-bleed=1440px  Text=65ch
```
