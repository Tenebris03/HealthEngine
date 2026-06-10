import { useTranslation } from 'react-i18next';
import styles from './KeyFeatures.module.css';

function NutritionGoalsIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>
  );
}

function LeaderboardIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 14.66V17c0 .55-.47.995-.99.99C7.2 16.92 4 13.87 4 9.5a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6c0 4.37-3.2 7.42-5.01 7.51-.52.005-.99-.45-.99-.99v-2.34"></path>
      <path d="M9 11h6"></path>
      <path d="M12 6v8"></path>
    </svg>
  );
}

function TrackProgressIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  );
}

const features = [
  {
    icon: <NutritionGoalsIcon />,
    titleKey: 'setNutritionGoals.title' as const,
    descKey: 'setNutritionGoals.description' as const,
  },
  {
    icon: <LeaderboardIcon />,
    titleKey: 'leaderboard.title' as const,
    descKey: 'leaderboard.description' as const,
  },
  {
    icon: <TrackProgressIcon />,
    titleKey: 'trackProgress.title' as const,
    descKey: 'trackProgress.description' as const,
  },
];

export function KeyFeatures() {
  const { t } = useTranslation('key-features');

  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className={styles.sectionTitle}>{t('title')}</h2>
        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.titleKey} className={styles.card}>
              <div className={styles.cardBorder}></div>
              <div className={styles.cardContent}>
                <div className={styles.icon}>{feature.icon}</div>
                <h3 className={styles.cardTitle}>{t(feature.titleKey)}</h3>
                <p className={styles.cardDescription}>{t(feature.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
