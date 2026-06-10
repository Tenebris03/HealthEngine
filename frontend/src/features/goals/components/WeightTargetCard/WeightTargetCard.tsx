import { useTranslation } from 'react-i18next';
import styles from './WeightTargetCard.module.css';
import type { WeightTarget } from '@/features/goals/types/goals.types';

interface WeightTargetCardProps {
  weightTarget: WeightTarget;
  onEdit?: () => void;
}

export function WeightTargetCard({
  weightTarget,
  onEdit,
}: WeightTargetCardProps) {
  const { t } = useTranslation(['goals', 'global']);
  const { startDate, startWeight, currentWeight, targetWeight, targetDate } =
    weightTarget;

  const weightLost = startWeight - currentWeight;
  const weightToLose = currentWeight - targetWeight;
  const totalToLose = startWeight - targetWeight;
  const progressPercent =
    totalToLose > 0 ? (weightLost / totalToLose) * 100 : 0;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const daysRemaining = Math.ceil(
    (targetDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  );

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{t('weightTarget.title')}</h3>
        {onEdit && (
          <button
            className={styles.editButton}
            onClick={onEdit}
            aria-label={t('global:common.editWeightTarget')}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
        )}
      </div>

      <div className={styles.weightGrid}>
        <div className={styles.weightItem}>
          <div className={styles.weightLabel}>
            {t('weightTarget.startWeight')}
          </div>
          <div className={styles.weightValue}>
            {startWeight} {t('global:units.kg')}
          </div>
          <div className={styles.weightDate}>{formatDate(startDate)}</div>
        </div>

        <div className={styles.weightItem}>
          <div className={styles.weightLabel}>
            {t('weightTarget.currentWeight')}
          </div>
          <div className={`${styles.weightValue} ${styles.currentWeight}`}>
            {currentWeight} {t('global:units.kg')}
          </div>
          <div className={styles.weightChange}>
            {weightLost > 0 ? (
              <span className={styles.loss}>
                -{weightLost.toFixed(1)} {t('global:units.kg')}
              </span>
            ) : (
              <span className={styles.gain}>
                +{Math.abs(weightLost).toFixed(1)} {t('global:units.kg')}
              </span>
            )}
          </div>
        </div>

        <div className={styles.weightItem}>
          <div className={styles.weightLabel}>
            {t('weightTarget.targetWeight')}
          </div>
          <div className={`${styles.weightValue} ${styles.targetWeight}`}>
            {targetWeight} {t('global:units.kg')}
          </div>
          <div className={styles.weightDate}>{formatDate(targetDate)}</div>
        </div>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>
            {t('weightTarget.overallProgress')}
          </span>
          <span className={styles.progressPercent}>
            {progressPercent.toFixed(1)}
            {t('global:units.percent')}
          </span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          ></div>
        </div>
        <div className={styles.progressDetails}>
          <span>
            {t('weightTarget.kgLost', { weight: weightLost.toFixed(1) })}
          </span>
          <span>
            {t('weightTarget.kgRemaining', { weight: weightToLose.toFixed(1) })}
          </span>
          {daysRemaining > 0 && (
            <span>
              {t('weightTarget.daysRemaining', { days: daysRemaining })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
