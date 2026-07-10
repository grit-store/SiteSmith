---
name: Titan Infrastructure
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#bacac5'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#859490'
  outline-variant: '#3c4a46'
  surface-tint: '#3cddc7'
  primary: '#57f1db'
  on-primary: '#003731'
  primary-container: '#2dd4bf'
  on-primary-container: '#00574d'
  inverse-primary: '#006b5f'
  secondary: '#bec6e0'
  on-secondary: '#283044'
  secondary-container: '#3f465c'
  on-secondary-container: '#adb4ce'
  tertiary: '#ffd1aa'
  on-tertiary: '#4b2800'
  tertiary-container: '#ffac5a'
  on-tertiary-container: '#744000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#62fae3'
  primary-fixed-dim: '#3cddc7'
  on-primary-fixed: '#00201c'
  on-primary-fixed-variant: '#005047'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffdcc0'
  tertiary-fixed-dim: '#ffb875'
  on-tertiary-fixed: '#2d1600'
  on-tertiary-fixed-variant: '#6b3b00'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
  surface-deep: '#0F172A'
  surface-glass: rgba(30, 41, 59, 0.7)
  border-subtle: '#1E293B'
  glow-teal: rgba(45, 212, 191, 0.15)
  text-muted: '#64748B'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

This design system is engineered to evoke a sense of absolute stability and technical mastery. The brand personality is authoritative, precise, and forward-thinking, catering to enterprise-level clients and high-growth startups who view software as their primary competitive advantage.

The design style is **Corporate Modern with Glassmorphism**. It utilizes a sophisticated dark-mode aesthetic that prioritizes legibility and structural clarity. High-tech "energy" is introduced through vibrant teal accents and subtle glows, suggesting a live, high-performance environment. The UI feels less like a website and more like a mission-control dashboard—dense with information but perfectly organized.

Key attributes include:
- **Scalability:** Large, clear containers that accommodate varying content densities.
- **Precision:** Perfect alignment and consistent spacing ratios.
- **Sophistication:** Subtle transparency and backdrop blurs that create depth without visual clutter.

## Colors

The palette is centered on a "Deep Sea" dark mode foundation. The primary background (`#0F172A`) provides a high-contrast base for the vibrant neon teal accent (`#2DD4BF`), which is reserved for critical actions and brand markers.

- **Primary:** Neon Teal is used sparingly for call-to-actions, progress indicators, and active states.
- **Secondary/Background:** Deep Slate forms the core of the interface, ensuring reduced eye strain and a premium feel.
- **Neutral:** A range of sophisticated grays (`#94A3B8` for secondary text and `#64748B` for tertiary) maintain hierarchy without distracting from primary content.
- **Glass Surfaces:** Semi-transparent layers use a slightly lighter slate with a high blur radius to create a sense of verticality and "stacked" infrastructure.

## Typography

The typography system relies on **Inter** for its neutral, highly legible, and authoritative character. It is paired with **JetBrains Mono** for labels and technical data to reinforce the "Infrastructure" narrative.

- **Headings:** Use bold weights and tight letter-spacing to create a "locked-in" and powerful look.
- **Body:** Maintains generous line heights to ensure readability against dark backgrounds.
- **Labels:** Technical metadata, pricing tags, and system statuses are rendered in JetBrains Mono to provide a rhythmic, monospaced contrast to the humanist body text.
- **Mobile Scaling:** Headline sizes aggressively downscale on mobile to ensure impact without breaking layout flow.

## Layout & Spacing

The design system utilizes a **12-column fluid grid** for desktop and a **single-column stack** for mobile. The spacing rhythm is based on a strict **8px base unit**, ensuring mathematical harmony across all components.

- **Grid:** On desktop, use a 12-column grid with 24px gutters. Content should be capped at a 1280px max-width to maintain focus.
- **Margins:** Desktop views utilize generous 48px outer margins to create a premium, "airy" feel within a dark canvas.
- **Reflow:** Components like "Service Cards" transition from a 3-column layout on desktop to a 2-column grid on tablet, and a 1-column vertical stack on mobile.
- **Density:** Technical sections (pricing, features) should maintain high density with tight padding, while marketing sections (hero, process) should utilize double the standard spacing units.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layering** and **Glassmorphism** rather than traditional heavy shadows.

- **Base Layer:** The deepest slate (`#0F172A`) serves as the "floor."
- **Component Layer:** Cards and interactive elements use a semi-transparent slate with a 20px-40px Backdrop Blur. This creates a "frosted glass" effect that allows background accents to peek through.
- **Hover States:** Elements shouldn't just lift; they should "energize." A subtle Teal glow (`rgba(45, 212, 191, 0.15)`) appears behind cards or buttons upon interaction.
- **Borders:** Surfaces are defined by thin, low-contrast outlines (`#1E293B`) to maintain a clean, architectural structure without the weight of solid shadows.

## Shapes

The shape language is "Softly Geometric." While the infrastructure is rigid and stable, the corners are rounded to feel modern and accessible.

- **Standard Elements:** Buttons, inputs, and small cards use a 0.5rem (8px) radius.
- **Large Containers:** Pricing tiers and hero sections use a 1rem (16px) radius for a more distinctive, modern silhouette.
- **Interaction:** Hovering over elements can trigger a slight expansion in roundedness or a sharp border-color transition to the primary teal.

## Components

### Buttons
- **Primary:** Solid Teal background with Slate text. No shadow; instead, use a subtle 4px teal outer glow on hover.
- **Secondary:** Transparent background with a 1px Slate border. Text is white. On hover, the border turns Teal and a faint glass background appears.

### Cards (Glassmorphism)
Cards are the core of this design system. They feature a 70% opaque background, a 20px blur, and a very thin 1px top-and-left border highlight to simulate a light source.

### Input Fields
Darker than the base background with a subtle inset shadow. On focus, the border glows Teal, and the label (in JetBrains Mono) shifts to a Primary Teal color.

### Chips & Badges
Small, monospaced text indicators with high-contrast backgrounds (e.g., "MOST POPULAR" in white on a teal badge). Use 0.25rem corner radius for a "technical tag" look.

### Process List
A vertical line connecting steps, using the Teal accent for completed stages. Steps are housed in glass-morphic containers with large, bold numerals in the background.

### Custom Component: Data Pulse
To reinforce the "Infrastructure" theme, include small animated "pulse" dots next to system status labels or live metrics, using a soft teal breathing animation.