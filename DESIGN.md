---
name: "Engineering Compass"
description: "A calm, instrument-like navigation system for observable engineering growth."
colors:
  canvas: "#08090a"
  surface-base: "#0b100f"
  surface-panel: "#0d1413"
  surface-raised: "#12201e"
  surface-active: "#102b28"
  ink-primary: "#ececee"
  ink-secondary: "#b8c3c1"
  ink-muted: "#a8abb0"
  ink-faint: "#8f939a"
  line-subtle: "#1c2a28"
  line-strong: "#29413e"
  compass-aqua: "#70e8d8"
  compass-aqua-strong: "#9af0e4"
  compass-aqua-ink: "#062421"
  signal-warning: "#e8c270"
  signal-danger: "#ff8f86"
typography:
  display:
    fontFamily: "IBM Plex Sans, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.15rem, 4vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "IBM Plex Sans, ui-sans-serif, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "IBM Plex Sans, ui-sans-serif, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.68rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.06em"
  metric:
    fontFamily: "Geist Mono, monospace"
    fontSize: "2.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.04em"
rounded:
  sm: "0.375rem"
  md: "0.75rem"
  lg: "1rem"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
components:
  action-primary:
    backgroundColor: "{colors.compass-aqua}"
    textColor: "{colors.compass-aqua-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0.65rem 1rem"
    height: "2.75rem"
  action-primary-hover:
    backgroundColor: "{colors.compass-aqua-strong}"
    textColor: "{colors.compass-aqua-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
  action-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0.65rem 1rem"
    height: "2.75rem"
  nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0 0.8rem"
    height: "2.75rem"
  nav-item-active:
    backgroundColor: "{colors.surface-active}"
    textColor: "{colors.compass-aqua-strong}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
  field:
    backgroundColor: "{colors.surface-base}"
    textColor: "{colors.ink-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0.78rem 0.85rem"
  status-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink-faint}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0.35rem 0.55rem"
  instrument-panel:
    backgroundColor: "{colors.surface-panel}"
    textColor: "{colors.ink-primary}"
    padding: "1.5rem"
---

# Design System: Engineering Compass

## Overview

**Creative North Star: "The Personal Navigation Desk"**

Engineering Compass is a personal instrument console for finding direction, reading momentum, and attaching proof to progress. It carries the portfolio's near-black, mineral-teal, luminous-aqua family into an independent application world: calmer than a control room, denser than a marketing page, and exact enough to feel trustworthy on repeat visits.

The system behaves like a route log rather than a collection of interchangeable dashboard cards. Bearing lines, indexed coordinates, compact telemetry, clipped panels, and a single purposeful sweep organize the hierarchy; generous dark fields and restrained accent use keep that operational density humane. Demonstration data is always labeled, and evidence remains the decisive action.

**Key Characteristics:**

- Near-black and mineral-teal tonal fields with cool neutral ink.
- Restrained aqua reserved for bearing, action, active state, and confirmed progress.
- IBM Plex Sans headings, Geist reading text, and Geist Mono telemetry.
- Clipped-corner panels, hairline structure, route notation, and tabular readings.
- Dense but calm hierarchy with explicit desktop-rail and mobile-header modes.
- Visible keyboard focus, persistent explanatory states on mobile, and reduced-motion parity.

## Colors

The palette is nocturnal and mineral: tonal surfaces do most of the structural work while luminous aqua acts as a precise navigational signal.

### Primary

- **Compass Aqua:** The scarce action and orientation color for primary controls, current bearings, completed progress, active navigation, focus outlines, and high-value links.
- **Strong Compass Aqua:** A brighter state color for hover emphasis and critical current readings; it is not a second accent.
- **Deep Aqua Ink:** The dark foreground paired with filled aqua controls to preserve contrast.

### Secondary

- **Signal Amber:** A semantic notice color for preview labels and non-destructive cautions.
- **Signal Coral:** Reserved for danger and error states; the current surface defines the token without spending it decoratively.

### Neutral

- **Night Canvas:** The application ground and browser chrome anchor.
- **Base Surface:** The desktop rail, list panels, quiet sections, field interiors, and tooltip ground.
- **Mineral Panel:** The principal route field and composer surface.
- **Raised Mineral:** The weekly pulse surface, used when tonal contrast must imply elevation without a shadow.
- **Active Mineral:** Selected navigation and hovered mobile rows.
- **Cool White Ink:** Primary copy and high-contrast labels.
- **Secondary, Muted, and Faint Ink:** A deliberate three-step ladder for explanation, navigation, metadata, and low-priority telemetry.
- **Subtle and Strong Lines:** Hairline separators at rest and firmer boundaries for interactive or instrument-like structures.

### Named Rules

**The One Bearing Rule.** Aqua marks direction, action, focus, or confirmed progress; it never becomes a broad decorative wash.

**The Tonal Structure Rule.** Build hierarchy with adjacent dark surfaces and hairlines before reaching for shadows.

## Typography

**Display Font:** IBM Plex Sans (with a UI sans-serif fallback)

**Body Font:** Geist (with UI sans-serif and system fallbacks)

**Label/Mono Font:** Geist Mono (with a monospace fallback)

**Character:** IBM Plex Sans gives headings an engineered, humanist authority; Geist keeps dense explanatory copy quiet and contemporary. Geist Mono turns dates, coordinates, indices, percentages, and route labels into readable instrumentation rather than decoration.

### Hierarchy

- **Display:** Medium-weight, compact, near-solid leading; used only for the page's primary direction statement and capped at a short measure.
- **Headline:** Semibold hierarchy for composer and major overlay titles.
- **Title:** Semibold compact headings for route, section, and weekly-pulse labels.
- **Body:** Regular Geist with open leading for explanations and guidance; descriptive lines stay near a 54-character measure where the layout permits.
- **Label:** Small, tracked Geist Mono for coordinates, evidence types, timestamps, and status labels; uppercase is limited to terse operational metadata.
- **Metric:** Large Geist Mono for the primary progress reading, with tightly set numerals and an attached smaller unit.

### Named Rules

**The Instrument, Not Ornament Rule.** Monospace belongs to data that can be read as a coordinate, count, date, index, or system status; prose stays in Geist.

## Layout

The desktop shell is anchored by a fixed 16rem navigation rail and a centered content field capped at 90rem. The main canvas uses a broad fluid gutter, a route field across the top, then an asymmetric content grid that pairs the domain map with an 18rem weekly pulse. Repeated 1rem gaps join major modules while 1.25rem and 1.5rem insets provide the default compact-to-comfortable interior rhythm.

At 1080px the supporting weekly panel moves below the domain map and becomes horizontal. At 780px the fixed rail becomes a sticky, translucent mobile header; grids simplify, the evidence requirement becomes persistently visible, and navigation moves into a compact menu. At 520px route details, supporting panels, and footer content collapse to a single column. The product remains usable from a 320px viewport without horizontal page scrolling.

**The Route-First Rule.** Current bearing and next checkpoint hold the top of the working field; domains and historical evidence follow in that order.

## Elevation & Depth

The system is flat by default and uses tonal layering as its primary depth language. Shadows are structural exceptions: a deep ambient shadow separates the temporary mobile menu and the right-side evidence composer from the working canvas, while a small aqua glow marks the live bearing point. The composer backdrop dims the underlying field so focus moves without introducing a new visual world.

### Shadow Vocabulary

- **Raised Overlay:** A broad, low-opacity black shadow for floating navigation and overlays.
- **Composer Edge:** A left-cast black shadow that makes the side sheet feel attached to, but above, the dashboard.
- **Bearing Signal:** A compact aqua halo used only on the current route point.
- **Field Focus:** A subtle aqua ring paired with an accent border on active inputs.

### Named Rules

**The Shadow as State Rule.** Resting dashboard surfaces stay shadowless; shadow appears only for overlays, active focus, or the live route signal.

## Shapes

Instrument fields and major containers use opposing clipped corners rather than ordinary rounded cards. The route field carries a larger 16px cut while supporting panels use a tighter 12px cut, creating family resemblance without flattening hierarchy. Controls use the small rounded token, progress bars and tracks stay almost square, chips use a pill silhouette, and avatars or success marks alone use full circles. Hairline borders remain visible throughout the dark palette.

**The Cut Field Rule.** Use clipped corners for spatial containers and modest rounding for controls; never round every surface into the same card silhouette.

## Components

### Buttons

- **Shape:** Compact rectangular controls with modest corners and a minimum 2.75rem target height.
- **Primary:** Aqua fill, deep aqua ink, bold body text, and concise icon-plus-label construction.
- **Hover / Focus:** The fill brightens and lifts by one pixel on hover; the global visible focus outline remains outside the component edge.
- **Secondary:** Transparent fill, cool white text, and a strong hairline boundary; it does not compete with the evidence action.
- **Icon:** Square, outlined, transparent controls for close and row-open actions.

### Chips

- **Style:** Small pill or compact rectangular labels with transparent fill, mono text, and a strong border.
- **State:** Chips communicate preview or demonstration status, not interactive filters; warning copy uses amber while neutral metadata uses faint ink.

### Cards / Containers

- **Corner Style:** Opposing clipped corners for route, section, weekly, and quiet fields.
- **Background:** Base, panel, and raised mineral tones establish depth.
- **Shadow Strategy:** No shadow at rest; see the structural overlay exceptions in Elevation & Depth.
- **Border:** One-pixel hairlines separate fields and internal rows.
- **Internal Padding:** Compact 1rem to 1.5rem insets, scaled by hierarchy rather than by card type.

### Inputs / Fields

- **Style:** Base-surface fill, strong hairline, cool white ink, modest corners, and compact vertical padding.
- **Focus:** Aqua border plus a restrained translucent aqua ring; the application-wide focus outline remains available for keyboard navigation.
- **Error / Disabled:** Signal Coral is reserved for errors. Disabled behavior must remain legible and must not be communicated by opacity alone.

### Navigation

The desktop rail uses quiet Geist labels and line icons, with tonal hover and a mineral-aqua active row. It ends in a compact identity block, settings route, and ecosystem link. On narrow screens the rail becomes a sticky blurred header with a bordered dropdown; active and hover states retain the same semantic colors and minimum touch sizing.

### Bearing Route

The signature route component combines a fine horizontal axis, origin/current/checkpoint labels, a restrained aqua progress sweep, and a glowing current point. The progress reading, next checkpoint, and evidence action share one continuous field so direction and proof stay causally connected. Under reduced motion the route lands immediately without losing information.

### Evidence Composer

The evidence workflow opens as a right-side sheet with trapped focus, Escape and backdrop dismissal, restored trigger focus, explicit labels, visible field focus, and an honest session-only success state. On mobile it fills the available width while preserving the same hierarchy and control targets.

## Do's and Don'ts

### Do:

- **Do** use aqua only for navigation, action, focus, and confirmed progress.
- **Do** build dense views from ordered fields, fine rules, indices, and explicit labels.
- **Do** pair every progress claim with context or evidence, and mark representative data as demonstrative.
- **Do** preserve keyboard focus, 44px-class control targets, reduced-motion behavior, and persistent mobile explanations.
- **Do** keep brand bridge tokens locally owned so the application remains independent from the portfolio runtime.

### Don't:

- **Don't** replace the route hierarchy with a generic grid of interchangeable KPI cards or decorative progress rings.
- **Don't** flood large surfaces with aqua, add gradients for atmosphere, or introduce competing accent hues.
- **Don't** round every container, soften clipped fields into generic cards, or add shadows to resting content.
- **Don't** use monospace for paragraphs or expressive headlines; reserve it for operational readings.
- **Don't** hide evidence requirements behind hover on touch layouts or encode state through color alone.
