import styles from './Footer.module.css'

const footerSections = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'API', href: '#api' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Blog', href: '#blog' },
      { label: 'Careers', href: '#careers' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#help' },
      { label: 'Contact', href: '#contact' },
      { label: 'Privacy', href: '#privacy' },
    ],
  },
]

export function Footer() {
  return (
    <footer className={styles.footer}>
      {footerSections.map((section) => (
        <div key={section.title} className={styles.footerSection}>
          <h3 className={styles.footerTitle}>{section.title}</h3>
          {section.links.map((link) => (
            <a key={link.label} className={styles.footerLink} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      ))}

      <div className={styles.footerSection}>
        <h3 className={styles.footerTitle}>Follow Us</h3>
        <div className={styles.socialIcons}>
          <a className={styles.socialIcon} href="#twitter" aria-label="Twitter">
            🐦
          </a>
          <a className={styles.socialIcon} href="#linkedin" aria-label="LinkedIn">
            💼
          </a>
          <a className={styles.socialIcon} href="#instagram" aria-label="Instagram">
            📷
          </a>
        </div>
      </div>

      <p className={styles.copyright}>
        © {new Date().getFullYear()} HealthEngine. All rights reserved.
      </p>
    </footer>
  )
}

