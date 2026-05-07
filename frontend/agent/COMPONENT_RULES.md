# COMPONENT_RULES.md
## React Component Architecture & Composition Standards

This document defines the component philosophy and implementation standards for the application.

The goal is to ensure:
- maintainable components
- scalable UI architecture
- predictable composition
- reusable interfaces
- clean separation of concerns
- production-quality frontend code

All components must follow these standards consistently.

---

# Core Philosophy

Components should be:
- small
- focused
- composable
- reusable
- predictable
- readable

A component should have a clear responsibility.

If a component becomes difficult to understand quickly, it should likely be split.

---

# Single Responsibility Rule

Each component should solve one primary problem.

Good examples:
- Button
- Modal
- UserCard
- SearchInput
- SettingsPanel

Bad examples:
- giant dashboard containers
- components handling unrelated concerns
- UI + API + state + validation in one file

Avoid “god components”.

---

# Smart vs Presentational Components

Prefer separating:
- business logic
- presentation/UI

---

## Presentational Components

Responsible for:
- rendering UI
- receiving props
- emitting events

Should:
- remain reusable
- remain predictable
- avoid business logic

Example responsibilities:
- layout
- styling
- interaction rendering

---

## Smart Components

Responsible for:
- data fetching
- state orchestration
- business logic
- feature coordination

Smart components should:
- compose smaller UI components
- avoid excessive JSX complexity

---

# Component Size Rules

Prefer:
- small to medium-sized components

Avoid:
- components exceeding several hundred lines
- deeply nested JSX trees
- multiple unrelated responsibilities

If a component contains:
- multiple sections
- repeated patterns
- excessive conditional rendering

extract subcomponents.

---

# Component Composition

Prefer composition over configuration complexity.

Good:

```tsx
<Card>
  <CardHeader />
  <CardContent />
</Card>
```

Avoid:
- giant prop-driven mega components
- components with dozens of boolean props
- overly abstract UI systems

---

# Props Rules

Props should be:
- explicit
- predictable
- typed
- minimal

Avoid:
- ambiguous names
- prop overload
- unnecessary optional props
- deeply nested prop structures

---

# Boolean Props

Boolean props should read naturally.

Good:

```tsx
isLoading
isOpen
disabled
```

Avoid:
```tsx
loadingState
openMode
buttonDisabledState
```

---

# Callback Naming

Callbacks should clearly communicate intent.

Good:

```tsx
onClick
onSubmit
onClose
onSelect
```

Avoid:
```tsx
handleStuff
doAction
triggerFunction
```

---

# Props Interface Rules

Always type props explicitly.

Preferred:

```tsx
interface ButtonProps {
  children: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}
```

Avoid:
- implicit any
- untyped props
- oversized interfaces

---

# Children Usage

Use children when composition improves readability.

Good:
```tsx
<Modal>
  <ModalContent />
</Modal>
```

Avoid using children for unclear or unpredictable APIs.

---

# State Rules

Components should own only the state they truly need.

Prefer:
1. local state
2. lifted shared state
3. context
4. global state

Avoid unnecessary global state.

---

# Derived State

Do NOT store derived values in state unnecessarily.

Prefer:

```tsx
const filteredItems = items.filter(...)
```

Avoid:
- syncing duplicated state
- unnecessary useEffect chains

---

# Hooks Usage Rules

Hooks must:
- follow React hook rules
- remain predictable
- avoid hidden side effects

Avoid:
- conditional hooks
- hook nesting chaos
- unnecessary effects

---

# useEffect Rules

useEffect should NOT be the default solution.

Avoid effects for:
- derived values
- simple calculations
- unnecessary synchronization

Effects should mainly handle:
- subscriptions
- external systems
- async side effects

---

# Custom Hooks

Extract custom hooks when:
- logic is reused
- components become too large
- business logic becomes complex

Good examples:
- useAuth
- useDebounce
- usePagination
- useSearch

Custom hooks should:
- encapsulate logic cleanly
- avoid UI rendering
- remain reusable

---

# Conditional Rendering

Prefer clear conditional rendering.

Good:

```tsx
if (!user) {
  return <EmptyState />
}
```

Avoid:
- deeply nested ternaries
- unreadable JSX conditions
- massive inline logic

---

# JSX Rules

JSX should remain readable.

Prefer:
- clean indentation
- extracted subcomponents
- semantic structure

Avoid:
- giant render functions
- excessive inline logic
- unreadable nesting

---

# Styling Rules

Components should use:
- CSS Modules by default
- scoped styling
- reusable utility patterns

Preferred file structure:

```text
Button/
├── Button.tsx
├── Button.module.css
└── Button.spec.tsx
```

Avoid:
- inline styles unless dynamic
- global style leakage
- duplicated styling logic

---

# Accessibility Rules

All components must support:
- keyboard interaction
- visible focus states
- semantic HTML
- proper labels
- screen readers

Accessibility is mandatory.

---

# Button Rules

Buttons must:
- use actual button elements
- support disabled states
- have visible interaction feedback
- avoid div/button anti-patterns

Never use clickable divs for buttons.

---

# Form Component Rules

Inputs must:
- have labels
- expose validation states
- support keyboard navigation
- maintain accessibility

Avoid:
- unlabeled inputs
- inconsistent form sizing
- inaccessible custom controls

---

# Loading & Error States

Components handling async data must support:
- loading states
- error states
- empty states

Never assume successful data.

---

# Reusability Rules

Before creating a component ask:
- Is this reusable?
- Is this feature-specific?
- Should this live in shared UI or inside a feature?

Do NOT prematurely globalize feature-specific components.

---

# Memoization Rules

Do NOT overuse:
- React.memo
- useMemo
- useCallback

Memoization should only exist when:
- measurable rerender issues exist
- computations are expensive
- stable references are necessary

Avoid premature optimization.

---

# Performance Rules

Avoid:
- unnecessary rerenders
- excessive prop drilling
- large render trees
- expensive computations during render

Prefer:
- lazy loading
- component splitting
- efficient rendering patterns

---

# File Organization Rules

Each component should remain self-contained.

Preferred structure:

```text
Component/
├── Component.tsx
├── Component.module.css
├── Component.spec.tsx
├── Component.types.ts
└── index.ts
```

Not every component needs every file.

Avoid excessive file fragmentation.

---

# Naming Rules

Use consistent naming.

Examples:

```text
UserCard.tsx
SettingsModal.tsx
SearchInput.tsx
```

Hooks:

```text
useAuth.ts
useTheme.ts
```

Avoid vague names.

Bad:
```text
Thing.tsx
Manager.tsx
Handler.tsx
```

---

# Export Rules

Prefer named exports for shared components.

Example:

```tsx
export function Button() {}
```

Avoid excessive default exports across shared systems unless project conventions require them.

---

# Testing Philosophy

Test:
- user behavior
- critical interactions
- important logic

Avoid:
- testing implementation details
- brittle snapshot-heavy tests
- testing library internals

---

# Anti-Patterns To Avoid

Never introduce:
- giant components
- deeply nested JSX
- prop drilling chaos
- duplicated logic
- business logic inside UI primitives
- excessive abstraction
- premature optimization
- inline anonymous complexity everywhere
- huge useEffect chains
- magic behavior hidden in hooks

---

# AI-Specific Rules

When generating components:
- preserve existing architecture
- reuse existing patterns
- keep components focused
- avoid unnecessary abstraction
- avoid rewriting unrelated components
- maintain consistency with neighboring files

Do not generate “demo-quality” React code.

All generated components must be production-grade.

---

# Final Rule

A good component should feel:
- predictable
- composable
- readable
- isolated
- maintainable

Another developer should understand the component quickly without tracing excessive hidden logic.