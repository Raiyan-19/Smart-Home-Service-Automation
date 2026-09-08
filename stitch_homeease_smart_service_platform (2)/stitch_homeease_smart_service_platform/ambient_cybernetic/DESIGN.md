---
name: Ambient Cybernetic
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353943'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#181b25'
  surface-container: '#1c1f29'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2ef'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#dfe2ef'
  inverse-on-surface: '#2c303a'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#f4f5ff'
  on-tertiary: '#002e6a'
  tertiary-container: '#cad9ff'
  on-tertiary-container: '#005ac3'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#0f131c'
  on-background: '#dfe2ef'
  surface-variant: '#31353f'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-xl:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Manrope
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-xs:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4rem
  gutter-mobile: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  margin-mobile: 1.25rem
  margin-tablet: 2.5rem
  margin-desktop: 3.5rem
---

## Brand & Style

This design system establishes an intelligent, forward-looking visual identity for next-generation smart living. The aesthetic merges technical precision with atmospheric luxury: dark, crystalline environments where autonomous intelligence feels tactile, effortless, and protective. 

The visual style blends refined **Glassmorphism** with **Futuristic High-Tech Minimalism**. Interfaces layer translucent, smoked glass surfaces atop deep indigo-slate gradients. Dynamic luminescence replaces mechanical dividers—illuminated neon vectors, micro-glows, and precise edge lighting signal active machine perception, system status, and connected IoT telemetry. The atmosphere balances the quiet serenity of high-end architectural living with the sharp, predictive power of state-of-the-art spatial AI.

## Colors

The palette is engineered specifically for deep OLED-black and twilight visual fidelity, prioritizing energy conservation, nighttime optical comfort, and ultra-high dynamic range contrast.

- **Foundational Surfaces**:
  - `Canvas / Root`: `#090d16` (Deep void slate)
  - `Surface Low`: `#0f172a` (Midnight slate container)
  - `Surface Mid`: `#1e1b4b` (Deep indigo backdrop layer)
  - `Glass Tint`: `rgba(15, 23, 42, 0.65)` with `16px` backdrop blur
- **Accent Signals**:
  - `Primary (Electric Cyan)`: `#00f0ff` — Used for active state energy, AI operations, sensor triggers, and primary confirmation paths.
  - `Secondary (Vivid Violet)`: `#8b5cf6` — Used for scheduled automations, scene creation, and predictive intelligence insights.
  - `Tertiary (Electric Blue)`: `#3b82f6` — Connective state, ambient telemetry, audio/media integrations, and informative highlights.
- **Support & State**:
  - `Success`: `#10b981` (Emerald surge)
  - `Warning`: `#f59e0b` (Amber alert)
  - `Critical`: `#f43f5e` (Crimson security pulse)
- **Content Hierarchy**:
  - `Text Primary`: `#f8fafc` (High-contrast pure frosted white)
  - `Text Secondary`: `#94a3b8` (Muted technical slate)
  - `Text Tertiary / Micro`: `#64748b` (Deep blueprint slate)
  - `Borders / Rim Glows`: `rgba(255, 255, 255, 0.08)` baseline, scaling to `rgba(0, 240, 255, 0.4)` upon selection or interaction.

## Typography

Typography establishes an intentional dialectic between technical instrumentation and human legibility:

- **Display & Headlines (`Space Grotesk`)**: Provides an authoritative, architectural geometry. Its structural, futuristic cuts lend prominence to ambient status readings, mode selectors, and environment designations.
- **Body & Continuous Text (`Manrope`)**: Delivers pristine geometric balance and neutral legibility across varying dark surface layers, maintaining comfort during prolonged control monitoring.
- **Metrics, Telemetry & Labels (`JetBrains Mono`)**: Handles all numerical readouts, hardware specs, timestamps, and active node status indicators. All uppercase label treatments use `letterSpacing: 0.08em` to `0.1em` to emulate high-precision hardware avionics.

## Layout & Spacing

The layout is built on a responsive 12-column grid (4-column on mobile, 8-column on tablet) underpinned by an uncompromising 8px base rhythm (with a 4px sub-grid for micro-hardware counters and status dots).

- **Desktop (1280px+)**: 12 columns, max-width `1440px`, 32px gutters, 56px page margins. Dashboards utilize persistent spatial telemetry panels on the right rail and global zone navigation on the left.
- **Tablet (768px - 1279px)**: 8 columns, 24px gutters, 40px margins. Device cards collapse from 4-wide to 2-wide; control surfaces shift from horizontal sliders to modular stacked touch-targets.
- **Mobile (< 768px)**: 4 columns, 16px gutters, 20px margins. Interface shifts to tactile, thumb-driven glass floating bottom action sheets, full-width device controls, and horizontal room-swipe carousels.

## Elevation & Depth

Spatial depth does not rely on traditional opaque drop shadows. Depth is achieved via **luminous stratification**: frosted translucent planes, internal border illumination, and colored radial back-glows.

- **Level 0 (Base Canvas)**: Pure deep tone `#090d16`. Micro radial gradients (`radial-gradient(circle at top left, #1e1b4b 0%, transparent 60%)`) give subtle, infinite spatial perspective.
- **Level 1 (Structural Pods & Device Tiles)**: Background `rgba(15, 23, 42, 0.65)`, backdrop filter blur `16px`, `1px` border `rgba(255, 255, 255, 0.07)`. No drop shadow.
- **Level 2 (Active/Hovered Modules)**: Background `rgba(30, 27, 75, 0.45)`, backdrop blur `20px`, `1px` border `rgba(0, 240, 255, 0.35)`, subtle outer atmospheric glow: `box-shadow: 0 0 24px -4px rgba(0, 240, 255, 0.15)`.
- **Level 3 (Modals, Overlays, Control Drawers)**: Background `rgba(15, 23, 42, 0.85)`, backdrop blur `32px`, `1px` gradient border running from `rgba(0, 240, 255, 0.5)` to `rgba(139, 92, 246, 0.2)`, ambient depth shadow: `box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.7)`.
- **Level 4 (Direct Sensor Beam / Active State)**: Direct emitter glow using colored primary accents: `box-shadow: 0 0 32px rgba(0, 240, 255, 0.35), inset 0 0 12px rgba(0, 240, 255, 0.15)`.

## Shapes

The shape system employs calibrated softness (`roundedness: 2`), reflecting precision-milled hardware chamfers rather than toy-like bubbles:

- **Standard Elements (Buttons, Inputs, Metric Badges)**: `8px` (`0.5rem`) radius.
- **Containers & Device Tiles (`rounded-lg`)**: `16px` (`1rem`) radius.
- **Overlays, Hub Cards & Spatial Sheets (`rounded-xl`)**: `24px` (`1.5rem`) radius.
- **Pill Targets**: Dedicated purely to operational status badges, room mode pills, and toggle indicators (`9999px`).

## Components

### Buttons
- **Primary (AI / Action Surge)**: Background linear gradient (`135deg, #00f0ff 0%, #3b82f6 100%`), solid dark-slate text (`#090d16`, font-weight 600). Hover produces an external `16px` cyan bloom (`0 0 20px rgba(0, 240, 255, 0.4)`). Active state scales to `0.98`.
- **Secondary (Ambient Glass)**: Background `rgba(255, 255, 255, 0.04)`, border `1px solid rgba(255, 255, 255, 0.12)`, text `#f8fafc`. Hover triggers border shift to `rgba(139, 92, 246, 0.5)` with background `rgba(139, 92, 246, 0.08)`.
- **Ghost / Icon Action**: Pure transparent base, text `#94a3b8`. Hover transitions to `#00f0ff` with subtle background glow `rgba(0, 240, 255, 0.08)`.

### Chips & Filters
- Compact height (`32px`), pill-radius (`9999px`), `JetBrains Mono` label text.
- **Inactive**: Smoked glass fill (`rgba(15, 23, 42, 0.5)`), thin border `rgba(255, 255, 255, 0.08)`, text `#94a3b8`.
- **Active**: Vivid border `rgba(0, 240, 255, 0.6)`, background `rgba(0, 240, 255, 0.12)`, text `#00f0ff`, accompanied by an internal pulsing green or cyan micro-dot (`6px`).

### Device & Sensor Cards
- Structural rounded container (`16px`), glass backdrop.
- Upper region contains categorical hardware iconography and monospaced telemetry (`JetBrains Mono`).
- Center displays key metrics in high-contrast `Space Grotesk` (`28px`).
- Bottom zone houses direct manipulation touchpoints (e.g., discrete binary toggles or integrated range slider tracks).
- Interactive card states elevate border brilliance from faint outline to active primary glow.

### Form Inputs & Adjusters
- **Text Inputs / Search**: Background `rgba(9, 13, 22, 0.6)`, inner border `1px solid rgba(255, 255, 255, 0.1)`. Focus transforms border to `#00f0ff` accompanied by a soft field illumination (`0 0 12px rgba(0, 240, 255, 0.2)`).
- **Checkboxes & Radios**: Chamfered square (`6px` radius) or circle; inactive is hollow with `1px` slate rim. Selected state features solid Electric Cyan fill with dark contrasting checkmark, casting a local neon aura.

### Sliders & Rotary Dials (Specialized IoT Controls)
- **Track**: `6px` track height, background `rgba(255, 255, 255, 0.08)`.
- **Active Fill**: Electric Cyan to Vivid Violet gradient band.
- **Thumb**: `20px` circular glowing node (`#f8fafc` center with `0 0 10px #00f0ff` halo), updating numerical readouts in real-time.

### AI Automation Timeline & Lists
- Connected by a continuous vertical neon trace (`1px solid rgba(0, 240, 255, 0.2)`). Nodes illuminate dynamically based on automation triggers, scheduled routines, or sensor alerts.