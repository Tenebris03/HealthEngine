# GIT_RULES.md
## Git Workflow, Commit Standards & Version Control Rules

This document defines how Git should be used in this project to ensure:
- clean commit history
- predictable changes
- safe collaboration
- maintainable repository structure
- production-ready workflows

All contributors (including AI agents) must follow these rules strictly.

---

# Core Philosophy

Git history should be:
- readable
- logical
- incremental
- reversible
- meaningful

Each commit should represent a single coherent change.

Avoid:
- messy commits
- unrelated changes bundled together
- large “everything changed” commits
- unclear commit messages

---

# Branching Strategy

## Main Branches

- `main` → production-ready code
- `develop` (optional) → integration branch for larger teams

If no team workflow exists:
- work directly with feature branches from `main`

---

## Feature Branches

All work should happen in feature branches:

```text
feature/<short-description>
bugfix/<short-description>
refactor/<short-description>
chore/<short-description>
```

Examples:
```text
feature/auth-login
feature/dashboard-ui
bugfix/button-click-crash
refactor/state-management
```

---

# Commit Rules

## Commit Frequency

Commit frequently in small, meaningful increments.

Avoid:
- huge commits with multiple unrelated changes
- “final fixes” mega commits

Prefer:
- step-by-step development history

---

## Commit Message Format

Use clear, conventional commit style:

```text
type(scope): short description
```

### Types:
- feat → new feature
- fix → bug fix
- refactor → code restructuring (no behavior change)
- chore → maintenance tasks
- style → formatting / styling changes
- test → test-related changes
- docs → documentation changes

---

## Examples

```text
feat(auth): add login form validation
fix(button): prevent double click crash
refactor(state): simplify auth context logic
chore(deps): update vite to latest version
style(ui): improve spacing in dashboard cards
docs(git): add commit guidelines
```

---

## Commit Message Rules

Commit messages must:
- be concise
- describe what changed (not how)
- use present tense
- avoid vague wording

Bad:
```text
fix stuff
update code
changes
final version
```

Good:
```text
fix modal crash on empty state
add debounce to search input
refactor auth flow to reduce complexity
```

---

# Scope Rules

Each commit should affect:
- one feature OR
- one bug OR
- one refactor goal

Avoid mixing:
- feature + refactor + formatting in one commit
- unrelated UI changes in a single commit

---

# Pull Request Rules (if applicable)

PRs should:
- be focused
- be reviewable
- not exceed reasonable size
- include clear description

---

## PR Description Should Include:
- what changed
- why it changed
- how to test
- screenshots (if UI changes exist)

---

# Code Review Philosophy

All changes should be:
- readable
- consistent
- maintainable
- aligned with project rules

Focus on:
- architecture correctness
- state management
- UI consistency
- performance impact

Avoid nitpicking irrelevant formatting (unless it breaks consistency).

---

# Merge Rules

Preferred merge strategy:
- squash and merge (for feature branches)
OR
- rebase and merge (for clean history)

Avoid messy merge commits in feature-heavy workflows.

---

# Rewriting History Rules

Avoid rewriting shared history.

Only use:
- `rebase` for local cleanup
- `force push` in personal feature branches only

Never force push to:
- main
- shared branches
- production branches

---

# Revert Rules

Prefer `git revert` over destructive resets in shared environments.

Use revert when:
- a change breaks production
- rollback is needed safely

---

# Refactor Rules

Refactoring commits must:
- NOT change external behavior
- be isolated from feature changes
- be clearly labeled

Example:
```text
refactor(api): simplify request handling layer
```

---

# Dependency Changes

Dependency updates must be:
- isolated commits
- clearly labeled
- justified when possible

Example:
```text
chore(deps): upgrade react to 19.0.0
```

---

# Formatting Commits

Formatting-only commits should:
- be separate from logic changes
- be labeled as `style` or `chore`

Avoid mixing formatting with functional changes.

---

# AI-Specific Git Rules

When generating commits or changes:
- keep scope minimal
- avoid unrelated file modifications
- do not “optimize everything at once”
- preserve existing structure unless necessary
- do not reformat entire codebase unnecessarily

AI must behave like a careful engineer, not an automated formatter.

---

# Anti-Patterns To Avoid

Never:
- commit secrets (.env files)
- commit build artifacts (dist/, node_modules/)
- mix unrelated changes
- write vague commit messages
- rewrite large parts of code without reason
- introduce multiple features in one commit
- break existing functionality silently

---

# .gitignore Rules (Reminder)

Ensure these are ignored:
- node_modules/
- dist/
- .env
- .env.*
- coverage/
- logs/
- build outputs

---

# Final Rule

A good Git history should allow another developer to:
- understand project evolution
- debug issues quickly
- revert safely
- navigate changes easily

If the history is confusing, the workflow is wrong.