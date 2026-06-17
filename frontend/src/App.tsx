import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage/HomePage';
import { DashboardPage } from '@/pages/DashboardPage/DashboardPage';
import { ProfilePage } from '@/pages/ProfilePage/ProfilePage';
import { GoalsPage } from '@/pages/GoalsPage/GoalsPage';
import { LeaderboardPage } from '@/pages/LeaderboardPage/LeaderboardPage';
import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { AuthCallbackPage } from '@/pages/AuthCallbackPage/AuthCallbackPage';
import { AuthProvider } from '@/features/auth/AuthContext';
import { useAuth } from '@/features/auth/useAuth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <HomePage />
        }
      />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
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
        path="/goals"
        element={
          <ProtectedRoute>
            <GoalsPage />
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
