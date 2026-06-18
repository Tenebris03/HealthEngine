# Rename Dashboard → Calorie Tracking & Restructure Layout

## Problem

The dashboard looks dated. Weight tracking is below the food log even though people wouldn't look there first. The "Add Food" button is buried in the food log section.

## Requirements

- [ ] Rename nav tab "Dashboard" → "Calorie Tracking"
- [ ] Keep the calorie ring + macro tickers at the top
- [ ] Move the **food log to the right side** of the page (side panel / column layout)
- [ ] Make the **"Add Food" button always visible** (floating FAB or prominent top button)
- [ ] Remove weight tracker from this page (moves to new Weight Tracking tab)

## Layout

```
+------------------------------------------+
| Calorie Tracking                          |
+------------------------------------------+
| [Calorie Ring] [Macro: Protein]          |
|                [Macro: Carbs]            |
|                [Macro: Fat]              |
| [+] Add Food (always visible)            |
+------------------------------------------+
| Food Log (right column / side panel)     |
| - Breakfast                               |
|   - Eggs (250 kcal)                       |
| - Lunch                                   |
|   - Chicken (400 kcal)                   |
+------------------------------------------+
```
