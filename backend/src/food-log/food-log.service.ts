import { Injectable } from '@nestjs/common';
import { CreateFoodEntryDto } from './dto/create-food-entry.dto';

export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: string;
  mealType: string;
  timestamp: Date;
}

@Injectable()
export class FoodLogService {
  private entries: FoodEntry[] = [];

  findAll(): FoodEntry[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.entries.filter((e) => e.timestamp >= today);
  }

  create(dto: CreateFoodEntryDto): FoodEntry {
    const entry: FoodEntry = {
      id: Date.now().toString(),
      ...dto,
      timestamp: new Date(),
    };
    this.entries.push(entry);
    return entry;
  }
}
