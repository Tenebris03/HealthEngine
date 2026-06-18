import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { leaderboardApi, type LeaderboardUser } from '@/services/api';
import styles from './LeaderboardPage.module.css';

function getAvatarUrl(name: string) {
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
}

function Podium({ users }: { users: LeaderboardUser[] }) {
  const top3 = users.slice(0, 3);
  const order = [top3[1], top3[0], top3[2]];

  return (
    <div className={styles.podium}>
      {order.map((user, i) => {
        if (!user) return null;
        const isFirst = i === 1;
        const medal = i === 1 ? '🥇' : i === 0 ? '🥈' : '🥉';
        const height = isFirst ? 180 : 130;

        return (
          <motion.div
            key={user.rank}
            className={styles.podiumItem}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.15 }}
          >
            <div className={styles.podiumAvatar}>
              <img
                src={user.avatar || getAvatarUrl(user.username)}
                alt={user.username}
                className={styles.podiumImg}
              />
              <span className={styles.podiumMedal}>{medal}</span>
            </div>
            <span className={styles.podiumName}>{user.username}</span>
            <span className={styles.podiumPoints}>
              {user.points.toLocaleString()}
            </span>
            <div className={styles.podiumBar} style={{ height }} />
          </motion.div>
        );
      })}
    </div>
  );
}

function RankedList({ users }: { users: LeaderboardUser[] }) {
  if (users.length === 0) {
    return <p className={styles.emptyState}>No leaderboard data yet.</p>;
  }

  return (
    <div className={styles.list}>
      {users.map((user, i) => (
        <motion.div
          key={user.rank}
          className={`${styles.listRow} ${user.isCurrentUser ? styles.listRowCurrent : ''}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.03 }}
        >
          <span className={styles.listRank}>#{user.rank}</span>
          <img
            src={user.avatar || getAvatarUrl(user.username)}
            alt={user.username}
            className={styles.listAvatar}
          />
          <span className={styles.listName}>
            {user.username}
            {user.isCurrentUser && <span className={styles.youBadge}>you</span>}
          </span>
          <span className={styles.listPoints}>
            {user.points.toLocaleString()}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    leaderboardApi
      .getAll()
      .then(setUsers)
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <motion.h1
          className={styles.pageTitle}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Leaderboard
        </motion.h1>

        {loading ? (
          <p className={styles.emptyState}>Loading...</p>
        ) : users.length === 0 ? (
          <p className={styles.emptyState}>No leaderboard data yet.</p>
        ) : (
          <>
            <Podium users={users} />
            {users.length > 3 && <RankedList users={users.slice(3)} />}
          </>
        )}
      </div>
    </div>
  );
}
