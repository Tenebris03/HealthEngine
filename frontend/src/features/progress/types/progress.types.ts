import type { FoodEntry } from '@/types/food';
export type { FoodEntry, MealType } from '@/types/food';

export interface DailyProgress {
  date: Date;
  entries: FoodEntry[];
  targets: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}
