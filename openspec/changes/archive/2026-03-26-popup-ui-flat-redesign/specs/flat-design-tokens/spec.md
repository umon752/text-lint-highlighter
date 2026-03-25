## ADDED Requirements

### Requirement: Define white base background token

The system SHALL define `--bg: #ffffff` as the base background color for the popup body and modal surfaces.

#### Scenario: Body uses white background

- **WHEN** the popup is rendered
- **THEN** the `body` element SHALL display a white (`#ffffff`) background

### Requirement: Define light gray surface token

The system SHALL define `--surface: #f6f6f7` as the background color for interactive surface components (rule items, ghost buttons, add buttons).

#### Scenario: Rule items use surface color

- **WHEN** a `.rule-item` is rendered in its resting state
- **THEN** its background SHALL be `--surface` (`#f6f6f7`), visually distinct from the white body

### Requirement: Define orange accent token

The system SHALL define `--accent` using OKLCH (`oklch(70% 0.20 47)`) as the primary action color, representing an orange hue.

#### Scenario: Accent used for primary button

- **WHEN** a `.btn-primary` is rendered
- **THEN** its background SHALL be `--accent`

#### Scenario: Accent used for focus ring

- **WHEN** an input or select element receives focus
- **THEN** a focus ring using `--accent` with reduced opacity SHALL appear

### Requirement: Define typographic ink tokens

The system SHALL define four ink levels for text hierarchy:

- `--ink: #1a1a1a` (primary text)
- `--ink-2: #616167` (secondary text)
- `--ink-3: #8c8c92` (placeholder / label)
- `--ink-4: #b5b5ba` (disabled / hint)

#### Scenario: Rule name uses primary ink

- **WHEN** a `.rule-name` element is rendered
- **THEN** it SHALL use `--ink` color

### Requirement: Define flat shadow tokens

The system SHALL define three shadow levels using single-layer `box-shadow` with RGBA values:

- `--shadow-xs`: very subtle (offset 1px, blur 3px)
- `--shadow-sm`: light (offset 3px, blur 12px)
- `--shadow-lg`: modal elevation (offset 6–10px, blur 24–40px)

No `inset` or dual-layer shadows SHALL be used.

#### Scenario: Modal uses large shadow

- **WHEN** the `.modal` element is visible
- **THEN** its `box-shadow` SHALL use `--shadow-lg`

### Requirement: Define border radius tokens

The system SHALL define:

- `--radius-sm: 8px`
- `--radius: 10px`
- `--radius-lg: 12px`

#### Scenario: Rule items use standard radius

- **WHEN** a `.rule-item` is rendered
- **THEN** its `border-radius` SHALL be `--radius` (10px)

### Requirement: Centralize all design tokens in :root

All design tokens (`--bg`, `--surface`, `--accent`, `--ink-*`, `--shadow-*`, `--radius-*`, `--border`, `--border-strong`) SHALL be declared in `:root`.

#### Scenario: Token available globally

- **WHEN** any CSS rule references a design token
- **THEN** the property SHALL resolve without fallback
