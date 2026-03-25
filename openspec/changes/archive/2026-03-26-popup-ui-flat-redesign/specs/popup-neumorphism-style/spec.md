## REMOVED Requirements

### Requirement: Remove all component borders in favor of shadows
**Reason**: Flat design reintroduces subtle borders (`--border`, `--border-strong`) as the primary visual separator. Borders are more readable than neumorphism shadows at small scales.
**Migration**: See `popup-flat-style` — borders are used on inputs, modals, and rule-item hover state.

#### Scenario: Borders restored after migration

- **WHEN** a `.modal` or focused `input` is inspected after migration
- **THEN** a visible `border` property SHALL be present instead of `box-shadow` as separator

### Requirement: Apply raised shadow to resting components
**Reason**: Neumorphism raised shadows removed. Resting components use flat background with no shadow.
**Migration**: Rule items use `--surface` background. Modal uses `--shadow-lg` drop-shadow.

#### Scenario: Rule item has no raised shadow at rest

- **WHEN** a `.rule-item` is rendered in resting state after migration
- **THEN** no outset `box-shadow` SHALL be applied to the element

### Requirement: Apply intensified raised shadow on hover
**Reason**: Raised hover removed. Hover state now uses background color shift.
**Migration**: See `popup-flat-style` — `.rule-item:hover` uses `--surface-hover` background.

#### Scenario: Hover uses background change not shadow

- **WHEN** a `.rule-item` is hovered after migration
- **THEN** the element SHALL change background color and SHALL NOT intensify any box-shadow

### Requirement: Apply inset shadow on active/pressed state
**Reason**: Inset active removed. Pressed state uses `transform: scale(0.97)` for tactile feedback.
**Migration**: No direct replacement; `transform: scale(0.97)` on `.btn:active`.

#### Scenario: Active state uses scale not inset shadow

- **WHEN** a `.btn` is in `:active` state after migration
- **THEN** the element SHALL apply `transform: scale(0.97)` and SHALL NOT use any `inset box-shadow`

### Requirement: Toggle switch uses inset track and raised knob
**Reason**: Neumorphism toggle removed. New toggle uses flat dark track (checked) or gray track (unchecked) with white knob.
**Migration**: See `popup-flat-style` — toggle spec updated with dark selected state.

#### Scenario: Toggle uses flat color track after migration

- **WHEN** a `.rule-toggle` is rendered after migration
- **THEN** the track SHALL use a flat background color with no `inset box-shadow`

### Requirement: Form inputs use inset shadow on focus
**Reason**: Inset shadow on focus removed. Focus state now uses accent-colored border + translucent focus ring.
**Migration**: See `popup-flat-style` — input focus uses `--accent` border and 3px focus ring.

#### Scenario: Input focus uses border not inset shadow

- **WHEN** an `input[type="text"]` receives focus after migration
- **THEN** focus SHALL be indicated by an orange border and focus ring, not an `inset box-shadow`

### Requirement: Maintain shadow transitions
**Reason**: Shadow transition no longer applicable; box-shadow no longer changes on interaction.
**Migration**: `transition` retained for `background`, `border-color`, and `transform` properties.

#### Scenario: Transitions target background not box-shadow

- **WHEN** interactive components are inspected after migration
- **THEN** CSS `transition` SHALL include `background` and SHALL NOT list `box-shadow` as the primary transitioned property

### Requirement: Preserve accent color on primary button background
**Reason**: Requirement unchanged in principle — primary button still uses `--accent` (orange). No migration needed.
**Migration**: See `popup-flat-style` — `.btn-primary` uses `--accent` background.

#### Scenario: Primary button retains accent background after migration

- **WHEN** a `.btn-primary` is rendered after migration
- **THEN** its background SHALL still be `--accent` (orange)
