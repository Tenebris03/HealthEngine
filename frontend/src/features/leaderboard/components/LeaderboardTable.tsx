import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styles from './LeaderboardTable.module.css';
import type { LeaderboardUser } from '@/features/leaderboard/types/leaderboard.types';

interface LeaderboardTableProps {
  users: LeaderboardUser[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' as const },
  },
};

function Avatar({ username, avatar }: { username: string; avatar: string }) {
  return (
    <div className={styles.avatar}>
      {avatar ? (
        <img src={avatar} alt={username} className={styles.avatarImage} />
      ) : (
        username.charAt(0).toUpperCase()
      )}
    </div>
  );
}

export function LeaderboardTable({ users }: LeaderboardTableProps) {
  const { t } = useTranslation('leaderboard');

  if (users.length === 0) {
    return <div className={styles.emptyState}>{t('table.noData')}</div>;
  }

  return (
    <div>
      <div className={styles.headerRow}>
        <span>{t('table.rank')}</span>
        <span>{t('table.user')}</span>
        <span>{t('table.points')}</span>
        <span>{t('table.streak')}</span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {users.map((user) => (
          <motion.div
            key={user.rank}
            className={`${styles.row} ${user.isCurrentUser ? styles.rowCurrentUser : ''}`}
            variants={rowVariants}
          >
            <span
              className={`${styles.rank} ${user.rank <= 3 ? styles.rankTop3 : ''}`}
            >
              #{user.rank}
            </span>
            <div className={styles.user}>
              <Avatar username={user.username} avatar={user.avatar} />
              <span className={styles.username}>
                {user.username}
                {user.isCurrentUser && (
                  <span className={styles.youBadge}>(you)</span>
                )}
              </span>
            </div>
            <span className={styles.points}>
              {user.points.toLocaleString()}
            </span>
            <span className={styles.streak}>
              <svg
                className={styles.streakIcon}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              {user.streakDays}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
