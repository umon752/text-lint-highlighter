# popup-flat-style Specification

## Purpose

TBD - created by archiving change 'popup-ui-flat-redesign'. Update Purpose after archive.

## Requirements

### Requirement: Popup body uses Noto Sans TC and fixed min-height

The popup `body` SHALL use `font-family: 'Noto Sans TC', -apple-system, sans-serif` as its font stack and SHALL have `min-height: 384px`.

#### Scenario: Body renders with correct font

- **WHEN** the popup is opened
- **THEN** all visible text SHALL render in Noto Sans TC (or system fallback)
- **THEN** the popup body minimum height SHALL be 384px


<!-- @trace
source: popup-ui-flat-redesign
updated: 2026-03-26
code:
  - popup/popup.html
  - popup/popup.js
  - popup/popup.css
-->

---
### Requirement: Rule item renders as flat gray card

Each `.rule-item` SHALL render as a flat card with:
- Background `--surface` (`#f6f6f7`)
- No box-shadow in resting state
- `border: 1px solid transparent`
- `border-radius: --radius` (10px)

On hover, the border SHALL become visible (`--border`) and background SHALL shift to `--surface-hover`.

#### Scenario: Rule item resting state

- **WHEN** a `.rule-item` is rendered and not hovered
- **THEN** its background SHALL be `--surface`, border SHALL be transparent, and no shadow SHALL appear

#### Scenario: Rule item hover state

- **WHEN** a `.rule-item` receives hover
- **THEN** its background SHALL change to `--surface-hover` and a subtle border SHALL appear


<!-- @trace
source: popup-ui-flat-redesign
updated: 2026-03-26
code:
  - popup/popup.html
  - popup/popup.js
  - popup/popup.css
-->

---
### Requirement: Buttons are rounded rectangles with orange primary

All `.btn` elements SHALL use `border-radius: --radius-sm` (8px).

The `.btn-primary` SHALL have:
- Background `--accent` (orange)
- White text
- Subtle orange-tinted `box-shadow`

On hover, background SHALL change to `--accent-hover`.

#### Scenario: Primary button visual state

- **WHEN** a `.btn-primary` is rendered
- **THEN** background SHALL be orange (`--accent`), text SHALL be white

#### Scenario: Primary button hover

- **WHEN** `.btn-primary` receives hover
- **THEN** background SHALL darken to `--accent-hover`


<!-- @trace
source: popup-ui-flat-redesign
updated: 2026-03-26
code:
  - popup/popup.html
  - popup/popup.js
  - popup/popup.css
-->

---
### Requirement: Toggle switch uses dark selected state

The `.rule-toggle` SHALL render as a pill-shaped switch. When checked:
- Track background SHALL be `--surface-active` (`#1a1a1a`)
- The knob (white circle) SHALL slide to the right

When unchecked, track background SHALL be `--surface-2`.

#### Scenario: Toggle checked state

- **WHEN** `.rule-toggle` is checked
- **THEN** track background SHALL be `#1a1a1a` (near-black)

#### Scenario: Toggle unchecked state

- **WHEN** `.rule-toggle` is unchecked
- **THEN** track background SHALL be `--surface-2` (light gray)


<!-- @trace
source: popup-ui-flat-redesign
updated: 2026-03-26
code:
  - popup/popup.html
  - popup/popup.js
  - popup/popup.css
-->

---
### Requirement: Form inputs use pill shape with focus ring

All text inputs and selects in `.form-group` SHALL:
- Have `border-radius: --radius-sm` (8px)
- Show a border with `--border-strong` at rest
- On focus, show `--accent`-colored border AND a 3px focus ring at reduced opacity

#### Scenario: Input resting state

- **WHEN** an `input[type="text"]` or `select` is rendered and not focused
- **THEN** it SHALL have a subtle border and no focus ring

#### Scenario: Input focused state

- **WHEN** an `input[type="text"]` or `select` receives focus
- **THEN** border SHALL turn orange (`--accent`) and a translucent orange focus ring SHALL appear


<!-- @trace
source: popup-ui-flat-redesign
updated: 2026-03-26
code:
  - popup/popup.html
  - popup/popup.js
  - popup/popup.css
-->

---
### Requirement: Modal uses white background with border and shadow

The `.modal` SHALL have:
- Background `--bg` (`#ffffff`)
- `border: 1px solid --border-strong`
- `border-radius: --radius-lg` (12px)
- `box-shadow: --shadow-lg`

#### Scenario: Modal appears correctly

- **WHEN** the rule form modal is opened
- **THEN** it SHALL appear as a white card with border and elevated shadow


<!-- @trace
source: popup-ui-flat-redesign
updated: 2026-03-26
code:
  - popup/popup.html
  - popup/popup.js
  - popup/popup.css
-->

---
### Requirement: Edit and delete icons are SVG line icons

The edit and delete icon buttons in each rule item SHALL use inline SVG with:
- `fill: none`
- `stroke: currentColor`
- `stroke-width: 1.8`
- `stroke-linecap: round`, `stroke-linejoin: round`

Emoji icons (✏️, 🗑) SHALL NOT be used.

#### Scenario: Edit button shows SVG pencil icon

- **WHEN** a rule item is rendered
- **THEN** the edit button SHALL contain an SVG pencil icon, not an emoji

#### Scenario: Delete button shows SVG trash icon

- **WHEN** a rule item is rendered
- **THEN** the delete button SHALL contain an SVG trash icon, not an emoji


<!-- @trace
source: popup-ui-flat-redesign
updated: 2026-03-26
code:
  - popup/popup.html
  - popup/popup.js
  - popup/popup.css
-->

---
### Requirement: Font is Noto Sans TC throughout all components

Every component that sets `font-family` SHALL use `'Noto Sans TC'` as the primary font. No component SHALL reference Fraunces or DM Sans.

#### Scenario: No Fraunces or DM Sans references

- **WHEN** the popup CSS is inspected
- **THEN** no `font-family` value SHALL include `Fraunces` or `DM Sans`

<!-- @trace
source: popup-ui-flat-redesign
updated: 2026-03-26
code:
  - popup/popup.html
  - popup/popup.js
  - popup/popup.css
-->