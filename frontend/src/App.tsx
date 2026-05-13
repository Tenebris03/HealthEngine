import './App.css'
import { Header } from './components/layout/Header/Header'
import { Footer } from './components/layout/Footer/Footer'

function App() {
  return (
    <div className="app">
      <Header />

      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section animate-fade-in-up">
          <div className="container">
            <h1 className="hero-title">
              Welcome to <span className="accent">HealthEngine</span>
            </h1>
            <p className="hero-subtitle">
              Transform your health journey with intelligent nutrition tracking, personalized goals,
              and competitive leaderboards that keep you motivated.
            </p>
            <button className="btn-primary animate-glow">
              Get Started
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <h2 className="section-title">Key Features</h2>
            <div className="features-grid">
              {/* Feature 1: Set Nutrition Goals */}
              <div className="bento-cell animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                </div>
                <h3 className="feature-title">Set Nutrition Goals</h3>
                <p className="feature-description">
                  Define personalized nutrition targets based on your health objectives,
                  dietary preferences, and lifestyle. Track macros, calories, and micronutrients
                  with precision.
                </p>
              </div>

              {/* Feature 2: Leaderboard */}
              <div className="bento-cell animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.47.995-.99.99C7.2 16.92 4 13.87 4 9.5a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6c0 4.37-3.2 7.42-5.01 7.51-.52.005-.99-.45-.99-.99v-2.34"></path>
                    <path d="M9 11h6"></path>
                    <path d="M12 6v8"></path>
                  </svg>
                </div>
                <h3 className="feature-title">Leaderboard</h3>
                <p className="feature-description">
                  Compete with friends and the community in achieving nutrition milestones.
                  Climb the ranks, earn badges, and stay motivated through friendly competition
                  and shared achievements.
                </p>
              </div>

              {/* Feature 3: Track Progress */}
              <div className="bento-cell animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="feature-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                </div>
                <h3 className="feature-title">Track Progress</h3>
                <p className="feature-description">
                  Visualize your health journey with detailed analytics, progress charts,
                  and insightful reports. Monitor trends, identify patterns, and adjust
                  your goals for optimal results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <h2>Ready to Engine Your Health?</h2>
            <p>Join thousands of users who have transformed their lives with HealthEngine.</p>
            <button className="btn-primary btn-large">
              Start Your Journey
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App

