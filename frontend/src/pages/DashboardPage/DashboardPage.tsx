import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { AnimatedProgressRing } from '@/features/dashboard/components/AnimatedProgressRing';
import { MacroTicker } from '@/features/dashboard/components/MacroTicker';
import { useFitnessState } from '@/hooks/useFitnessState';
import styles from './DashboardPage.module.css';

export function DashboardPage() {
  const { t } = useTranslation('dashboard');
  const { totals, targets, percentages, remaining } = useFitnessState();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <motion.h1
          className={styles.pageTitle}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {t('pageTitle')}
        </motion.h1>

        <motion.section
          className={styles.cockpit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className={styles.ringSection}>
            <AnimatedProgressRing
              consumed={totals.calories}
              target={targets.calories}
              label={t('calories')}
              size={240}
              strokeWidth={20}
            />
            <div className={styles.ringMeta}>
              <span className={styles.remainingLabel}>{t('remaining')}</span>
              <span className={styles.remainingValue}>
                {remaining.calories.toLocaleString()}
              </span>
              <span className={styles.remainingUnit}>
                {t('of')} {targets.calories.toLocaleString()}
              </span>
            </div>
          </div>

          <div className={styles.tickersSection}>
            <h3 className={styles.tickersTitle}>{t('macroSplit')}</h3>
            <MacroTicker
              label={t('protein')}
              current={totals.protein}
              target={targets.protein}
              percent={percentages.protein}
              color="var(--color-protein)"
            />
            <MacroTicker
              label={t('carbs')}
              current={totals.carbs}
              target={targets.carbs}
              percent={percentages.carbs}
              color="var(--color-carbs)"
            />
            <MacroTicker
              label={t('fat')}
              current={totals.fat}
              target={targets.fat}
              percent={percentages.fat}
              color="var(--color-fat)"
            />
          </div>
        </motion.section>
      </div>
    </div>
  );
}
