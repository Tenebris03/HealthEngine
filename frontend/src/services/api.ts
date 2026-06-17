const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    throw new ApiError(res.status, `API error: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export interface ApiFoodEntry {
  id: number;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: string;
  portion: number;
  createdAt: string;
}

export interface CreateFoodEntryPayload {
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: string;
  portion?: number;
}

export interface ApiWeightLog {
  id: number;
  weightKg: number;
  timestamp: string;
}

export interface CreateWeightLogPayload {
  weightKg: number;
}

export const foodLogApi = {
  getAll: () => request<ApiFoodEntry[]>('/api/food-log'),
  create: (data: CreateFoodEntryPayload) =>
    request<ApiFoodEntry>('/api/food-log', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const weightLogApi = {
  getAll: () => request<ApiWeightLog[]>('/api/weight-log'),
  create: (data: CreateWeightLogPayload) =>
    request<ApiWeightLog>('/api/weight-log', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
