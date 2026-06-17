# First-Time Onboarding Flow

## Problem

When a user first registers, there are no goals in the DB. Instead of dropping them into an empty dashboard, we should guide them through setting up their profile with a beautiful, animated onboarding.

## Requirements

- [ ] After signup, check if user has `age` set. If not (first-time user), redirect to `/onboarding`
- [ ] **Step 1: Basic Info**
  - Ask: age, weight, height
  - Beautiful input cards with icons
  - "Continue" button
- [ ] **Step 2: BMR Calculation**
  - Play a fancy "thinking" animation (spinning brain / gears / pulsing heart)
  - Show a loading bar that fills up
  - "Calculating your Basal Metabolic Rate..."
  - After 1.5-2 seconds, reveal the calculated BMR number in a big animated card
- [ ] **Step 3: Goal Selection**
  - "What's your goal?"
  - Three animated button cards:
    - **Lose Weight** (fire icon, red tint)
    - **Maintain Weight** (balance icon, blue tint)
    - **Gain Weight** (muscle icon, green tint)
  - Each card expands on hover with a brief explanation
- [ ] **Step 4: Final Summary**
  - Show calculated targets:
    - BMR: 1750 kcal
    - Daily Calories: 1500 kcal (lose) / 2000 kcal (maintain) / 2500 kcal (gain)
    - Protein: 120g | Carbs: 200g | Fat: 55g
    - Target weight and date if applicable
  - "Sounds good!" button persists everything to DB
  - After save, redirect to Calorie Tracking page

## Backend Changes

- [ ] No new endpoints needed — reuse `PATCH /api/auth/profile`
- [ ] Add BMR calculation helper (Mifflin-St Jeor equation)
- [ ] Macro calculation: protein 30%, carbs 45%, fat 25% (or similar)

## Misc

- [ ] Fallback default values if user skips onboarding
