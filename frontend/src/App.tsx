import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage/HomePage';
import { ProgressPage } from './pages/ProgressPage/ProgressPage';
import { GoalsPage } from './pages/GoalsPage/GoalsPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/goals" element={<GoalsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
