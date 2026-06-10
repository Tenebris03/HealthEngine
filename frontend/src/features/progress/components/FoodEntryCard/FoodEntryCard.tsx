import { useTranslation } from 'react-i18next';
import styles from './FoodEntryCard.module.css';
import type { FoodEntry } from '../../types/progress.types';

interface FoodEntryCardProps {
  entry: FoodEntry;
  onEdit: (entry: FoodEntry) => void;
  onDelete: (id: string) => void;
}

export function FoodEntryCard({ entry, onEdit, onDelete }: FoodEntryCardProps) {
  const { t } = useTranslation('global');

  return (
    <div className={styles.card}>
      <button
        className={styles.cardContent}
        onClick={() => onEdit(entry)}
        aria-label={t('common.editEntry', { name: entry.name })}
      >
        <div className={styles.cardInfo}>
          <h3 className={styles.cardName}>{entry.name}</h3>
          <p className={styles.cardPortion}>{entry.portion}</p>
        </div>
        <div className={styles.cardMacros}>
          <span className={styles.macroItem}>
            <span className={styles.macroValue}>{entry.calories}</span>
            <span className={styles.macroLabel}>{t('units.kcal')}</span>
          </span>
          <span className={styles.macroItem}>
            <span className={styles.macroValue}>
              {entry.protein}
              {t('units.g')}
            </span>
            <span className={styles.macroLabel}>protein</span>
          </span>
        </div>
      </button>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(entry.id)}
        aria-label={t('common.deleteEntry', { name: entry.name })}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    </div>
  );
}
