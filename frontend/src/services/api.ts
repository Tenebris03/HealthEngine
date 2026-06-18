const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...(options?.headers as Record<string, string>),
  };

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      if (body.message)
        detail = Array.isArray(body.message)
          ? body.message.join(', ')
          : body.message;
    } catch {
      /* ignore parse failure */
    }
    throw new ApiError(res.status, detail);
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
  remove: (id: number) =>
    request<void>(`/api/food-log/${id}`, { method: 'DELETE' }),
};

export interface UserProfile {
  id: number;
  email: string;
  name: string | null;
  avatar: string | null;
  age: number | null;
  heightCm: number | null;
  targetWeightKg: number | null;
  dailyCalorieGoal: number | null;
}

export const authApi = {
  me: () => request<UserProfile>('/api/auth/me'),
  updateProfile: (data: Partial<UserProfile>) =>
    request<UserProfile>('/api/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
};

export interface LeaderboardUser {
  rank: number;
  id: number;
  username: string;
  avatar: string;
  points: number;
  isCurrentUser: boolean;
}

export const leaderboardApi = {
  getAll: () => request<LeaderboardUser[]>('/api/leaderboard'),
};

export const weightLogApi = {
  getAll: () => request<ApiWeightLog[]>('/api/weight-log'),
  create: (data: CreateWeightLogPayload) =>
    request<ApiWeightLog>('/api/weight-log', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  remove: (id: number) =>
    request<void>(`/api/weight-log/${id}`, { method: 'DELETE' }),
};
