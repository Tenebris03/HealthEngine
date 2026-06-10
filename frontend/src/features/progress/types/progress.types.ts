export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';

export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: string;
  mealType: MealType;
  timestamp: Date;
}

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
