import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className={styles.footer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className={styles.footerSection}>
        <h3 className={styles.footerTitle}>{t('footer.product')}</h3>
        <motion.a
          className={styles.footerLink}
          href="#features"
          whileHover={{ x: 3 }}
        >
          {t('footer.features')}
        </motion.a>
        <motion.a
          className={styles.footerLink}
          href="#pricing"
          whileHover={{ x: 3 }}
        >
          {t('footer.pricing')}
        </motion.a>
        <motion.a
          className={styles.footerLink}
          href="#api"
          whileHover={{ x: 3 }}
        >
          {t('footer.api')}
        </motion.a>
      </div>

      <div className={styles.footerSection}>
        <h3 className={styles.footerTitle}>{t('footer.company')}</h3>
        <motion.a
          className={styles.footerLink}
          href="#about"
          whileHover={{ x: 3 }}
        >
          {t('footer.about')}
        </motion.a>
        <motion.a
          className={styles.footerLink}
          href="#blog"
          whileHover={{ x: 3 }}
        >
          {t('footer.blog')}
        </motion.a>
        <motion.a
          className={styles.footerLink}
          href="#careers"
          whileHover={{ x: 3 }}
        >
          {t('footer.careers')}
        </motion.a>
      </div>

      <div className={styles.footerSection}>
        <h3 className={styles.footerTitle}>{t('footer.support')}</h3>
        <motion.a
          className={styles.footerLink}
          href="#help"
          whileHover={{ x: 3 }}
        >
          {t('footer.helpCenter')}
        </motion.a>
        <motion.a
          className={styles.footerLink}
          href="#contact"
          whileHover={{ x: 3 }}
        >
          {t('footer.contact')}
        </motion.a>
        <motion.a
          className={styles.footerLink}
          href="#privacy"
          whileHover={{ x: 3 }}
        >
          {t('footer.privacy')}
        </motion.a>
      </div>

      <div className={styles.footerSection}>
        <h3 className={styles.footerTitle}>{t('footer.followUs')}</h3>
        <div className={styles.socialIcons}>
          <motion.a
            className={styles.socialIcon}
            href="#twitter"
            aria-label="Twitter"
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            🐦
          </motion.a>
          <motion.a
            className={styles.socialIcon}
            href="#linkedin"
            aria-label="LinkedIn"
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            💼
          </motion.a>
          <motion.a
            className={styles.socialIcon}
            href="#instagram"
            aria-label="Instagram"
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            📷
          </motion.a>
        </div>
      </div>

      <p className={styles.copyright}>{t('footer.copyright', { year })}</p>
    </motion.footer>
  );
}
