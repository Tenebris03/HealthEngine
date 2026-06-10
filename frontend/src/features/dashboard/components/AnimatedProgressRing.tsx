import { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import styles from './AnimatedProgressRing.module.css';

interface AnimatedProgressRingProps {
  consumed: number;
  target: number;
  label: string;
  size?: number;
  strokeWidth?: number;
}

function getRingColor(percent: number): string {
  if (percent >= 1) return '#22C55E';
  if (percent >= 0.9) return '#4ADE80';
  if (percent >= 0.5) return '#86EFAC';
  return '#6B7280';
}

export function AnimatedProgressRing({
  consumed,
  target,
  label,
  size = 240,
  strokeWidth = 20,
}: AnimatedProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(consumed / target, 1);
  const color = getRingColor(percent);

  const springConfig = { stiffness: 80, damping: 15, restDelta: 0.001 };
  const progressSpring = useSpring(0, springConfig);
  const dashoffset = useTransform(
    progressSpring,
    (v) => circumference - v * circumference,
  );

  const prevPercentRef = useRef(0);
  useEffect(() => {
    progressSpring.set(percent);
    prevPercentRef.current = percent;
  }, [percent, progressSpring]);

  return (
    <div className={styles.container} style={{ width: size, height: size }}>
      <svg width={size} height={size} className={styles.svg}>
        <circle
          className={styles.track}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          className={styles.progress}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          style={{ stroke: color }}
        />
      </svg>
      <div className={styles.center}>
        <span className={styles.value}>{consumed.toLocaleString()}</span>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}
