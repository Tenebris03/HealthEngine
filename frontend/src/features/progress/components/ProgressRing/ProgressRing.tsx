import { useState } from 'react';
import styles from './ProgressRing.module.css';

interface ProgressRingProps {
  progress: number;
  target: number;
  consumed: number;
  label: string;
  color: string;
  size?: number;
  strokeWidth?: number;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export function ProgressRing({
  progress,
  target,
  color,
  size = 180,
  strokeWidth = 12,
  onHoverStart,
  onHoverEnd,
}: ProgressRingProps) {
  const [isHovered, setIsHovered] = useState(false);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = Math.min(progress / target, 1);
  const strokeDashoffset = circumference - progressPercent * circumference;

  return (
    <div
      className={styles.ringContainer}
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverStart?.();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverEnd?.();
      }}
    >
      <svg width={size} height={size} className={styles.ringSvg}>
        <defs>
          <filter
            id={`glow-${color.replace('#', '')}`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          className={styles.ringBackground}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={styles.ringProgress}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            stroke: color,
            transition: 'filter 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          filter={
            isHovered ? `url(#glow-${color.replace('#', '')})` : undefined
          }
        />
      </svg>
    </div>
  );
}
