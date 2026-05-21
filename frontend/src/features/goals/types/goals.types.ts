export interface WeightTarget {
  startDate: Date
  startWeight: number
  currentWeight: number
  targetWeight: number
  targetDate: Date
}

export interface MacroTarget {
  protein: number
  carbs: number
  fat: number
  calories: number
}

export interface GoalConfig {
  weight: WeightTarget
  macros: MacroTarget
}
