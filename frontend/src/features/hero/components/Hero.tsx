import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';

export function Hero() {
  const { t } = useTranslation();
  const { t: tHero } = useTranslation('hero');
  const navigate = useNavigate();

  return (
    <motion.section
      className={styles.hero}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' as const }}
    >
      <div className={styles.container}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' as const }}
        >
          {t('brand')}
        </motion.h1>
        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' as const }}
        >
          {tHero('tagline')}
        </motion.p>
        <motion.button
          className={styles.cta}
          onClick={() => navigate('/calorie-tracking')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' as const }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
        >
          {t('cta.getStarted')}
        </motion.button>
      </div>
    </motion.section>
  );
}
