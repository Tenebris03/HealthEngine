# PROJECT_STRUCTURE.md

## Frontend Architecture & Project Structure Rules

This project uses a scalable feature-driven architecture for a modern React + Vite application.

The goal of this structure is to ensure:

- maintainability
- scalability
- clean separation of concerns
- predictable organization
- easier onboarding
- long-term consistency
- clean AI-assisted development

Architecture consistency is mandatory.

---

# Core Architecture Philosophy

The project follows these principles:

1. shared code is separated from feature code
2. business logic is isolated by feature
3. reusable UI stays generic
4. components remain composable
5. folder structure should communicate ownership clearly
6. files should be easy to locate without guessing

Avoid architecture sprawl.

---

# High-Level Structure

```text
src/
├── assets/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── forms/
│   └── feedback/
├── features/
│   ├── auth/
│   ├── dashboard/
│   └── settings/
├── hooks/
├── providers/
├── routes/
├── services/
├── lib/
├── constants/
├── schemas/
├── theme/
├── types/
├── utils/
├── context/
├── test/
├── App.tsx
├── main.tsx
├── i18n.ts
└── index.css
```

---

# Detailed Example Structure

```text
frontend/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── logo.png
│
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.module.css
│   │   │   │   └── Button.spec.tsx
│   │   │   │
│   │   │   ├── Card/
│   │   │   └── Input/
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar/
│   │   │   ├── Sidebar/
│   │   │   └── PageContainer/
│   │   │
│   │   ├── forms/
│   │   └── feedback/
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── types/
│   │   │   ├── schemas/
│   │   │   ├── locales/
│   │   │   └── pages/
│   │   │
│   │   ├── dashboard/
│   │   └── settings/
│   │
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── providers/
│   │   ├── AppProviders.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── AuthProvider.tsx
│   │
│   ├── routes/
│   │   ├── index.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── routeConfig.ts
│   │
│   ├── services/
│   │   ├── apiClient.ts
│   │   └── analytics.ts
│   │
│   ├── lib/
│   │   ├── logger/
│   │   ├── config/
│   │   └── validation/
│   │
│   ├── constants/
│   │   ├── routes.ts
│   │   └── queryKeys.ts
│   │
│   ├── schemas/
│   │   ├── user.schema.ts
│   │   └── auth.schema.ts
│   │
│   ├── theme/
│   │   ├── colors.css
│   │   ├── spacing.css
│   │   ├── typography.css
│   │   ├── radius.css
│   │   ├── shadows.css
│   │   ├── animations.css
│   │   └── index.css
│   │
│   ├── types/
│   │   └── api.types.ts
│   │
│   ├── utils/
│   │   ├── formatDate.ts
│   │   ├── debounce.ts
│   │   └── cn.ts
│   │
│   ├── context/
│   │   └── UserContext.tsx
│   │
│   ├── test/
│   │   ├── setup.ts
│   │   └── utils.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── i18n.ts
│   └── index.css
│
├── .env
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

# Directory Responsibilities

# assets/

Contains:

- fonts
- images
- icons
- static media

Do NOT place:

- business logic
- React components
- generated files

---

# components/

Contains globally reusable UI components.

These components must remain:

- generic
- reusable
- presentation-focused

---

## components/ui/

Primitive reusable UI components.

Examples:

- Button
- Input
- Card
- Modal
- Spinner

Rules:

- no business logic
- no feature-specific imports
- highly reusable
- visually consistent

---

## components/layout/

Application layout components.

Examples:

- Navbar
- Sidebar
- Footer
- AppShell
- PageContainer

---

## components/forms/

Reusable form building blocks.

Examples:

- FormField
- Select
- Checkbox
- TextArea

---

## components/feedback/

Feedback and interaction UI.

Examples:

- Toasts
- Alerts
- EmptyState
- LoadingState
- ErrorState

---

# features/

Contains isolated business domains/features.

This is the primary scaling mechanism of the application.

Each feature owns:

- components
- hooks
- services
- types
- translations
- schemas
- state
- feature-specific utilities

Example:

```text
features/
├── auth/
├── dashboard/
└── settings/
```

---

# Feature Rules

Features should be as isolated as possible.

Features may:

- import from shared modules
- use global services
- use shared UI

Features should NOT:

- tightly couple to other features
- directly access internal files from other features
- create circular dependencies

Cross-feature communication should happen through:

- shared services
- providers
- public exports

---

# hooks/

Contains globally reusable hooks.

Examples:

- useDebounce
- useMediaQuery
- useLocalStorage

Rules:

- hooks must remain generic
- feature-specific hooks belong inside features/

---

# providers/

Contains application-level providers.

Examples:

- ThemeProvider
- QueryProvider
- AuthProvider

Use an AppProviders wrapper when possible.

Example:

```tsx
<AppProviders>
  <App />
</AppProviders>
```

Keep main.tsx minimal.

---

# routes/

Contains routing configuration and route utilities.

Examples:

- route definitions
- protected routes
- route guards
- navigation helpers

Avoid placing large routing logic directly inside App.tsx.

---

# services/

Contains shared external communication logic.

Examples:

- API clients
- SDK wrappers
- analytics
- external integrations

Rules:

- services should not contain UI logic
- services should remain framework-agnostic when possible

---

# lib/

Contains shared infrastructure utilities.

Examples:

- API setup
- logger
- config
- validation helpers
- shared infrastructure code

lib/ differs from utils/ because:

- lib/ contains foundational infrastructure
- utils/ contains small pure helper functions

---

# constants/

Contains shared constants.

Examples:

- route paths
- query keys
- app configuration
- static enums

Avoid magic strings throughout the codebase.

---

# schemas/

Contains validation schemas.

Examples:

- Zod schemas
- form validation
- API validation

Keep validation centralized and reusable.

---

# theme/

Contains global design tokens and styling foundations.

Example:

```text
theme/
├── colors.css
├── spacing.css
├── typography.css
├── radius.css
├── shadows.css
├── animations.css
└── index.css
```

Rules:

- use centralized tokens
- avoid arbitrary styling values
- maintain visual consistency

---

# types/

Contains shared TypeScript types.

Examples:

- API response types
- shared interfaces
- utility types

Feature-specific types belong inside the feature itself.

---

# utils/

Contains small pure utility functions.

Examples:

- formatDate
- debounce
- clamp
- className helpers

Rules:

- utilities must remain pure
- no React logic
- no side effects
- no business logic

Avoid turning utils/ into a dumping ground.

---

# context/

Contains React context definitions.

Examples:

- UserContext
- ThemeContext

Rules:

- avoid excessive global state
- prefer local state first
- contexts should remain focused

---

# test/

Contains:

- shared test utilities
- mocks
- setup files
- custom render functions

---

# File Naming Rules

Use consistent naming.

Examples:

```text
Button.tsx
Button.module.css
Button.spec.tsx
useAuth.ts
auth.types.ts
auth.schema.ts
```

Avoid inconsistent casing or naming styles.

---

# CSS Rules

Use CSS Modules by default.

Preferred:

```text
Component.module.css
```

Avoid:

- global CSS leakage
- inline styles unless necessary
- multiple competing styling systems

Existing global CSS files must be respected and extended carefully.

---

# Import Rules

Prefer:

- shallow imports
- feature boundaries
- explicit imports

Avoid:

- deeply nested relative imports
- circular dependencies
- cross-feature internal imports

Use aliases when configured.

Example:

```ts
import { Button } from '@/components/ui/Button';
```

---

# Component Rules

Components should:

- have a single responsibility
- remain reasonably small
- avoid excessive nesting
- separate UI from business logic

If a component becomes difficult to reason about:

- split it

---

# State Management Rules

Prefer:

1. local component state
2. lifted state
3. context
4. dedicated global state

Do NOT introduce global state libraries prematurely.

---

# Testing Rules

Tests should live close to the code they test.

Preferred:

```text
Component/
├── Component.tsx
├── Component.module.css
└── Component.spec.tsx
```

Focus tests on:

- user behavior
- important logic
- edge cases

Avoid fragile implementation-detail tests.

---

# Scalability Rules

As the application grows:

- prefer feature isolation
- avoid giant shared folders
- avoid massive components
- avoid architectural shortcuts

Short-term convenience must not damage long-term maintainability.

---

# AI-Specific Rules

When generating code:

- respect folder ownership
- place files in the correct domain
- avoid introducing duplicate architecture patterns
- reuse existing structures
- preserve consistency

Never create new structural patterns unless justified.

---

# Final Rule

The architecture should feel:

- predictable
- scalable
- intentional
- maintainable

A developer should immediately understand where code belongs without guessing.
