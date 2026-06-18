import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useWeightState } from '@/hooks/useWeightState';
import styles from './WeightTracker.module.css';

const WIDTH = 600;
const HEIGHT = 200;
const PAD = { top: 10, right: 10, bottom: 24, left: 40 };

function Sparkline({ data }: { data: { date: string; weight: number }[] }) {
  const path = useMemo(() => {
    if (data.length < 2) return null;
    const xScale = (i: number) =>
      PAD.left + (i / (data.length - 1)) * (WIDTH - PAD.left - PAD.right);
    const weights = data.map((d) => d.weight);
    const min = Math.min(...weights);
    const max = Math.max(...weights);
    const range = max - min || 10;
    const yScale = (w: number) =>
      PAD.top + (1 - (w - min) / range) * (HEIGHT - PAD.top - PAD.bottom);

    const xs = data.map((_, i) => xScale(i));
    const ys = weights.map(yScale);

    const line = data.map((_, i) => `${i === 0 ? 'M' : 'L'}${xs[i]},${ys[i]}`).join(' ');
    const fill = `${line} L${xs[xs.length - 1]},${HEIGHT - PAD.bottom} L${xs[0]},${HEIGHT - PAD.bottom} Z`;

    return { line, fill, xs, ys, min, max };
  }, [data]);

  if (!path) {
    return (
      <svg width="100%" height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <text x="50%" y="50%" textAnchor="middle" fill="var(--color-text-muted)" fontSize={13}>
          Not enough data
        </text>
      </svg>
    );
  }

  const gridLines = [0, 1, 2].map((i) => {
    const y = PAD.top + (i / 2) * (HEIGHT - PAD.top - PAD.bottom);
    const v = Math.round(path.min + (i / 2) * (path.max - path.min));
    return (
      <g key={i}>
        <line x1={PAD.left} y1={y} x2={WIDTH - PAD.right} y2={y} stroke="var(--color-border-light)" strokeDasharray="3 3" />
        <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize={10} fill="var(--color-text-muted)">
          {v}
        </text>
      </g>
    );
  });

  return (
    <svg width="100%" height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
      <defs>
        <linearGradient id="weightFillSvg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.3} />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
        </linearGradient>
      </defs>
      {gridLines}
      <path d={path.fill} fill="url(#weightFillSvg)" />
      <path d={path.line} fill="none" stroke="var(--color-primary)" strokeWidth={2} />
      {path.xs.map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={path.ys[i]} r={3} fill="var(--color-primary)" />
          <text x={x} y={HEIGHT - 6} textAnchor="middle" fontSize={10} fill="var(--color-text-muted)">
            {data[i].date}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function WeightTracker() {
  const { t } = useTranslation(['dashboard', 'global']);
  const { entries, currentWeight, delta, addEntry } = useWeightState();
  const [inputValue, setInputValue] = useState('');

  const chartData = entries.map((e) => ({
    date: e.date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    weight: e.weight,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const weight = parseFloat(inputValue);
    if (!weight || weight <= 0) return;
    addEntry(weight);
    setInputValue('');
  };

  const deltaLabel =
    delta === 0
      ? `${t('global:units.kg')} ${t('global:units.percent')}`
      : `${delta > 0 ? '+' : ''}${delta.toFixed(1)} ${t('global:units.kg')}`;

  return (
    <motion.section
      className={styles.tracker}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>{t('weightTracking')}</h2>
        <div
          className={`${styles.delta} ${delta <= 0 ? styles.deltaSuccess : styles.deltaRemaining}`}
        >
          {deltaLabel}
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="number"
          step="0.1"
          min="0"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t('weightPlaceholder')}
          className={styles.input}
          required
        />
        <motion.button
          type="submit"
          className={styles.submitButton}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          {t('global:common.add')}
        </motion.button>
      </form>

      <div className={styles.chart}>
        <Sparkline data={chartData} />
      </div>

      <div className={styles.current}>
        <span className={styles.currentLabel}>{t('currentWeight')}</span>
        <span className={styles.currentValue}>{currentWeight}</span>
        <span className={styles.currentUnit}>{t('global:units.kg')}</span>
      </div>
    </motion.section>
  );
}
