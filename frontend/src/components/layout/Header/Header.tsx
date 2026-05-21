import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

const headerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Goals', path: '/goals' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Progress', path: '/progress' },
  { label: 'About', path: '/about' },
]

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => handleNavigate('/')}>
        HealthEngine
      </div>

      <nav className={styles.nav}>
        {headerLinks.map((link) => (
          <button
            key={link.label}
            className={`${styles.navItem} ${location.pathname === link.path ? styles.navItemActive : ''}`}
            onClick={() => handleNavigate(link.path)}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </header>
  )
}

