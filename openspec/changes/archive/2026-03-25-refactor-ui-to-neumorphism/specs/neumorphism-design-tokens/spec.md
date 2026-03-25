## ADDED Requirements

### Requirement: Define Neumorphism base background color

The system SHALL define a CSS custom property `--neu-bg` as the single source of truth for the Neumorphism background color. The value SHALL be a light gray-white in the OKLCH color space (lightness approximately 88%–92%).

#### Scenario: Background color applied to body

- **WHEN** the popup is rendered
- **THEN** the `body` element SHALL use `--neu-bg` as its background color

#### Scenario: All components share the same background color

- **WHEN** any component (button, card, input) is rendered in its resting state
- **THEN** the component background SHALL match `--neu-bg` so shadows create the illusion of depth

### Requirement: Define Neumorphism shadow color tokens

The system SHALL define two shadow color custom properties derived from `--neu-bg`:

- `--neu-shadow-light`: a lighter tint of `--neu-bg` (OKLCH lightness ≥ 97%)
- `--neu-shadow-dark`: a darker shade of `--neu-bg` (OKLCH lightness ≤ 72%)

Both colors SHALL be in the same hue family as `--neu-bg`. Pure black (`#000`) or pure white (`#fff`) SHALL NOT be used as shadow colors.

#### Scenario: Light shadow is visibly lighter than background

- **WHEN** `--neu-shadow-light` is applied to a `box-shadow`
- **THEN** the shadow SHALL appear lighter than the base background on all common display brightness levels

#### Scenario: Dark shadow is visibly darker than background

- **WHEN** `--neu-shadow-dark` is applied to a `box-shadow`
- **THEN** the shadow SHALL appear darker than the base background on all common display brightness levels

### Requirement: Define raised shadow token

The system SHALL define `--neu-shadow-raised` as a CSS `box-shadow` value that produces a dual-layer outset shadow (one light, one dark) simulating a raised surface.

The shadow offset SHALL be between 4px and 8px. The blur radius SHALL be between 8px and 16px. The spread radius SHALL be 0 or negative.

#### Scenario: Raised shadow applied to a component

- **WHEN** `--neu-shadow-raised` is used on a component
- **THEN** the component SHALL appear to float above the background surface

### Requirement: Define raised hover shadow token

The system SHALL define `--neu-shadow-raised-hover` as a stronger variant of `--neu-shadow-raised`, with increased offset or blur to simulate closer proximity to the viewer on hover.

#### Scenario: Hover shadow intensified relative to resting state

- **WHEN** `--neu-shadow-raised-hover` is compared to `--neu-shadow-raised`
- **THEN** the shadow offset or blur SHALL be visibly larger, creating a stronger floating effect

### Requirement: Define inset (pressed) shadow token

The system SHALL define `--neu-shadow-inset` as a CSS `box-shadow` value using `inset` keyword with dual-layer shadows (one light, one dark) simulating a pressed-in surface.

#### Scenario: Inset shadow simulates depression on active state

- **WHEN** `--neu-shadow-inset` is used on a component in active/pressed state
- **THEN** the component SHALL appear to be pushed into the background surface

### Requirement: Centralize all shadow tokens in :root

All `--neu-*` custom properties SHALL be declared in the `:root` selector so they are globally available to all components.

#### Scenario: Token available to any component

- **WHEN** any CSS rule references a `--neu-*` custom property
- **THEN** the property SHALL resolve to its defined value without fallback
