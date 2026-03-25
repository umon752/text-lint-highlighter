## REMOVED Requirements

### Requirement: Define Neumorphism base background color
**Reason**: Neumorphism style abandoned in favor of flat design. The dual-shadow approach required a specific mid-gray background incompatible with standard white-based UI expectations.
**Migration**: Use `--bg: #ffffff` from `flat-design-tokens` spec.

#### Scenario: Token no longer present after migration

- **WHEN** the CSS custom properties are inspected after migration
- **THEN** `--neu-bg` SHALL NOT exist in `:root`

### Requirement: Define Neumorphism shadow color tokens
**Reason**: `--neu-shadow-light` and `--neu-shadow-dark` are no longer needed. Flat design uses standard RGBA drop-shadows.
**Migration**: Use `--shadow-xs`, `--shadow-sm`, `--shadow-lg` from `flat-design-tokens` spec.

#### Scenario: Shadow color tokens removed

- **WHEN** the CSS custom properties are inspected after migration
- **THEN** `--neu-shadow-light` and `--neu-shadow-dark` SHALL NOT exist in `:root`

### Requirement: Define raised shadow token
**Reason**: Outset dual-layer shadows removed entirely.
**Migration**: Use `--shadow-xs` or `--shadow-sm` for subtle elevation.

#### Scenario: Raised shadow token removed

- **WHEN** the CSS custom properties are inspected after migration
- **THEN** `--neu-shadow-raised` SHALL NOT exist in `:root`

### Requirement: Define raised hover shadow token
**Reason**: Raised hover effect removed. Hover state now uses background color change only.
**Migration**: No direct replacement. Hover uses `--surface-hover` background.

#### Scenario: Raised hover token removed

- **WHEN** the CSS custom properties are inspected after migration
- **THEN** `--neu-shadow-raised-hover` SHALL NOT exist in `:root`

### Requirement: Define inset (pressed) shadow token
**Reason**: Inset shadow pressed effect removed. Active state now uses `transform: scale(0.97)`.
**Migration**: No direct replacement.

#### Scenario: Inset shadow token removed

- **WHEN** the CSS custom properties are inspected after migration
- **THEN** `--neu-shadow-inset` SHALL NOT exist in `:root`

### Requirement: Centralize all shadow tokens in :root
**Reason**: Replaced by `flat-design-tokens` centralization requirement.
**Migration**: All tokens remain in `:root` — see `flat-design-tokens` spec.

#### Scenario: Neumorphism tokens fully removed from :root

- **WHEN** the CSS `:root` block is inspected after migration
- **THEN** no property prefixed with `--neu-` SHALL be present
