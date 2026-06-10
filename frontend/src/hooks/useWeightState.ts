import { useState, useMemo, useCallback } from 'react';

export interface WeightEntry {
  id: string;
  weight: number;
  date: Date;
}

const SAMPLE_WEIGHTS: WeightEntry[] = [
  { id: '1', weight: 95, date: new Date('2024-01-01') },
  { id: '2', weight: 93.2, date: new Date('2024-02-01') },
  { id: '3', weight: 91.8, date: new Date('2024-03-01') },
  { id: '4', weight: 90.1, date: new Date('2024-04-01') },
  { id: '5', weight: 88.7, date: new Date('2024-05-01') },
  { id: '6', weight: 87.5, date: new Date('2024-06-01') },
];

export function useWeightState() {
  const [entries, setEntries] = useState<WeightEntry[]>(SAMPLE_WEIGHTS);
  const [targetWeight, setTargetWeight] = useState(80);

  const currentWeight = useMemo(
    () => entries[entries.length - 1]?.weight ?? 0,
    [entries],
  );

  const delta = useMemo(
    () => currentWeight - targetWeight,
    [currentWeight, targetWeight],
  );

  const addEntry = useCallback((weight: number) => {
    const entry: WeightEntry = {
      id: Date.now().toString(),
      weight,
      date: new Date(),
    };
    setEntries((prev) => [...prev, entry]);
  }, []);

  return {
    entries,
    currentWeight,
    targetWeight,
    delta,
    addEntry,
    setTargetWeight,
  };
}
