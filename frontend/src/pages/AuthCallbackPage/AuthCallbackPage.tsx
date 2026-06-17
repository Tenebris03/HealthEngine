import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/features/auth/useAuth';

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');
    const email = searchParams.get('email');
    const name = searchParams.get('name');
    const avatar = searchParams.get('avatar');

    if (token && userId && email) {
      login(token, { id: Number(userId), email, name, avatar });
      navigate('/calorie-tracking', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [searchParams, login, navigate]);

  return (
    <div
      style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        color: 'var(--color-text-secondary)',
      }}
    >
      <p>Signing you in...</p>
    </div>
  );
}
