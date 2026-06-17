import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/features/auth/useAuth';

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');
    const email = searchParams.get('email');

    if (token && userId && email) {
      login(token, { id: Number(userId), email });
      navigate('/dashboard', { replace: true });
    } else {
      setError('Authentication failed — missing parameters.');
    }
  }, [searchParams, login, navigate]);

  if (error) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
      <p>Signing you in...</p>
    </div>
  );
}
