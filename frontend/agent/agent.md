# HealthEngine — Agent Instructions

## 1) Project Focus
This repository builds **HealthEngine**, primarily for:
- **Nutrition tracking**
- **Calorie tracking**
- Macro nutrients (e.g., **protein, carbohydrates, fat**) and related nutrition information

Core user journeys (high level):
- Log meals and foods
- View daily/weekly summaries of calories and macros
- Search/browse foods (start with a seeded dataset; expand later if needed)
- Edit/delete logged entries

## 2) Technology Stack (Required)
- **Frontend:** React with **Vite**
- **Backend:** **NestJS**
- **Styling/UI Direction:** **Material Design 3 for Web**

Implementation guidance:
- Prefer **TypeScript** everywhere.
- Keep frontend/backend API contracts consistent.

## 3) Material Design 3 for Web (Must-Have)
All UI should align with **Material Design 3 for Web** patterns:
- Use M3 concepts for color/theming (light/dark, accessible contrast)
- Follow M3 typography hierarchy (label/body/title/display)
- Use M3 component patterns (cards/surfaces, chips, dialogs, input fields, etc.)
- Ensure predictable UI states (loading, empty, error, success)
- Accessibility requirements:
  - keyboard navigation
  - clear focus states
  - appropriate aria labels

## 4) Architecture & Module Boundaries
### Frontend (React/Vite)
- Organize by **domain features** (not only routes).
- Separate concerns:
  - UI components (presentational)
  - feature modules (containers/hooks)
  - API client/data access
  - state management (if used)

### Backend (NestJS)
- Use a layered/module approach:
  - controllers (HTTP)
  - services (business logic)
  - repositories/data access (if needed)
  - DTOs + validation

## 5) Domain Concepts (Recommended)
- **Food**: canonical nutrition per serving
- **Serving**: portion representation (e.g., grams/units)
- **Meal**: grouping of food items for a time period
- **FoodLog** (or similar): a user's logged food quantity/serving
- **DailySummary**: computed view (persisted or computed-on-read)

## 6) API & Validation Conventions (Required)
- REST-style endpoints are acceptable (unless GraphQL is explicitly selected).
- Use DTOs for request/response shapes.
- Validate inputs using NestJS validation conventions.
- Return consistent error formats.
- Support pagination/filtering for list endpoints where relevant.

## 7) Development Conventions
- Keep codebase readable and testable.
- Add tests for critical logic:
  - nutrition calculations (calories/macros per serving and for meals)
  - summary calculations
- Use environment-based configuration (dev/test/prod) for backend.

## 8) Planned Deliverables (After Scaffolding)
- Backend endpoints for foods, servings, and logs
- Frontend flows:
  - Add food/meal logging UI
  - Summary dashboards (daily/weekly)
  - Edit/delete logged entries
- Material Design 3-aligned theming and component styling

## 9) Non-Goals (For Now)
- Complex community/social features
- Fitness wearables integrations (unless requested later)
- ML-based recommendations

---
If any requirement conflicts with these instructions, update implementation to follow the **Material Design 3 for Web** direction first, then satisfy the functional requirement.

