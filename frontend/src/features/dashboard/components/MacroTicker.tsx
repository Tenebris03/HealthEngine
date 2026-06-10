import { motion } from 'framer-motion';
import styles from './MacroTicker.module.css';

interface MacroTickerProps {
  label: string;
  current: number;
  target: number;
  percent: number;
  color: string;
}

export function MacroTicker({
  label,
  current,
  target,
  percent,
  color,
}: MacroTickerProps) {
  return (
    <div className={styles.ticker}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.values}>
          <span className={styles.current}>{current}</span>
          <span className={styles.separator}>/</span>
          <span className={styles.target}>{target}g</span>
        </span>
      </div>
      <div className={styles.track}>
        <motion.div
          className={styles.fill}
          initial={{ width: 0 }}
          animate={{ width: `${percent * 100}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
