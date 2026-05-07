# NAMING_CONVENTIONS.md
## Naming Standards for Files, Code & Architecture

This document defines consistent naming rules for the project to ensure:
- readability
- predictability
- scalability
- maintainability
- clean AI-generated code

Naming consistency is mandatory across the entire codebase.

---

# Core Philosophy

Names should be:
- explicit
- meaningful
- predictable
- intention-revealing

Avoid vague or overly generic naming.

A developer should understand purpose from the name alone.

---

# General Naming Rules

## Language

All code and identifiers must be in **English**.

Avoid mixing languages in:
- file names
- variables
- components
- comments (unless localization files)

---

## Clarity Over Brevity

Prefer clarity over short names.

Good:
```text
isUserAuthenticated
selectedDashboardTab
fetchUserProfile
```

Bad:
```text
isAuth
selTab
getData
```

---

# File Naming Rules

## Components

React components must use **PascalCase**:

```text
Button.tsx
UserCard.tsx
DashboardLayout.tsx
```

Each component should clearly describe its purpose.

---

## Hooks

Custom hooks must use **camelCase with "use" prefix**:

```text
useAuth.ts
useDebounce.ts
useUserPreferences.ts
```

Rules:
- must always start with `use`
- must represent reusable logic

---

## Utilities

Utility functions use **camelCase**:

```text
formatDate.ts
debounce.ts
calculateTotal.ts
```

Keep utilities pure and descriptive.

---

## Types

Type files use **descriptive camelCase or PascalCase naming**:

```text
user.types.ts
auth.types.ts
ApiResponse.ts
```

Prefer clarity over minimal naming.

---

## Schemas

Validation schemas:

```text
user.schema.ts
auth.schema.ts
loginForm.schema.ts
```

---

## Context Files

Contexts:

```text
AuthContext.tsx
ThemeContext.tsx
UserContext.tsx
```

---

## Feature Folders

Feature names use **lowercase kebab-case**:

```text
auth/
dashboard/
user-settings/
```

Rules:
- lowercase only
- hyphen-separated
- no spaces
- no underscores

---

## Service Files

```text
apiClient.ts
authService.ts
analyticsService.ts
```

Prefer descriptive service roles.

---

# Variable Naming Rules

## General Variables

Use **camelCase**:

```ts
const userName = "John"
const isLoading = true
const selectedItem = null
```

---

## Booleans

Boolean variables must clearly indicate state:

Preferred prefixes:
- is
- has
- can
- should

Examples:

```ts
isLoading
isAuthenticated
hasAccess
canEdit
shouldRefresh
```

Avoid:
```ts
loading
auth
access
edit
```

---

## Arrays

Use plural names:

```ts
const users = []
const messages = []
const selectedItems = []
```

Avoid:
```ts
userList (unless needed for clarity distinction)
```

---

## Functions

Functions must be **verb-based**:

Good:
```ts
getUser()
fetchData()
createAccount()
updateProfile()
deleteItem()
```

Bad:
```ts
user()
data()
profile()
```

---

## Event Handlers

Event handlers must use `handle` or `on` prefix:

Good:
```ts
handleSubmit
handleClick
onChange
onUserSelect
```

Avoid:
```ts
submit
clickHandler
changeFunc
```

---

# Component Naming Rules

## Must Be Nouns or Noun Phrases

Components represent UI entities.

Good:
```text
UserCard
LoginForm
DashboardHeader
SettingsPanel
```

Bad:
```text
HandleLogin
DoSomething
ProcessUser
```

---

## Layout Components

Use clear structural naming:

```text
AppLayout
PageContainer
SidebarLayout
AuthLayout
```

---

# Hook Naming Rules

Hooks represent reusable logic.

Must:
- start with `use`
- describe behavior clearly

Good:
```text
useAuth
usePagination
useSearch
useDebounce
```

Bad:
```text
authHook
searchUtil
debounceFunction
```

---

# CSS Naming Rules

## CSS Modules

File naming:

```text
Component.module.css
```

Class naming inside CSS Modules:
- use camelCase or readable class names
- avoid global leakage assumptions

Example:
```css
container
title
primaryButton
errorMessage
```

---

## Avoid:
- global CSS naming conflicts
- overly generic class names like `.box`, `.item`

---

# Constants Naming Rules

Constants use **UPPER_SNAKE_CASE**:

```ts
API_BASE_URL
MAX_RETRY_COUNT
DEFAULT_PAGE_SIZE
```

---

# Enum Naming Rules

Enums use **PascalCase**:

```ts
enum UserRole {
  Admin,
  User,
  Guest
}
```

---

# Type Naming Rules

Types use **PascalCase**:

```ts
type User = {
  id: string
  name: string
}
```

Interfaces also use PascalCase:

```ts
interface AuthState {
  isAuthenticated: boolean
}
```

---

# Event & Callback Naming Rules

## Props Callbacks

Use `on` prefix:

```ts
onClick
onSubmit
onClose
onChange
```

---

## Internal Handlers

Use `handle` prefix:

```ts
handleClick
handleSubmit
handleClose
```

---

# Boolean Naming Anti-Patterns

Avoid vague or ambiguous names:

Bad:
```ts
active
open
enabled
state
flag
```

Good:
```ts
isModalOpen
isUserActive
hasNotifications
isFeatureEnabled
```

---

# Folder Naming Rules

## Features

Must use kebab-case:

```text
user-auth/
dashboard/
profile-settings/
```

---

## Shared Modules

```text
components/
hooks/
services/
utils/
```

Always lowercase.

---

# API Naming Rules

API functions must:
- start with action verb
- describe endpoint purpose

Good:
```ts
fetchUserProfile
updateUserSettings
deleteAccount
createSession
```

---

# Translation Keys (i18n)

Use structured dot notation:

```text
auth.login.title
auth.login.submit
dashboard.welcome.message
```

Avoid flat or random keys.

---

# Test Naming Rules

Tests should describe behavior:

Good:
```text
should render login form
should display error on invalid input
should submit form successfully
```

Bad:
```text
test1
login test
check form
```

---

# Import Alias Rules

Prefer absolute imports:

```ts
@/components/ui/Button
@/features/auth/hooks/useAuth
```

Avoid deep relative imports:

```ts
../../../../components/Button
```

---

# AI-Specific Naming Rules

When generating code:
- prefer explicit naming over short names
- follow existing naming conventions strictly
- do NOT introduce new naming styles
- do NOT mix patterns within the same domain
- maintain consistency with nearby files

---

# Anti-Patterns To Avoid

Never use:
- vague names (`data`, `item`, `stuff`)
- inconsistent casing
- mixed naming styles
- abbreviations without meaning
- duplicated naming concepts
- unclear boolean names

---

# Final Rule

Good naming should:
- communicate intent instantly
- reduce cognitive load
- improve readability
- scale with project size

If a name requires explanation, it is probably wrong.