import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styles from './LeaderboardFilter.module.css';
import type { LeaderboardFilter as FilterType } from '@/features/leaderboard/types/leaderboard.types';

interface LeaderboardFilterProps {
  active: FilterType;
  onChange: (filter: FilterType) => void;
}

const FILTERS: FilterType[] = ['weekly', 'all-time'];

export function LeaderboardFilter({
  active,
  onChange,
}: LeaderboardFilterProps) {
  const { t } = useTranslation('leaderboard');

  return (
    <div className={styles.filter}>
      {FILTERS.map((filter) => (
        <motion.button
          key={filter}
          className={`${styles.option} ${active === filter ? styles.optionActive : ''}`}
          onClick={() => onChange(filter)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {t(`filter.${filter === 'all-time' ? 'allTime' : filter}`)}
        </motion.button>
      ))}
    </div>
  );
}
