import styles from './Header.module.css'
import logoImg from '../../../assets/hero.png'

const headerLinks = [
  { label: 'Home', href: '#' },
  { label: 'Calorie Tracking', href: '#calorie-tracking' },
  { label: 'Progress', href: '#progress' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#" aria-label="Go to homepage">
          <img className={styles.logo} src={logoImg} alt="" width={32} height={32} />
          <span className={styles.brandText}>HealthEngine</span>
        </a>

        <nav className={styles.nav} aria-label="Primary navigation">
          {headerLinks.map((link) => (
            <a key={link.label} className={styles.navLink} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

