import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerSection}>
        <h3 className={styles.footerTitle}>{t('footer.product')}</h3>
        <a className={styles.footerLink} href="#features">
          {t('footer.features')}
        </a>
        <a className={styles.footerLink} href="#pricing">
          {t('footer.pricing')}
        </a>
        <a className={styles.footerLink} href="#api">
          {t('footer.api')}
        </a>
      </div>

      <div className={styles.footerSection}>
        <h3 className={styles.footerTitle}>{t('footer.company')}</h3>
        <a className={styles.footerLink} href="#about">
          {t('footer.about')}
        </a>
        <a className={styles.footerLink} href="#blog">
          {t('footer.blog')}
        </a>
        <a className={styles.footerLink} href="#careers">
          {t('footer.careers')}
        </a>
      </div>

      <div className={styles.footerSection}>
        <h3 className={styles.footerTitle}>{t('footer.support')}</h3>
        <a className={styles.footerLink} href="#help">
          {t('footer.helpCenter')}
        </a>
        <a className={styles.footerLink} href="#contact">
          {t('footer.contact')}
        </a>
        <a className={styles.footerLink} href="#privacy">
          {t('footer.privacy')}
        </a>
      </div>

      <div className={styles.footerSection}>
        <h3 className={styles.footerTitle}>{t('footer.followUs')}</h3>
        <div className={styles.socialIcons}>
          <a className={styles.socialIcon} href="#twitter" aria-label="Twitter">
            🐦
          </a>
          <a
            className={styles.socialIcon}
            href="#linkedin"
            aria-label="LinkedIn"
          >
            💼
          </a>
          <a
            className={styles.socialIcon}
            href="#instagram"
            aria-label="Instagram"
          >
            📷
          </a>
        </div>
      </div>

      <p className={styles.copyright}>{t('footer.copyright', { year })}</p>
    </footer>
  );
}
