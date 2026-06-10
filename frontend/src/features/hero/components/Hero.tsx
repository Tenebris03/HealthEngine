import { useTranslation } from 'react-i18next';
import styles from './Hero.module.css';

export function Hero() {
  const { t } = useTranslation();
  const { t: tHero } = useTranslation('hero');

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('brand')}</h1>
        <p className={styles.tagline}>{tHero('tagline')}</p>
      </div>
    </section>
  );
}
