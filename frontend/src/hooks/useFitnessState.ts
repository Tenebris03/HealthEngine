import { useState, useMemo, useCallback } from 'react';
import type { FoodEntry } from '@/types/food';

export interface DailyTargets {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DailyTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface FitnessState {
  entries: FoodEntry[];
  targets: DailyTargets;
  totals: DailyTotals;
  percentages: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  addEntry: (entry: Omit<FoodEntry, 'id' | 'timestamp'>) => void;
  updateEntry: (id: string, entry: Partial<FoodEntry>) => void;
  deleteEntry: (id: string) => void;
  setTargets: (targets: DailyTargets) => void;
  remaining: DailyTotals;
}

const DEFAULT_TARGETS: DailyTargets = {
  calories: 2000,
  protein: 150,
  carbs: 250,
  fat: 65,
};

const SAMPLE_ENTRIES: FoodEntry[] = [
  {
    id: '1',
    name: 'Oatmeal with Berries',
    calories: 320,
    protein: 12,
    carbs: 54,
    fat: 6,
    portion: '80g',
    mealType: 'Breakfast',
    timestamp: new Date(),
  },
  {
    id: '2',
    name: 'Grilled Chicken Salad',
    calories: 450,
    protein: 45,
    carbs: 20,
    fat: 18,
    portion: '1 bowl',
    mealType: 'Lunch',
    timestamp: new Date(),
  },
  {
    id: '3',
    name: 'Greek Yogurt',
    calories: 150,
    protein: 15,
    carbs: 12,
    fat: 4,
    portion: '200g',
    mealType: 'Snacks',
    timestamp: new Date(),
  },
];

export function useFitnessState() {
  const [entries, setEntries] = useState<FoodEntry[]>(SAMPLE_ENTRIES);
  const [targets, setTargets] = useState<DailyTargets>(DEFAULT_TARGETS);

  const totals = useMemo<DailyTotals>(() => {
    return entries.reduce(
      (acc, entry) => ({
        calories: acc.calories + entry.calories,
        protein: acc.protein + entry.protein,
        carbs: acc.carbs + entry.carbs,
        fat: acc.fat + entry.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    );
  }, [entries]);

  const remaining = useMemo<DailyTotals>(
    () => ({
      calories: Math.max(targets.calories - totals.calories, 0),
      protein: Math.max(targets.protein - totals.protein, 0),
      carbs: Math.max(targets.carbs - totals.carbs, 0),
      fat: Math.max(targets.fat - totals.fat, 0),
    }),
    [targets, totals],
  );

  const percentages = useMemo(
    () => ({
      calories: Math.min(totals.calories / targets.calories, 1),
      protein: Math.min(totals.protein / targets.protein, 1),
      carbs: Math.min(totals.carbs / targets.carbs, 1),
      fat: Math.min(totals.fat / targets.fat, 1),
    }),
    [totals, targets],
  );

  const addEntry = useCallback((entry: Omit<FoodEntry, 'id' | 'timestamp'>) => {
    const newEntry: FoodEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setEntries((prev) => [...prev, newEntry]);
  }, []);

  const updateEntry = useCallback((id: string, updates: Partial<FoodEntry>) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry)),
    );
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  return {
    entries,
    targets,
    totals,
    percentages,
    addEntry,
    updateEntry,
    deleteEntry,
    setTargets,
    remaining,
  };
}
