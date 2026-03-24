---
applyTo: "**"
---

# Git Commit Message Rules

## Format

```
<type>: <verb> + <description>
```

## Types

| Type | Usage |
|------|-------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, missing semicolons, etc. (no logic change) |
| `refactor` | Code restructuring without feature or bug changes |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `chore` | Build process, dependency updates, tooling config |
| `ci` | CI/CD configuration changes |
| `build` | Changes affecting the build system |
| `revert` | Reverting a previous commit |

## Rules

- Format must follow `type: verb + description`
- Start the description with an imperative verb: Add, Fix, Update, Remove, Refactor, Improve, Move, Rename, Bump, etc.
- Write in English
- Use lowercase for the entire message
- Do NOT end with punctuation
- Keep it concise and descriptive

## Examples

```
feat: add user authentication flow
fix: resolve crash when submitting empty form
docs: update README with installation steps
style: format header component with prettier
refactor: extract payment logic into service layer
perf: reduce bundle size by lazy loading routes
test: add unit tests for order calculation
chore: bump eslint to v9
ci: add GitHub Actions workflow for PR checks
build: update vite config for production output
revert: revert feat: add dark mode toggle
```

## Bad Examples

```
❌ fixed stuff                  ← too vague
❌ Feat: Add login              ← type must be lowercase
❌ feat: add login feature.     ← no punctuation at end
❌ feat: added login            ← use imperative verb (add, not added)
❌ feat:add login               ← missing space after colon
```
