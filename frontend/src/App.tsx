import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage/HomePage';
import { CalorieTrackingPage } from '@/pages/CalorieTrackingPage/CalorieTrackingPage';
import { WeightTrackingPage } from '@/pages/WeightTrackingPage/WeightTrackingPage';
import { ProfilePage } from '@/pages/ProfilePage/ProfilePage';
import { LeaderboardPage } from '@/pages/LeaderboardPage/LeaderboardPage';
import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { OnboardingPage } from '@/pages/OnboardingPage/OnboardingPage';
import { AuthCallbackPage } from '@/pages/AuthCallbackPage/AuthCallbackPage';
import { AuthProvider } from '@/features/auth/AuthContext';
import { useAuth } from '@/features/auth/useAuth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <OnboardingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/calorie-tracking"
        element={
          <ProtectedRoute>
            <CalorieTrackingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/weight-tracking"
        element={
          <ProtectedRoute>
            <WeightTrackingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <LeaderboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
