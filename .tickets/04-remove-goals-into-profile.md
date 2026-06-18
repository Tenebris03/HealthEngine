# Remove Goals Tab, Integrate Goals into Profile

## Problem

The Goals tab is "hella cursed" — too much typing for start weight, current weight, target weight, target date, daily calories, target macros. Same for Target Macros. It feels overwhelming.

## Requirements

- [ ] Remove "Goals" from the nav tabs
- [ ] In the Profile page, add three sections:
  1. **Edit Profile** — avatar, name, email (readonly)
  2. **Edit Goals** — simplified: target weight, target date, daily calorie goal, activity level selector
  3. **Logout** button
- [ ] Goals are stored in the User model (already has `targetWeightKg`, `dailyCalorieGoal` fields)
- [ ] No more separate GoalsPage or Goals nav link
- [ ] Remove EditGoalsModal, WeightTargetCard, MacroTargetCard components (or simplify heavily)
- [ ] Remove goals locale files

## Profile Page Layout

```
+------------------------------------------+
| Profile                                   |
+------------------------------------------+
| [Avatar] (click to change)               |
| Name: _______                            |
| Email: user@example.com (readonly)       |
+------------------------------------------+
| ──── Edit Goals ──────────────────────── |
| Target Weight: ___ kg                     |
| Target Date: [date picker]                |
| Daily Calorie Goal: ___ kcal              |
| Activity Level: [Sedentary/Light/...]    |
+------------------------------------------+
| [Logout] button                           |
+------------------------------------------+
```
