import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { LeaderboardFilter } from '@/features/leaderboard/components/LeaderboardFilter';
import { LeaderboardTable } from '@/features/leaderboard/components/LeaderboardTable';
import styles from './LeaderboardPage.module.css';
import type {
  LeaderboardFilter as FilterType,
  LeaderboardData,
  LeaderboardUser,
} from '@/features/leaderboard/types/leaderboard.types';

const MOCK_DATA: LeaderboardData = {
  weekly: [
    {
      rank: 1,
      username: 'FitFalcon',
      avatar: '',
      points: 4850,
      streakDays: 12,
      isCurrentUser: false,
    },
    {
      rank: 2,
      username: 'IronWill',
      avatar: '',
      points: 4320,
      streakDays: 8,
      isCurrentUser: false,
    },
    {
      rank: 3,
      username: 'PulseMaster',
      avatar: '',
      points: 3980,
      streakDays: 15,
      isCurrentUser: false,
    },
    {
      rank: 4,
      username: 'you',
      avatar: '',
      points: 3560,
      streakDays: 5,
      isCurrentUser: true,
    },
    {
      rank: 5,
      username: 'ZenAthlete',
      avatar: '',
      points: 3210,
      streakDays: 7,
      isCurrentUser: false,
    },
    {
      rank: 6,
      username: 'CardioQueen',
      avatar: '',
      points: 2890,
      streakDays: 4,
      isCurrentUser: false,
    },
    {
      rank: 7,
      username: 'SweatEquity',
      avatar: '',
      points: 2540,
      streakDays: 6,
      isCurrentUser: false,
    },
    {
      rank: 8,
      username: 'EnduroKing',
      avatar: '',
      points: 2120,
      streakDays: 3,
      isCurrentUser: false,
    },
  ],
  allTime: [
    {
      rank: 1,
      username: 'IronWill',
      avatar: '',
      points: 45200,
      streakDays: 89,
      isCurrentUser: false,
    },
    {
      rank: 2,
      username: 'FitFalcon',
      avatar: '',
      points: 38900,
      streakDays: 67,
      isCurrentUser: false,
    },
    {
      rank: 3,
      username: 'PulseMaster',
      avatar: '',
      points: 34100,
      streakDays: 102,
      isCurrentUser: false,
    },
    {
      rank: 4,
      username: 'EnduroKing',
      avatar: '',
      points: 29800,
      streakDays: 45,
      isCurrentUser: false,
    },
    {
      rank: 5,
      username: 'CardioQueen',
      avatar: '',
      points: 26500,
      streakDays: 38,
      isCurrentUser: false,
    },
    {
      rank: 6,
      username: 'you',
      avatar: '',
      points: 22100,
      streakDays: 52,
      isCurrentUser: true,
    },
    {
      rank: 7,
      username: 'ZenAthlete',
      avatar: '',
      points: 18900,
      streakDays: 31,
      isCurrentUser: false,
    },
    {
      rank: 8,
      username: 'SweatEquity',
      avatar: '',
      points: 15400,
      streakDays: 27,
      isCurrentUser: false,
    },
  ],
};

function getFilteredData(
  data: LeaderboardData,
  filter: FilterType,
): LeaderboardUser[] {
  return filter === 'weekly' ? data.weekly : data.allTime;
}

export function LeaderboardPage() {
  const { t } = useTranslation('leaderboard');
  const [activeFilter, setActiveFilter] = useState<FilterType>('weekly');

  const users = getFilteredData(MOCK_DATA, activeFilter);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>{t('pageTitle')}</h1>
            <p className={styles.pageSubtitle}>{t('pageSubtitle')}</p>
          </div>
          <LeaderboardFilter active={activeFilter} onChange={setActiveFilter} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <LeaderboardTable users={users} />
        </motion.div>
      </div>
    </div>
  );
}
