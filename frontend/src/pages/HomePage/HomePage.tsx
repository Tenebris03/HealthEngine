import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/useAuth';
import { authApi } from '@/services/api';
import { Hero } from '@/features/hero/components/Hero';
import { KeyFeatures } from '@/features/key-features/components/KeyFeatures';

export function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;
    authApi
      .me()
      .then((u) =>
        navigate(u.age ? '/calorie-tracking' : '/onboarding', {
          replace: true,
        }),
      )
      .catch(() => {});
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          color: 'var(--color-text-muted)',
        }}
      >
        Redirecting...
      </div>
    );
  }

  return (
    <>
      <Hero />
      <KeyFeatures />
    </>
  );
}
