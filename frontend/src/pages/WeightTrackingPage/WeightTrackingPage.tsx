import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeightState } from '@/hooks/useWeightState';
import { SimpleSparkline } from '@/features/dashboard/components/SimpleSparkline';
import styles from './WeightTrackingPage.module.css';

export function WeightTrackingPage() {
  const { entries, currentWeight, targetWeight, delta, addEntry, loading } =
    useWeightState();
  const [weightInput, setWeightInput] = useState('');

  const sorted = [...entries].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );

  const chartData = [...entries]
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((e) => e.weight);

  const trend =
    sorted.length >= 2
      ? (sorted[0].weight - sorted[sorted.length - 1].weight) / sorted.length
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weightInput);
    if (!w || w < 20 || w > 500) return;
    try {
      await addEntry(w);
      setWeightInput('');
    } catch {
      /* ignore */
    }
  };

  const formatDate = (d: Date) =>
    d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <motion.h1
          className={styles.pageTitle}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Weight Tracking
        </motion.h1>

        <motion.form
          className={styles.addForm}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <input
            type="number"
            className={styles.weightInput}
            placeholder="Enter weight in kg"
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
            step={0.1}
            min={20}
            max={500}
          />
          <motion.button
            type="submit"
            className={styles.addButton}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={!weightInput}
          >
            + Add Weight
          </motion.button>
        </motion.form>

        {chartData.length > 0 && (
          <motion.div
            className={styles.chartCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SimpleSparkline data={chartData} width={600} height={160} />
          </motion.div>
        )}

        <motion.div
          className={styles.statsRow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Current</span>
            <span className={styles.statValue}>{currentWeight || '—'} kg</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Target</span>
            <span className={styles.statValue}>{targetWeight} kg</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Trend</span>
            <span
              className={styles.statValue}
              style={{
                color:
                  trend < 0
                    ? 'var(--color-green, #38a169)'
                    : trend > 0
                      ? 'var(--color-error, #e53e3e)'
                      : undefined,
              }}
            >
              {trend < 0 ? '▼' : trend > 0 ? '▲' : '—'}{' '}
              {Math.abs(trend).toFixed(2)} kg/day
            </span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>To Goal</span>
            <span className={styles.statValue}>
              {delta > 0 ? `+${delta.toFixed(1)}` : delta.toFixed(1)} kg
            </span>
          </div>
        </motion.div>

        <h2 className={styles.timelineTitle}>Timeline</h2>

        <div className={styles.timeline}>
          <AnimatePresence>
            {sorted.map((entry, i) => {
              const prevWeight = sorted[i + 1]?.weight;
              const dailyChange = prevWeight ? entry.weight - prevWeight : 0;

              return (
                <motion.div
                  key={entry.id}
                  className={styles.timelineItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  layout
                >
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineContent}>
                    <span className={styles.timelineDate}>
                      {formatDate(entry.date)}
                    </span>
                    <span className={styles.timelineWeight}>
                      {entry.weight.toFixed(1)} kg
                    </span>
                    <span
                      className={styles.timelineChange}
                      style={{
                        color:
                          dailyChange < 0
                            ? 'var(--color-green, #38a169)'
                            : dailyChange > 0
                              ? 'var(--color-error, #e53e3e)'
                              : undefined,
                      }}
                    >
                      {dailyChange < 0 ? '▼' : dailyChange > 0 ? '▲' : '—'}{' '}
                      {Math.abs(dailyChange).toFixed(1)} kg
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {sorted.length === 0 && !loading && (
            <p className={styles.emptyState}>
              No weight entries yet. Add your first one above!
            </p>
          )}

          {loading && <p className={styles.emptyState}>Loading...</p>}
        </div>
      </div>
    </div>
  );
}
