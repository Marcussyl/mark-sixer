---
name: Precision Mark Six
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#5c403c'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#916f6b'
  outline-variant: '#e6bdb8'
  surface-tint: '#bf0715'
  primary: '#b70011'
  on-primary: '#ffffff'
  primary-container: '#dc2626'
  on-primary-container: '#fff6f5'
  inverse-primary: '#ffb4ab'
  secondary: '#904d00'
  on-secondary: '#ffffff'
  secondary-container: '#fe932c'
  on-secondary-container: '#663500'
  tertiary: '#b50034'
  on-tertiary: '#ffffff'
  tertiary-container: '#de1a46'
  on-tertiary-container: '#fff6f5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000b'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#ffdada'
  tertiary-fixed-dim: '#ffb3b6'
  on-tertiary-fixed: '#40000c'
  on-tertiary-fixed-variant: '#920028'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.025em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-base:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  body-medium:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: '0'
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.06em
  chinese-badge:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  number-ball:
    fontFamily: JetBrains Mono
    fontSize: 15px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: -0.02em
  number-ball-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit-2xs: 0.25rem
  unit-xs: 0.5rem
  unit-sm: 0.75rem
  unit-md: 1rem
  unit-lg: 1.5rem
  unit-xl: 2rem
  unit-2xl: 3rem
  container-max: 52.5rem
  gutter-mobile: 1rem
  gutter-desktop: 1.5rem
---

## Brand & Style

This design system delivers a calm, authoritative lottery verification and analytical utility for the Hong Kong Mark Six lottery. It firmly rejects the garish conventions of casino apps, aggressive neon gradients, flashing win sequences, and cartoon gamification. Instead, it embodies the quiet rigor, structural clarity, and computational dignity of an institutional fintech auditing workstation, tempered by the cultural warmth and celebratory anticipation native to Hong Kong's lottery heritage.

The target audience spans everyday ticket holders, systematic syndicate organizers, and data-minded players who demand instant, unambiguous verification of tickets (via manual tabular entry or receipt OCR). The interface evokes precision, trustworthiness, and effortless clarity.

### Visual Style
- **Fintech Minimalism & Structural Tactility:** Pure porcelain surfaces, hairline slate boundaries, micro-segmented pill controls, and airy vertical whitespace.
- **Cultural Restraint:** Lucky Hong Kong vermilion crimson and imperial amber provide purposeful highlights without overwhelming cognitive load. Bilingual typography pairs modern neutral sans-serif forms with understated Traditional Chinese annotations (六合彩, 頭獎, 二獎, 三獎, 特別號碼).

## Colors

The palette balances pristine porcelain foundations with high-contrast text and authoritative cultural accents.

### Palette Architecture
- **Primary (`#dc2626` — Hong Kong Vermilion Crimson):** The signature interactive driver for primary action buttons, verification triggers, active selection states, and ticket scan highlights.
- **Secondary (`#d97706` — Imperial Gold / Amber):** Reserved strictly for successful prize matches, prize tiers (頭獎, 二獎, 三獎), dividend totals, and payout milestones.
- **Tertiary (`#e11d48` — Coral Magenta):** Exclusive identifier for the 7th ball in the draw: the Special Number (特別號碼), completely disambiguating it from the six standard draw balls.
- **Neutral (`#0f172a` — Deep Ink Slate):** Grounding neutral for primary numerals, core headlines, and maximum-legibility drawn ball figures.

### Surfaces & Structural Backgrounds
- **Background Canvas (`#f8fafc`):** Soft slate warmth ensuring optical comfort across prolonged scanning sessions.
- **Surface Elevation (`#ffffff`):** Pure porcelain white applied to active cards, validation modules, and input cells.
- **Surface Container Muted (`#f1f5f9`):** Neutral recessed planes for segmented control beds, dropzone inactive fields, and table header rows.
- **Crisp Structural Borders (`#e2e8f0` / `#cbd5e1`):** Hairline precision strokes establishing structural discipline.

### Authentic Lottery Ball Chromatics
- **Ball Red:** `#dc2626`
- **Ball Blue:** `#2563eb`
- **Ball Green:** `#16a34a`
- **Ball Neutral / Inactive:** `#ffffff` surface with `#cbd5e1` outline and `#0f172a` text. Unmatched balls reduce to 40% visual opacity during match evaluation.

## Typography

The typography system is engineered for vertical alignment and zero-jitter scanning across numeric matrices.

### Font System & Role Assignments
- **Primary Sans-Serif (`Inter`):** Handles all application interfaces, navigation labels, display headers, and meta descriptions. Fallbacks prioritize platform native clarity: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.
- **Traditional Chinese Fallback Chain:** Whenever Traditional Chinese lottery nomenclature is displayed (特別號碼, 頭獎, 二獎, 三獎, 開獎期數, 核對結果), the font stack falls through to `"Noto Sans TC", "PingFang HK", "Microsoft JhengHei", sans-serif`. Chinese labels sit adjacent to English text with a subtle letter-spacing adjustment (`0.02em` to `0.04em`) and slightly softer weight to maintain visual equilibrium.
- **Tabular Monospace (`JetBrains Mono`):** Applied to all ball badges, number inputs, draw indexes, and currency values. Tabular numbers (`tnum`) ensure single-digit ("7") and double-digit ("49") integers occupy identical optical centers within spherical containers.

## Layout & Spacing

The layout philosophy follows a focused, fixed-width utility model centered around an optimal eye-tracking column (`max-width: 840px` / `52.5rem`). This prevents tabular ticket lines from stretching across wide viewports, keeping ticket comparison natural and fatigue-free.

### Grid & Spacing Rhythm
- **Base Grid Unit:** Strict 4px/8px modular rhythm governs all padding, gaps, and input containers.
- **Vertical Hierarchy:**
  - Header module to Viewport Controller: `24px` (`1.5rem`).
  - Controller to Primary Workspace Card: `16px` (`1rem`).
  - Section blocks inside cards: `24px` (`1.5rem`).
  - Draw rows in manual input or verification lists: `12px` vertical padding with `8px` ball-to-ball gaps.

### Responsive Reflow & Breakpoints
- **Mobile (<480px):**
  - Page margin compresses to `16px`.
  - Ticket input cards reduce internal padding from `24px` to `16px`.
  - Ball circles step down from `36px` to `32px` diameter (or `28px` in dense multi-line verification matrices).
  - Row labels stack vertically above the numeric sequence when horizontal constraints require.
- **Tablet & Desktop (≥768px):**
  - Viewport centered at `840px` with `24px` page margins.
  - Horizontal row orientation for ticket balls (6 main numbers + separator + 1 special number).
  - Extended side panels or popover drawers for statistical draw frequencies.

## Elevation & Depth

This design system uses a hybrid approach: **tonal layers** combined with **low-contrast outlines** and **subtle ambient shadows**. The visual depth communicates functional hierarchy without relying on heavy skeuomorphic shading.

### Layer Hierarchy
1. **Base Floor (Level 0):** Background surface (`#f8fafc`). Flat, no shadow.
2. **Structural Trays & Dropzones (Level 1):** Inactive containers and file upload dropzones (`#f1f5f9`). Recessed depth using a `1px` border (`#e2e8f0`) with zero shadow.
3. **Primary Cards & Modals (Level 2):** Pure white canvas (`#ffffff`) framed by a crisp hairline border (`#e2e8f0`) and an ambient, low-opacity shadow:
   `box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(15, 23, 42, 0.02)`.
4. **Active Row & Card Hover (Level 3):**
   `box-shadow: 0 4px 12px rgba(15, 23, 42, 0.07), 0 2px 4px rgba(15, 23, 42, 0.03)`, with border shifting to `#cbd5e1`.
5. **Floating Action Hub (Level 4):** State synchronization and quick-action floaters:
   `box-shadow: 0 10px 25px -3px rgba(15, 23, 42, 0.15), 0 4px 6px -2px rgba(15, 23, 42, 0.05)`.
6. **Primary Vermilion Button Ambient Glow:**
   `box-shadow: 0 2px 8px rgba(220, 38, 38, 0.22)`.

## Shapes

The interface embraces a balanced modern curvature (Roundness level `2`), pairing organic softened corners on structural envelopes with strict circular geometry for lottery components.

### Shape Geometry Rules
- **Base Cards & Containers:** `16px` (`rounded-lg`) corner radii create a warm, approachable frame for analytical data.
- **Interactive Buttons & Form Inputs:** `10px` (`rounded-md`) corner radii balance modern ergonomics with crisp structural precision.
- **Segmented Control Beds:** `12px` exterior curvature with `8px` internal active pill radiuses.
- **Lottery Balls & Status Indicators:** Strict `9999px` (`rounded-full`) circles. Uncompromised circularity is critical for instant recognition of lottery ball metaphors.
- **Tag Badges & Micro-Pills:** Fully rounded `9999px` caps for Chinese prize categories and numerical count tokens.

## Components

### 1. Buttons
- **Primary Action ("Check Matches / 核對結果"):**
  - Height: `44px` (touch-optimized).
  - Background: `#dc2626` hover `#b91c1c`, active `#991b1b`.
  - Text: `#ffffff`, `14px`, Weight `600`.
  - Border: None. Ambient glow: `0 2px 8px rgba(220, 38, 38, 0.22)`.
  - Border Radius: `10px`.
- **Secondary Ghost ("Add Line / 新增注項", "Fetch Official Draw"):**
  - Height: `40px` (or `44px` on mobile).
  - Background: `#ffffff`, hover `#f8fafc`.
  - Text: `#334155`, Weight `500`.
  - Border: `1px solid #e2e8f0`, hover `#cbd5e1`.
- **Destructive / Row Removal Icon Button:**
  - Geometry: `32x32px` square with `6px` radius.
  - State: Inactive `#94a3b8`; hover transitions to `#dc2626` over `#fee2e2` wash.

### 2. Segmented Navigation Tabs
- Container: Background `#f1f5f9`, padding `4px`, border-radius `12px`.
- Inactive Tab: Background transparent, text `#64748b`, font-weight `500`.
- Active Tab: Background `#ffffff`, text `#0f172a`, font-weight `600`, border-radius `8px`, elevated with `0 2px 6px rgba(0,0,0,0.06)`. Accompanied by vermilion micro-indicator icon.

### 3. Lottery Ball Elements (1–49)
- **Geometry:** `36px x 36px` circular badge (`rounded-full`), centered tabular numerals in `JetBrains Mono` bold (`15px`).
- **Authentic Color Assignments:**
  - **Red Group (1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46):** Background `#dc2626`, text `#ffffff`.
  - **Blue Group (3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48):** Background `#2563eb`, text `#ffffff`.
  - **Green Group (5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49):** Background `#16a34a`, text `#ffffff`.
  - **Neutral Input / Unclassified:** Background `#ffffff`, border `1px solid #cbd5e1`, text `#0f172a`.
- **The 7th Special Number Ball (特別號碼):**
  - Circled with a `3px` offset outer ring or halo in Coral Magenta (`#e11d48`).
  - Accompanied by a micro-pill caption: `特別號碼` in `#e11d48` at `10px`.

### 4. Input Fields & Ticket Matrix Cells
- **Ball Cell Entry Box:**
  - Dimensions: `38px x 38px`, `8px` corner radius.
  - Border: `1px solid #cbd5e1`, shifting to `2px solid #dc2626` upon focus.
  - Typography: Centered, tabular `15px` bold.
  - Keyboard Configuration: Enforces `inputMode="numeric"` to trigger numeric keypads on mobile. Automatically advances focus upon two valid digits.
- **Standard Text Fields (Draw ID, Date):**
  - Height: `40px`, padding `8px 12px`, border `1px solid #e2e8f0`, focus border `1.5px solid #dc2626`.

### 5. Cards & Verification Result Panels
- Enclosed in `#ffffff`, border `1px solid #e2e8f0`, border-radius `16px`, subtle ambient elevation.
- **Winning Match Highlight Ribbon:**
  - Placed at the top or left hairline of qualifying ticket cards.
  - Background: Soft Imperial Gold wash (`#fef3c7`).
  - Text: Rich Amber Gold (`#92400e`), bold `13px`, displaying tier and prize title (e.g., "6 Numbers Matched — 頭獎 First Prize").
  - Unmatched ball badges within the winning card fade to `40%` opacity to direct focus instantly to the winning combinations.

### 6. OCR Scanner Dropzone
- Surface: `#f8fafc` relaxing to `#fee2e2` on active file drag.
- Border: `2px dashed #cbd5e1`, transitioning to solid vermilion `#dc2626` on hover/drag.
- Scanner Feedback: Integrated hairline progress bar (`4px` height) with a smooth ease-in gradient in Hong Kong Vermilion.