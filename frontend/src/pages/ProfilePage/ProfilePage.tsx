import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { authApi, type UserProfile } from '@/services/api';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [age, setAge] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [targetWeightKg, setTargetWeightKg] = useState('');
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    authApi.me().then((u) => {
      setProfile(u);
      setAge(u.age?.toString() ?? '');
      setHeightCm(u.heightCm?.toString() ?? '');
      setTargetWeightKg(u.targetWeightKg?.toString() ?? '');
      setDailyCalorieGoal(u.dailyCalorieGoal?.toString() ?? '');
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await authApi.updateProfile({
        age: age ? parseInt(age, 10) : undefined,
        heightCm: heightCm ? parseFloat(heightCm) : undefined,
        targetWeightKg: targetWeightKg ? parseFloat(targetWeightKg) : undefined,
        dailyCalorieGoal: dailyCalorieGoal ? parseInt(dailyCalorieGoal, 10) : undefined,
      });
      setProfile(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <h1 className={styles.title}>Profile Settings</h1>

      {profile && (
        <div className={styles.card}>
          <div className={styles.emailRow}>
            <span className={styles.label}>Email</span>
            <span className={styles.email}>{profile.email}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className={styles.card}>
        <h2 className={styles.sectionTitle}>Body Stats</h2>

        <label className={styles.field}>
          <span className={styles.label}>Age</span>
          <input
            type="number"
            className={styles.input}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min={1}
            max={150}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Height (cm)</span>
          <input
            type="number"
            className={styles.input}
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            min={50}
            max={300}
            step={0.1}
          />
        </label>

        <h2 className={styles.sectionTitle}>Goals</h2>

        <label className={styles.field}>
          <span className={styles.label}>Target Weight (kg)</span>
          <input
            type="number"
            className={styles.input}
            value={targetWeightKg}
            onChange={(e) => setTargetWeightKg(e.target.value)}
            min={20}
            max={500}
            step={0.1}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Daily Calorie Goal</span>
          <input
            type="number"
            className={styles.input}
            value={dailyCalorieGoal}
            onChange={(e) => setDailyCalorieGoal(e.target.value)}
            min={500}
            max={10000}
          />
        </label>

        <motion.button
          type="submit"
          className={styles.saveButton}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          disabled={saving}
        >
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Settings'}
        </motion.button>
      </form>
    </motion.div>
  );
}
