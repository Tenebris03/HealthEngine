import { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/useAuth';
import { authApi, type UserProfile } from '@/services/api';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [targetWeightKg, setTargetWeightKg] = useState('');
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    authApi
      .me()
      .then((u) => {
        setProfile(u);
        setName(u.name ?? '');
        setAvatar(u.avatar);
        setAge(u.age?.toString() ?? '');
        setHeightCm(u.heightCm?.toString() ?? '');
        setTargetWeightKg(u.targetWeightKg?.toString() ?? '');
        setDailyCalorieGoal(u.dailyCalorieGoal?.toString() ?? '');
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Failed to load profile'),
      );
  }, []);

  const handleAvatarClick = () => fileRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setAvatar(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload: Record<string, unknown> = {};
      if (avatar !== profile?.avatar) payload.avatar = avatar ?? null;
      if (name !== (profile?.name ?? '')) payload.name = name || null;
      if (age !== (profile?.age?.toString() ?? ''))
        payload.age = age ? parseInt(age, 10) : null;
      if (heightCm !== (profile?.heightCm?.toString() ?? ''))
        payload.heightCm = heightCm ? parseFloat(heightCm) : null;
      if (targetWeightKg !== (profile?.targetWeightKg?.toString() ?? ''))
        payload.targetWeightKg = targetWeightKg
          ? parseFloat(targetWeightKg)
          : null;
      if (dailyCalorieGoal !== (profile?.dailyCalorieGoal?.toString() ?? ''))
        payload.dailyCalorieGoal = dailyCalorieGoal
          ? parseInt(dailyCalorieGoal, 10)
          : null;

      if (Object.keys(payload).length === 0) {
        setSaving(false);
        return;
      }

      const updated = await authApi.updateProfile(payload);
      setProfile(updated);
      setName(updated.name ?? '');
      setAvatar(updated.avatar);
      setAge(updated.age?.toString() ?? '');
      setHeightCm(updated.heightCm?.toString() ?? '');
      setTargetWeightKg(updated.targetWeightKg?.toString() ?? '');
      setDailyCalorieGoal(updated.dailyCalorieGoal?.toString() ?? '');
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  const initials = profile
    ? (profile.name ?? profile.email).slice(0, 2).toUpperCase()
    : '?';

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className={styles.avatarWrap}>
        <button
          type="button"
          className={styles.avatarButton}
          onClick={handleAvatarClick}
        >
          {avatar ? (
            <img src={avatar} alt="" className={styles.avatarImg} />
          ) : (
            <span className={styles.avatarInitials}>{initials}</span>
          )}
          <div className={styles.avatarOverlay}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
              <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
            </svg>
          </div>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg"
          className={styles.fileInput}
          onChange={handleFileChange}
        />
      </div>

      <form onSubmit={handleSave}>
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Edit Profile</h2>

          <label className={styles.field}>
            <span className={styles.label}>Name</span>
            <input
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </label>

          <div className={styles.emailRow}>
            <span className={styles.label}>Email</span>
            <span className={styles.email}>{profile?.email}</span>
          </div>

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
        </div>

        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Edit Goals</h2>

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
        </div>

        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Account</h2>
          <p className={styles.accountInfo}>
            Signed in as <strong>{profile?.email}</strong>
          </p>
          <motion.button
            type="button"
            className={styles.logoutButton}
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Logout
          </motion.button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

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
