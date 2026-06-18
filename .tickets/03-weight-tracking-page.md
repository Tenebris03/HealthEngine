# Create Weight Tracking Tab with Beautiful Timeline

## Problem

Weight tracking is buried below the food log on the dashboard. Users tracking weight want a dedicated, focused view.

## Requirements

- [ ] New nav tab called "Weight Tracking"
- [ ] **Beautiful timeline** showing weight entries chronologically
- [ ] Each entry shows: date, weight (kg), daily change delta (small arrow up/down)
- [ ] Line chart at the top (sparkline or full chart)
- [ ] "Add Weight" form always visible at the top (quick input: weight number + date picker optional)
- [ ] Display: current weight, trend (gaining/losing), total change since start
- [ ] Animated entry cards with framer-motion

## Layout

```
+------------------------------------------+
| Weight Tracking            [+] Add Weight|
+------------------------------------------+
| [Line Chart — weight over time]          |
| Current: 78.5 kg | Trend: -0.3 kg/week  |
| Total change: -2.5 kg                    |
+------------------------------------------+
| Timeline:                                 |
| ─────────────────────────────────────    |
| Jun 17   78.5 kg  ▼ -0.2 kg              |
| Jun 16   78.7 kg  ▲ +0.1 kg              |
| Jun 15   78.6 kg  ▼ -0.3 kg              |
| Jun 14   78.9 kg  — 0.0 kg               |
+------------------------------------------+
```
