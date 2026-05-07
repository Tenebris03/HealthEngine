# STATE_MANAGEMENT.md
## React State Management Standards & Architecture Rules

This document defines the state management philosophy and architecture rules for the application.

The goal is to ensure:
- predictable state flow
- maintainable architecture
- minimal complexity
- scalable state organization
- performant rendering
- clean separation between UI state and business state

State should remain simple for as long as possible.

Avoid overengineering.

---

# Core Philosophy

State management should follow these principles:

1. keep state as local as possible
2. avoid unnecessary global state
3. derive values instead of duplicating state
4. separate server state from UI state
5. avoid hidden state mutations
6. prioritize predictability and readability

Complexity should only be introduced when justified.

---

# State Priority Order

Always prefer the simplest appropriate solution.

Preferred order:

1. local component state
2. lifted shared state
3. context
4. dedicated global state

Do NOT skip directly to global state solutions.

---

# Local State First

Prefer local component state whenever possible.

Examples:
- modal visibility
- dropdown state
- form input state
- loading indicators
- temporary UI interactions

Preferred:

```tsx
const [isOpen, setIsOpen] = useState(false)
```

Avoid globalizing temporary UI state.

---

# Lift State Carefully

When multiple nearby components require shared state:
- lift the state to the nearest common parent

Avoid:
- unnecessary context creation
- excessive prop drilling
- premature global state

---

# Context Usage Rules

React Context is appropriate for:
- authentication
- theme
- localization
- user preferences
- application-wide configuration

Context should NOT become:
- a replacement for all state management
- a dumping ground for unrelated state

---

# Context Organization

Contexts should remain focused and isolated.

Good:

```text
AuthContext
ThemeContext
LanguageContext
```

Bad:
```text
GlobalAppContext
MegaStateContext
```

Avoid giant all-purpose contexts.

---

# Context Performance Rules

Avoid excessive rerenders caused by context updates.

Prefer:
- splitting contexts by responsibility
- memoized values where necessary
- localized state when possible

Do NOT place rapidly changing UI state in global context.

---

# Global State Rules

Introduce dedicated global state only when:
- state is shared broadly
- prop drilling becomes unmanageable
- multiple distant features require synchronization

Global state is NOT the default solution.

---

# Approved Global State Usage

Global state is appropriate for:
- authenticated user data
- application settings
- cached shared entities
- feature flags
- cross-feature synchronization

Avoid placing:
- temporary UI state
- form drafts
- hover states
- modal toggles
- local filters

inside global stores unless truly necessary.

---

# Server State vs UI State

Server state and UI state are different concerns.

---

## Server State

Server state includes:
- API responses
- cached backend data
- async query results
- remote resources

Characteristics:
- asynchronous
- shared
- stale over time
- requires synchronization

---

## UI State

UI state includes:
- modal visibility
- input values
- tab selection
- local interactions
- animations
- temporary interface state

Do NOT mix server state and UI state unnecessarily.

---

# Data Fetching Philosophy

Avoid manual fetch management everywhere.

Prefer centralized async handling.

When appropriate:
- use query libraries
- centralize API logic
- separate fetching from rendering

Components should not become API orchestration layers.

---

# Derived State Rules

Avoid storing values that can be computed.

Good:

```tsx
const completedTasks = tasks.filter(task => task.completed)
```

Bad:

```tsx
const [completedTasks, setCompletedTasks] = useState([])
```

unless necessary for performance or synchronization.

---

# State Duplication Rules

Do NOT duplicate the same state across:
- components
- contexts
- stores
- hooks

Maintain a single source of truth whenever possible.

---

# Mutation Rules

State must remain immutable.

Never:
- mutate arrays directly
- mutate objects directly
- modify state references in place

Avoid:

```tsx
items.push(newItem)
```

Prefer:

```tsx
setItems(prev => [...prev, newItem])
```

---

# useState Rules

Use useState for:
- simple local state
- isolated interactions
- lightweight UI logic

Avoid stuffing large business logic into useState-heavy components.

---

# useReducer Rules

Prefer useReducer when:
- state transitions become complex
- multiple related values change together
- logic becomes difficult to follow with useState

Good use cases:
- multi-step forms
- complex filters
- workflow states

Do NOT use reducers for trivial state.

---

# Reducer Rules

Reducers must:
- remain pure
- avoid side effects
- use explicit action types
- remain predictable

Avoid:
- async logic inside reducers
- hidden mutations
- giant switch statements with unrelated logic

---

# Custom Hooks for State Logic

Extract reusable state logic into custom hooks.

Examples:
- usePagination
- useAuth
- useSearch
- useFilters

Custom hooks should:
- encapsulate logic cleanly
- remain reusable
- separate business logic from UI

---

# Form State Rules

Forms should:
- isolate their own state
- remain predictable
- expose validation clearly

Avoid:
- excessive form prop drilling
- giant uncontrolled form logic
- deeply nested form state structures

---

# Async State Rules

Async flows must handle:
- loading states
- success states
- error states
- empty states
- cancellation where necessary

Never assume successful requests.

---

# Loading State Rules

Loading states should:
- feel responsive
- avoid layout shift
- communicate progress clearly

Avoid:
- blocking the entire UI unnecessarily
- flashing spinners everywhere
- inconsistent loading behavior

---

# Error State Rules

Errors must:
- fail gracefully
- remain understandable
- avoid breaking the application

Provide:
- recovery paths
- fallback UI
- useful feedback

Avoid silent failures.

---

# Optimistic Updates

Use optimistic updates carefully.

Only when:
- UX significantly benefits
- rollback handling exists
- failure cases are considered

Avoid fake optimistic behavior without recovery logic.

---

# Persistence Rules

Persist state only when necessary.

Appropriate persistence examples:
- auth tokens
- theme preference
- language settings
- user preferences

Avoid persisting:
- temporary UI state
- large transient datasets
- sensitive information insecurely

---

# Local Storage Rules

Local storage usage must:
- remain minimal
- be centralized
- handle invalid data safely

Never:
- trust local storage blindly
- store sensitive secrets insecurely

---

# Performance Rules

Avoid:
- excessive rerenders
- unnecessary global subscriptions
- deeply nested reactive state
- giant monolithic stores

Prefer:
- localized updates
- selective subscriptions
- efficient rendering boundaries

---

# State Ownership Rules

Every piece of state should have a clear owner.

Ask:
- who owns this state?
- who consumes it?
- how far does it need to travel?
- should this truly be shared?

Avoid unclear ownership.

---

# Feature State Isolation

Feature-specific state should stay inside its feature whenever possible.

Avoid:
- leaking feature state globally
- cross-feature coupling
- shared stores for unrelated concerns

---

# Naming Rules

State variables should be explicit and readable.

Good:

```tsx
isLoading
selectedUser
searchQuery
currentStep
```

Avoid:

```tsx
data
value
temp
stuff
state
```

---

# AI-Specific Rules

When generating state logic:
- choose the simplest viable solution
- avoid unnecessary abstractions
- avoid premature global state
- preserve predictable data flow
- minimize hidden side effects
- avoid excessive context usage

Do NOT introduce state libraries unless justified by project complexity.

---

# Anti-Patterns To Avoid

Never introduce:
- giant global stores
- deeply nested state trees
- duplicated state
- hidden mutations
- effect-driven synchronization chains
- unnecessary context providers
- prop drilling chaos
- reducer overengineering
- server state mixed with UI state
- excessive derived state storage

Avoid “state spaghetti”.

---

# Final Rule

Good state management should feel:
- predictable
- localized
- understandable
- maintainable
- minimally complex

Another developer should quickly understand:
- where state lives
- why it exists
- who owns it
- how it flows through the application