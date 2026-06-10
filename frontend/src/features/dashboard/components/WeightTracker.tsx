import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
} from 'recharts';
import { useWeightState } from '@/hooks/useWeightState';
import styles from './WeightTracker.module.css';

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
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="weightFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border-light)"
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={['dataMin - 2', 'dataMax + 2']}
              tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 8,
                fontSize: 13,
              }}
              labelStyle={{ color: 'var(--color-text-secondary)' }}
            />
            <Area
              type="monotone"
              dataKey="weight"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill="url(#weightFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.current}>
        <span className={styles.currentLabel}>{t('currentWeight')}</span>
        <span className={styles.currentValue}>{currentWeight}</span>
        <span className={styles.currentUnit}>{t('global:units.kg')}</span>
      </div>
    </motion.section>
  );
}
