# UI_RULES.md
## Design System & UI Standards

This project must maintain a clean, modern, scalable, and production-grade UI.

The design philosophy is:
- elegant over flashy
- refined over trendy
- minimal without feeling empty
- modern without looking artificial
- performant without sacrificing polish

The UI should feel intentional, cohesive, and professional.

---

# Core Design Principles

## 1. Simplicity First
Prefer:
- clean layouts
- strong spacing
- visual hierarchy
- subtle polish
- restrained styling

Avoid:
- visual clutter
- unnecessary decorations
- excessive gradients
- loud colors
- oversized shadows
- gimmicky animations

Every visual element must serve a purpose.

---

## 2. Consistency Above All
All pages and components must feel like part of the same system.

Maintain consistency in:
- spacing
- typography
- border radius
- shadows
- colors
- hover behavior
- transitions
- component sizing
- layout patterns

Never invent one-off component styles unless absolutely necessary.

---

## 3. Scalable Layout Philosophy
The UI must scale beautifully across:
- small laptops
- ultrawide monitors
- tablets
- mobile devices

The application should NOT stretch endlessly on large monitors.

Prefer:
- centered layouts
- max-width containers
- balanced whitespace
- responsive scaling

Use content widths intentionally.

Recommended patterns:
- `max-width`
- container systems
- CSS grid
- flexible layouts

Avoid:
- edge-to-edge layouts everywhere
- giant unreadable text lines
- awkward empty space distribution

---

# Visual Style

## Color Philosophy
Use a restrained and professional color palette.

Prefer:
- neutral tones
- subtle contrast
- limited accent colors
- muted surfaces

Avoid:
- oversaturated colors
- rainbow palettes
- excessive gradients
- harsh contrast combinations

Accent colors should feel intentional and rare.

---

## Transparency & Glass Effects
Subtle transparency is allowed ONLY when:
- it improves visual layering
- performance remains good
- readability stays excellent

Use glassmorphism sparingly.

Avoid:
- heavy blur effects everywhere
- unreadable transparent surfaces
- excessive layered translucency

Performance and clarity are more important than visual effects.

---

# Typography Rules

## Typography Philosophy
Typography should feel:
- clean
- readable
- modern
- calm
- structured

Prefer:
- strong hierarchy
- consistent scaling
- generous line-height
- balanced spacing

Avoid:
- tiny text
- excessive font weights
- inconsistent heading sizes
- cramped spacing

---

## Font Usage
Use the project's primary font consistently.

Avoid introducing multiple fonts unless explicitly required.

Typography should rely on:
- spacing
- weight
- size
- contrast

NOT decorative styling.

---

# Spacing System

Use a consistent spacing scale throughout the application.

Prefer predictable spacing increments.

Maintain:
- generous padding
- comfortable gaps
- breathing room between sections

Avoid:
- cramped layouts
- inconsistent spacing
- arbitrary margins
- magic-number positioning

Whitespace is part of the design.

---

# Component Design

## Buttons
Buttons should:
- feel tactile
- have clear states
- remain readable
- avoid excessive styling

Prefer:
- subtle hover effects
- smooth transitions
- restrained shadows
- accessible contrast

Avoid:
- glowing buttons
- exaggerated gradients
- oversized animations
- inconsistent padding

---

## Cards & Surfaces
Cards should:
- separate content cleanly
- use subtle elevation
- maintain consistent padding
- avoid excessive depth

Prefer:
- soft borders
- subtle backgrounds
- minimal shadows

Avoid:
- deeply nested card structures
- stacked shadows
- noisy visual hierarchy

---

## Forms
Forms must prioritize:
- clarity
- accessibility
- usability

Inputs should:
- have clear focus states
- maintain consistent sizing
- provide sufficient padding
- remain readable on all devices

Avoid:
- tiny click targets
- inconsistent field heights
- unclear validation states

---

# Responsiveness

## Mobile-First Mindset
The UI must work naturally on mobile devices.

Layouts should adapt smoothly without hacks.

Prefer:
- flexible containers
- wrapping layouts
- responsive typography
- scalable spacing

Avoid:
- horizontal scrolling
- hardcoded widths
- fixed-height layouts
- viewport hacks

---

## Large Screen Handling
On large displays:
- maintain readable content width
- preserve visual balance
- avoid stretched interfaces

Use:
- max-width containers
- section constraints
- multi-column layouts when appropriate

The app should feel designed for large screens, not merely expanded.

---

# Motion & Animation

## Animation Philosophy
Animations should:
- support usability
- improve perceived quality
- feel subtle and responsive

Prefer:
- short transitions
- smooth easing
- lightweight animations

Avoid:
- excessive motion
- distracting effects
- long animation chains
- animations that delay interaction

---

## Performance First
Animation must never hurt performance.

Avoid:
- expensive blur animations
- large repaints
- unnecessary transforms
- layout-thrashing animations

Prefer GPU-friendly transitions.

---

# Performance Standards

UI quality includes performance.

Prioritize:
- fast rendering
- low layout shift
- efficient CSS
- minimal bundle size
- responsive interactions

Avoid:
- unnecessary libraries
- bloated UI frameworks
- deeply nested DOM trees
- excessive re-renders caused by styling patterns

---

# Accessibility Rules

Accessibility is mandatory.

All UI must:
- support keyboard navigation
- maintain proper contrast
- include visible focus states
- use semantic HTML
- support screen readers

Never remove accessibility features for aesthetics.

---

# Styling Architecture

## Existing CSS Must Be Respected
Do NOT:
- randomly delete existing styles
- replace the styling system unnecessarily
- introduce conflicting approaches

Prefer:
- extending existing styles
- reusing utilities
- maintaining structure consistency

---

## Avoid Style Chaos
Do not mix:
- Tailwind
- CSS Modules
- styled-components
- inline styles

unless the project already intentionally uses them together.

Maintain a single coherent styling strategy.

---

# Design Anti-Patterns To Avoid

Never introduce:
- giant hero sections with no purpose
- oversized padding everywhere
- excessive blur
- glassmorphism overload
- neumorphism
- floating random gradients
- inconsistent border radius
- inconsistent shadows
- random animation styles
- poor contrast
- inaccessible text
- cluttered dashboards
- crowded navigation
- giant modals
- hidden important actions
- misleading interactions

Avoid “AI-generated UI” patterns.

---

# UX Standards

The UI should feel:
- fast
- calm
- intuitive
- trustworthy
- deliberate

Users should immediately understand:
- hierarchy
- navigation
- interaction states
- important actions

Good UX is invisible.

---

# Final Rule

Every design decision must answer:
- Does this improve usability?
- Does this improve clarity?
- Does this improve consistency?
- Does this improve perceived quality?
- Is this worth the complexity/performance cost?

If not, do not add it.