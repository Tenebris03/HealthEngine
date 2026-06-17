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
