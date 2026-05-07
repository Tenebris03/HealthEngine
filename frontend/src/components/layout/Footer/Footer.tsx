import styles from './Footer.module.css'

const footerLinks = [
  { label: 'Privacy', href: '#privacy' },
  { label: 'Terms', href: '#terms' },
  { label: 'Support', href: '#support' },
]

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} HealthEngine. All rights reserved.
          </p>
        </div>

        <nav className={styles.nav} aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <a key={link.label} className={styles.navLink} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

