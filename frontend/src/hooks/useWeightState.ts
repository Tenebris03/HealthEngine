import { useState, useMemo, useCallback, useEffect } from 'react';
import { weightLogApi } from '@/services/api';

export interface WeightEntry {
  id: string;
  weight: number;
  date: Date;
}

function mapApiWeight(entry: { id: number; weightKg: number; timestamp: string }): WeightEntry {
  return {
    id: String(entry.id),
    weight: entry.weightKg,
    date: new Date(entry.timestamp),
  };
}

export function useWeightState() {
  const [entries, setEntries] = useState<WeightEntry[]>([]);
  const [targetWeight, setTargetWeight] = useState(80);
  const [loading, setLoading] = useState(true);

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await weightLogApi.getAll();
      setEntries(data.map(mapApiWeight));
    } catch {
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const currentWeight = useMemo(
    () => entries[entries.length - 1]?.weight ?? 0,
    [entries],
  );

  const delta = useMemo(
    () => currentWeight - targetWeight,
    [currentWeight, targetWeight],
  );

  const addEntry = useCallback(async (weight: number) => {
    const created = await weightLogApi.create({ weightKg: weight });
    setEntries((prev) => [...prev, mapApiWeight(created)]);
  }, []);

  return {
    entries,
    currentWeight,
    targetWeight,
    delta,
    addEntry,
    setTargetWeight,
    loading,
  };
}
