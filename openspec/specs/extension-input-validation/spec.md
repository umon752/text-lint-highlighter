# extension-input-validation Specification

## Purpose

TBD - created by archiving change 'security-hardening'. Update Purpose after archive.

## Requirements

### Requirement: Content script match scope is restricted to web pages

The extension's content script SHALL only be injected into `http` and `https` pages.
The content script SHALL NOT be injected into `file://`, `about:`, `chrome://`, `data:`, or blob URLs.

#### Scenario: Extension does not run on local files

- **WHEN** the user opens a `file://` URL in the browser
- **THEN** the content script is NOT injected into that page

#### Scenario: Extension runs on standard web pages

- **WHEN** the user visits an `http://` or `https://` URL
- **THEN** the content script is injected and available for highlighting


<!-- @trace
source: security-hardening
updated: 2026-03-28
code:
  - manifest.json
  - popup/popup.js
  - content/content.js
-->

---
### Requirement: onMessage listener validates sender identity

The content script's `chrome.runtime.onMessage` listener SHALL reject any message whose `sender.id` does not equal `chrome.runtime.id`.
The listener SHALL also reject messages where `message.rules` is not an array.

#### Scenario: Message from own extension is accepted

- **WHEN** the popup sends `{ action: 'run', rules: [...] }` to the content script
- **THEN** the listener processes the message and applies highlights

#### Scenario: Message from unknown sender is rejected

- **WHEN** a message arrives with a `sender.id` that does not match `chrome.runtime.id`
- **THEN** the listener returns without processing or responding

#### Scenario: Non-array rules payload is rejected

- **WHEN** the popup sends `{ action: 'run', rules: "not-an-array" }`
- **THEN** the listener responds with `{ count: 0 }` and does not call `applyHighlights`


<!-- @trace
source: security-hardening
updated: 2026-03-28
code:
  - manifest.json
  - popup/popup.js
  - content/content.js
-->

---
### Requirement: rule.color is applied via DOM property, not string interpolation

The content script SHALL set highlight span color using `span.style.backgroundColor = m.color` rather than injecting color into a CSS string.
The popup SHALL set rule color dot background using `element.style.backgroundColor = rule.color` rather than embedding it in an `innerHTML` template.

#### Scenario: Color is set on highlight span in content script

- **WHEN** a match is found and a highlight span is created
- **THEN** `span.style.backgroundColor` is assigned the rule color value directly

#### Scenario: Color dot in popup rule list is set via property

- **WHEN** the popup renders the rules list
- **THEN** `.rule-color-dot` background color is set via `.style.backgroundColor`, not via `innerHTML` template interpolation


<!-- @trace
source: security-hardening
updated: 2026-03-28
code:
  - manifest.json
  - popup/popup.js
  - content/content.js
-->

---
### Requirement: Regex match count per text node is capped

The content script SHALL stop accumulating matches for a single text node once the total match count across all rules reaches `MAX_MATCHES_PER_NODE` (500).

#### Scenario: Normal page does not hit the limit

- **WHEN** a text node has fewer than 500 total matches across all enabled rules
- **THEN** all matches are highlighted normally

#### Scenario: Excessive matches are truncated

- **WHEN** a text node accumulates 500 matches before the regex loop completes
- **THEN** no further matches are added for that text node and the loop exits


<!-- @trace
source: security-hardening
updated: 2026-03-28
code:
  - manifest.json
  - popup/popup.js
  - content/content.js
-->

---
### Requirement: Rules loaded from storage are schema-validated

The popup SHALL validate each rule loaded from `chrome.storage.sync` before use.
A valid rule MUST satisfy all of:
- `id` is a non-empty string
- `name` is a non-empty string
- `type` is one of: `cjk-extra-space`, `cjk-missing-space`, `keyword`, `regex`
- `color` is a string matching `/^#[0-9a-f]{6}$/i`
- `pattern` is a string
- `enabled` is a boolean

Rules that fail validation SHALL be silently filtered out.
If the stored value is not an array, the popup SHALL treat it as an empty rule list.

#### Scenario: Valid rules are loaded normally

- **WHEN** storage contains an array of rules that all pass schema validation
- **THEN** all rules are returned and rendered in the popup

#### Scenario: Invalid rules are filtered out

- **WHEN** storage contains a rule with a missing or malformed field (e.g., `color: "not-a-hex"`)
- **THEN** that rule is excluded from the loaded list; valid rules are unaffected

#### Scenario: Non-array storage value is handled gracefully

- **WHEN** `chrome.storage.sync` returns a non-array value for the rules key
- **THEN** `loadRules()` resolves with an empty array


<!-- @trace
source: security-hardening
updated: 2026-03-28
code:
  - manifest.json
  - popup/popup.js
  - content/content.js
-->

---
### Requirement: buildRegex failures are logged with console.warn

When `buildRegex()` encounters an unknown `rule.type` or a regex compilation error, it SHALL emit a `console.warn` message identifying the rule name and the failure reason.

#### Scenario: Unknown rule type is logged

- **WHEN** a rule with an unrecognized `type` value is passed to `buildRegex()`
- **THEN** `console.warn` is called with the unknown type name and the function returns `null`

#### Scenario: Invalid regex pattern is logged

- **WHEN** a `regex`-type rule contains a pattern that throws during `new RegExp(pattern)`
- **THEN** `console.warn` is called with the rule name and error message, and the function returns `null`

<!-- @trace
source: security-hardening
updated: 2026-03-28
code:
  - manifest.json
  - popup/popup.js
  - content/content.js
-->