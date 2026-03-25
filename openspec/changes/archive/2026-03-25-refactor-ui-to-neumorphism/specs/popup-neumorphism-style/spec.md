## ADDED Requirements

### Requirement: Remove all component borders in favor of shadows

Every component in the popup (buttons, rule items, inputs, selects, modals) SHALL have its `border` property set to `none`. Visual separation SHALL be provided exclusively via `box-shadow` using the `--neu-shadow-raised` token.

#### Scenario: Button has no visible border line

- **WHEN** a `.btn` element is rendered
- **THEN** no border line SHALL be visible; depth SHALL be conveyed by shadow only

#### Scenario: Rule item has no visible border line

- **WHEN** a `.rule-item` element is rendered
- **THEN** no border line SHALL be visible; depth SHALL be conveyed by shadow only

### Requirement: Apply raised shadow to resting components

All interactive surface components (`.btn`, `.rule-item`, `.modal`, form inputs, selects) SHALL display `--neu-shadow-raised` in their default resting state.

#### Scenario: Button displays raised shadow at rest

- **WHEN** a `.btn` element is not hovered and not focused
- **THEN** the element SHALL have `box-shadow: var(--neu-shadow-raised)`

#### Scenario: Rule item displays raised shadow at rest

- **WHEN** a `.rule-item` element is not hovered
- **THEN** the element SHALL have `box-shadow: var(--neu-shadow-raised)`

#### Scenario: Modal card displays raised shadow

- **WHEN** the `.modal` element is visible
- **THEN** the element SHALL have `box-shadow: var(--neu-shadow-raised)` (or a stronger variant appropriate for modal elevation)

### Requirement: Apply intensified raised shadow on hover

All interactive surface components SHALL display `--neu-shadow-raised-hover` when the user hovers over them, creating a subtle lift effect.

#### Scenario: Button lifts on hover

- **WHEN** a `.btn` element receives a `hover` state
- **THEN** the element's `box-shadow` SHALL transition to `var(--neu-shadow-raised-hover)`
- **THEN** the transition SHALL be smooth (CSS `transition` on `box-shadow`)

#### Scenario: Rule item lifts on hover

- **WHEN** a `.rule-item` element receives a `hover` state
- **THEN** the element's `box-shadow` SHALL transition to `var(--neu-shadow-raised-hover)`

### Requirement: Apply inset shadow on active/pressed state

All clickable components (`.btn`, `.btn-icon`, color preset buttons) SHALL display `--neu-shadow-inset` when in the `:active` state, simulating a physical press-in effect.

#### Scenario: Button appears pressed on click

- **WHEN** a `.btn` element is in `:active` state
- **THEN** the element's `box-shadow` SHALL be `var(--neu-shadow-inset)`
- **THEN** no outward `transform: scale(...)` SHALL be applied simultaneously (to avoid conflicting depth cues)

### Requirement: Toggle switch uses inset track and raised knob

The `.rule-toggle` checkbox SHALL render its track using an inset shadow to represent a recessed groove, and its `::after` knob SHALL use a raised shadow to appear as a floating pill.

#### Scenario: Toggle track appears recessed

- **WHEN** a `.rule-toggle` element is rendered (checked or unchecked)
- **THEN** the track background SHALL use `var(--neu-shadow-inset)` as `box-shadow` to look like a carved groove

#### Scenario: Toggle knob appears elevated

- **WHEN** the `::after` pseudo-element of `.rule-toggle` is rendered
- **THEN** the knob SHALL use a small `--neu-shadow-raised` to appear as a raised circle

### Requirement: Form inputs use inset shadow on focus

Text inputs and select elements SHALL display `--neu-shadow-inset` when focused, visually distinguishing them from raised surface components and indicating an "active editing" state.

#### Scenario: Input appears recessed when focused

- **WHEN** an `input[type="text"]` or `select` receives focus
- **THEN** its `box-shadow` SHALL switch to `var(--neu-shadow-inset)`
- **THEN** the accent-colored focus ring SHALL be removed or replaced to avoid visual conflict

### Requirement: Maintain shadow transitions

All `box-shadow` state changes SHALL be animated via CSS `transition`. The transition duration SHALL be between 100ms and 200ms.

#### Scenario: Shadow transitions smoothly between states

- **WHEN** a component moves from resting to hover or active state
- **THEN** the `box-shadow` change SHALL animate rather than snap instantly

### Requirement: Preserve accent color on primary button background

The `.btn-primary` element SHALL retain its accent-colored background (`var(--accent)`) to maintain visual hierarchy. The Neumorphism shadow SHALL still apply on hover and active states.

#### Scenario: Primary button retains accent background

- **WHEN** a `.btn-primary` element is rendered
- **THEN** the background SHALL remain `var(--accent)`, not the Neumorphism base color

#### Scenario: Primary button shadow visible on accent background

- **WHEN** a `.btn-primary` element is hovered or active
- **THEN** the shadow effect SHALL be visible (using a tinted shadow derived from the accent color, or a subtle scale/opacity change as fallback)
