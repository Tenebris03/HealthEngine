export function apiAuthHeader(token: string | null): Record<string, string> {
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export function getStoredToken(): string | null {
  return localStorage.getItem('auth_token');
}
