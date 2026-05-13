import styles from './Header.module.css'

const headerLinks = [
  { label: 'Home', href: '#' },
  { label: 'Goals', href: '#goals' },
  { label: 'Leaderboard', href: '#leaderboard' },
  { label: 'Progress', href: '#progress' },
  { label: 'About', href: '#about' },
]

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        HealthEngine
      </div>

      <nav className={styles.nav}>
        {headerLinks.map((link) => (
          <a key={link.label} className={styles.navItem} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

