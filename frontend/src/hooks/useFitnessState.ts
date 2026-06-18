import { useState, useMemo, useCallback, useEffect } from 'react';
import type { FoodEntry } from '@/types/food';
import { foodLogApi } from '@/services/api';
import type { CreateFoodEntryPayload } from '@/services/api';

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
  addEntry: (entry: Omit<FoodEntry, 'id' | 'timestamp'>) => Promise<void>;
  updateEntry: (id: string, entry: Partial<FoodEntry>) => void;
  deleteEntry: (id: string) => Promise<void>;
  setTargets: (targets: DailyTargets) => void;
  remaining: DailyTotals;
  loading: boolean;
}

const DEFAULT_TARGETS: DailyTargets = {
  calories: 2000,
  protein: 150,
  carbs: 250,
  fat: 65,
};

function mapApiEntry(entry: { id: number; description: string; calories: number; protein: number; carbs: number; fat: number; mealType: string; portion: number; createdAt: string }): FoodEntry {
  return {
    id: String(entry.id),
    name: entry.description,
    calories: entry.calories,
    protein: entry.protein,
    carbs: entry.carbs,
    fat: entry.fat,
    portion: String(entry.portion),
    mealType: entry.mealType as FoodEntry['mealType'],
    timestamp: new Date(entry.createdAt),
  };
}

function mapToPayload(entry: Omit<FoodEntry, 'id' | 'timestamp'>): CreateFoodEntryPayload {
  return {
    description: entry.name,
    calories: entry.calories,
    protein: entry.protein,
    carbs: entry.carbs,
    fat: entry.fat,
    mealType: entry.mealType,
    portion: Number(entry.portion) || 1,
  };
}

export function useFitnessState(): FitnessState {
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [targets, setTargets] = useState<DailyTargets>(DEFAULT_TARGETS);
  const [loading, setLoading] = useState(true);

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await foodLogApi.getAll();
      setEntries(data.map(mapApiEntry));
    } catch {
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

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

  const addEntry = useCallback(async (entry: Omit<FoodEntry, 'id' | 'timestamp'>) => {
    const payload = mapToPayload(entry);
    const created = await foodLogApi.create(payload);
    setEntries((prev) => [mapApiEntry(created), ...prev]);
  }, []);

  const updateEntry = useCallback((id: string, updates: Partial<FoodEntry>) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry)),
    );
  }, []);

  const deleteEntry = useCallback(async (id: string) => {
    await foodLogApi.remove(Number(id));
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
    loading,
  };
}
