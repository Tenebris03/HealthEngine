import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage/HomePage';
import { DashboardPage } from '@/pages/DashboardPage/DashboardPage';
import { ProgressPage } from '@/pages/ProgressPage/ProgressPage';
import { GoalsPage } from '@/pages/GoalsPage/GoalsPage';
import { LeaderboardPage } from '@/pages/LeaderboardPage/LeaderboardPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
