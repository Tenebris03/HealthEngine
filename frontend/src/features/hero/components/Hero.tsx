import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export function Hero() {
  const { t } = useTranslation();
  const { t: tHero } = useTranslation('hero');

  return (
    <motion.section
      className={styles.hero}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className={styles.container}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          {t('brand')}
        </motion.h1>
        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        >
          {tHero('tagline')}
        </motion.p>
      </div>
    </motion.section>
  );
}
