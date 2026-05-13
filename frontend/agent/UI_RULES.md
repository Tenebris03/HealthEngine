# UI_RULES.md
## Design System: High-Fidelity & Cinematic Standards

This project maintains an immersive, high-impact, and high-fidelity UI. 
The design philosophy is:
- cinematic over static
- immersive over contained
- kinetic over passive
- bold without being cluttered
- cutting-edge without being gimmicky

The UI should feel like a living, breathing digital environment.

---

# Core Design Principles

## 1. Immersive Canvas
The interface is not a document; it is a stage.
- **Full-Viewport Focus:** Prioritize `100vw` and `100vh` layouts. 
- **The "Full Stage" Rule:** Backgrounds, interactive shaders, or high-definition media should fill the visual field.
- **Layered Depth:** Use Z-axis layering (glassmorphism, backdrop blurs, and shadows) to create a physical sense of space.

## 2. Kinetic Experience
Motion is the primary medium of communication.
- **Orchestrated Entry:** Every element must have a choreographed entry (staggered fades, 3D transforms, or spring-based shifts).
- **Magnetic Interaction:** Interactive elements should feel "attracted" to the cursor or respond with tactile physics.
- **View Transitions:** Page and state changes should feel like a camera move, not a hard refresh.

## 3. High-Contrast Focus
- **Visual Anchors:** Key actions (e.g., "Get Started") must be impossible to miss, using vibrant accents or dynamic gradients.
- **Dominant Hierarchy:** Use massive "Display" typography to command attention and guide the narrative.

---

# Layout & Responsiveness

## 1. Edge-to-Edge Fluidity
Avoid "safe" max-widths that leave empty margins on large screens.
- **Ultrawide Optimization:** On large monitors, utilize the full horizontal span with multi-column grid systems or expansive media.
- **Viewport Units:** Use `vh`, `vw`, `vmin`, and `vmax` to ensure the layout feels custom-fit to every screen size.

## 2. Bento-Box Geometry
For functional sections, use grouped "cells" with:
- Consistent large border radii (e.g., 24px - 32px).
- Subtle inner glows and outer "soft" elevation.
- Interactive hover states that expand or illuminate the cell.

---

# Visual Style & Motion

## Color & Light
- **Vibrant Accents:** Use a core palette of deep neutrals paired with high-energy accent colors (electric blues, vivid purples, or neon greens).
- **Lighting Effects:** Use radial gradients as "spotlights" to naturally draw the eye toward interaction points.

## Typography
- **Display Weights:** Use heavy, expressive fonts for headings.
- **Fluid Type:** Font sizes should scale dynamically based on viewport width (using `clamp()`).
- **Letter Spacing:** Tighter tracking for large headings to create a "premium" feel.

## Animation Specs
- **Easing:** Never use `linear`. Use custom cubic-beziers or spring physics (e.g., `backOut`, `expoOut`).
- **Duration:** Keep micro-interactions fast (150-300ms) and entrance animations deliberate (500-800ms).
- **GPU Acceleration:** Only animate `transform` and `opacity` to maintain 60+ FPS.

---

# Component Design

## Buttons (The "Hero" Component)
- **Tactile Response:** Buttons should scale down slightly on click and glow on hover.
- **Glass Effects:** Use `backdrop-filter: blur()` for secondary buttons to maintain the layered aesthetic.
- **Clear CTA:** The primary "Get Started" button should be the brightest, most animated element on the screen.

## Cards & Surfaces
- **Interactive Depth:** Cards should "lift" or "tilt" (3D parallax) based on mouse position.
- **Border Gradients:** Use subtle gradient strokes to define edges on dark backgrounds.

---

# Performance & Accessibility

- **Motion Reduction:** Respect `prefers-reduced-motion` by simplifying animations for those users.
- **Accessibility:** High visual impact must not sacrifice keyboard navigation or screen reader compatibility.
- **LCP Optimization:** Ensure large immersive assets are optimized (WebP, AVIF) to maintain instant load feel.

---

# Final Rule
Every design decision must answer:
1. Does this feel alive?
2. Does this command attention?
3. Is it optimized for the full screen?
4. Is the performance fluid (60FPS)?