import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/useAuth';
import styles from './OnboardingPage.module.css';

type Step = 'info' | 'bmr' | 'goal' | 'summary';
type GoalType = 'lose' | 'maintain' | 'gain';

function calcBMR(weight: number, height: number, age: number): number {
  return Math.round(10 * weight + 6.25 * height - 5 * age);
}

function calcCalories(bmr: number, goal: GoalType): number {
  switch (goal) {
    case 'lose':
      return Math.round(bmr * 0.8);
    case 'gain':
      return Math.round(bmr * 1.15);
    default:
      return bmr;
  }
}

const GOALS = [
  {
    type: 'lose' as GoalType,
    labelKey: 'onboarding.goalLose' as const,
    descKey: 'onboarding.goalLoseDesc' as const,
    color: 'var(--color-error)',
  },
  {
    type: 'maintain' as GoalType,
    labelKey: 'onboarding.goalMaintain' as const,
    descKey: 'onboarding.goalMaintainDesc' as const,
    color: 'var(--color-primary)',
  },
  {
    type: 'gain' as GoalType,
    labelKey: 'onboarding.goalGain' as const,
    descKey: 'onboarding.goalGainDesc' as const,
    color: 'var(--color-green, #38a169)',
  },
] as const;

export function OnboardingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation('global');
  const { user, login } = useAuth();
  const [step, setStep] = useState<Step>('info');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState<GoalType | null>(null);
  const [bmr, setBmr] = useState(0);
  const [saving, setSaving] = useState(false);
  const [dailyCalories, setDailyCalories] = useState(0);
  const [proteinG, setProteinG] = useState(0);
  const [carbsG, setCarbsG] = useState(0);
  const [fatG, setFatG] = useState(0);

  useEffect(() => {
    if (user?.age) navigate('/calorie-tracking', { replace: true });
  }, [navigate, user?.age]);

  const canContinue =
    age &&
    weight &&
    height &&
    parseInt(age) >= 1 &&
    parseInt(age) <= 150 &&
    parseFloat(weight) >= 20 &&
    parseFloat(weight) <= 500 &&
    parseFloat(height) >= 50 &&
    parseFloat(height) <= 300;

  const handleInfoContinue = useCallback(() => {
    if (!canContinue) return;
    const b = calcBMR(parseFloat(weight), parseFloat(height), parseInt(age));
    setBmr(b);
    setStep('bmr');
    setTimeout(() => setStep('goal'), 2200);
  }, [canContinue, weight, height, age]);

  const handleGoalSelect = useCallback(
    (g: GoalType) => {
      setGoal(g);
      const cals = calcCalories(bmr, g);
      setDailyCalories(cals);
      setProteinG(Math.round((cals * 0.3) / 4));
      setCarbsG(Math.round((cals * 0.45) / 4));
      setFatG(Math.round((cals * 0.25) / 9));
      setStep('summary');
    },
    [bmr],
  );

  const handleConfirm = useCallback(async () => {
    if (!goal) return;
    setSaving(true);
    try {
      const token = localStorage.getItem('auth_token');
      try {
        const parts = (token || '').split('.');
        const payload = JSON.parse(atob(parts[1]));
        console.log('JWT payload:', payload);
      } catch {
        console.log('Token is not a valid JWT, raw value:', token);
      }
      const debugRes = await fetch(
        `${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}/api/debug/verify-token`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log('Token verification debug:', await debugRes.json());
      const body = JSON.stringify({
        age: parseInt(age),
        heightCm: parseFloat(height),
        targetWeightKg:
          goal === 'lose'
            ? parseFloat(weight) - 5
            : goal === 'gain'
              ? parseFloat(weight) + 5
              : parseFloat(weight),
        dailyCalorieGoal: dailyCalories,
      });

      const res = await fetch(
        `${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}/api/auth/profile`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body,
        },
      );

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        console.error('Onboarding save response:', res.status, text);
        throw new Error(`Save failed (${res.status}): ${text}`);
      }

      const updated = await res.json();
      if (token) login(token, updated);
      navigate('/calorie-tracking', { replace: true });
    } catch (err) {
      console.error('Onboarding save failed:', err);
      setSaving(false);
    }
  }, [goal, age, height, weight, dailyCalories, navigate, login]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <AnimatePresence mode="wait">
          {step === 'info' && (
            <motion.div
              key="info"
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className={styles.title}>{t('onboarding.infoTitle')}</h1>
              <p className={styles.subtitle}>{t('onboarding.infoSubtitle')}</p>

              <div className={styles.field}>
                <label className={styles.label}>{t('onboarding.age')}</label>
                <input
                  type="number"
                  className={styles.input}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder={t('onboarding.agePlaceholder')}
                  min={1}
                  max={150}
                />
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label}>
                    {t('onboarding.weight')}
                  </label>
                  <input
                    type="number"
                    className={styles.input}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={t('onboarding.weightPlaceholder')}
                    min={20}
                    max={500}
                    step={0.1}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>
                    {t('onboarding.height')}
                  </label>
                  <input
                    type="number"
                    className={styles.input}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={t('onboarding.heightPlaceholder')}
                    min={50}
                    max={300}
                  />
                </div>
              </div>

              <motion.button
                className={styles.primaryButton}
                onClick={handleInfoContinue}
                disabled={!canContinue}
                whileHover={canContinue ? { scale: 1.02 } : {}}
                whileTap={canContinue ? { scale: 0.97 } : {}}
              >
                {t('onboarding.continue')}
              </motion.button>
            </motion.div>
          )}

          {step === 'bmr' && (
            <motion.div
              key="bmr"
              className={styles.card}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.bmrContainer}>
                <div className={styles.thinkingAnimation}>
                  <motion.div
                    className={styles.brainIcon}
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.8, repeat: 2, ease: 'easeInOut' }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="64"
                      height="64"
                      fill="var(--color-primary)"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6l5.25 3.15L17 12.23l-4-2.37V7z" />
                    </svg>
                  </motion.div>
                </div>

                <motion.p
                  className={styles.bmrText}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {t('onboarding.bmrCalculating')}
                </motion.p>

                <div className={styles.progressBar}>
                  <motion.div
                    className={styles.progressFill}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                  />
                </div>

                <motion.div
                  className={styles.bmrResult}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                >
                  <span className={styles.bmrValue}>{bmr}</span>
                  <span className={styles.bmrUnit}>
                    {t('onboarding.bmrUnit')}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}

          {step === 'goal' && (
            <motion.div
              key="goal"
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className={styles.title}>{t('onboarding.goalTitle')}</h1>
              <p className={styles.subtitle}>{t('onboarding.goalSubtitle')}</p>

              <div className={styles.goalGrid}>
                {GOALS.map((g) => (
                  <motion.button
                    key={g.type}
                    className={styles.goalCard}
                    onClick={() => handleGoalSelect(g.type)}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ '--goal-accent': g.color } as React.CSSProperties}
                  >
                    <span className={styles.goalLabel}>{t(g.labelKey)}</span>
                    <span className={styles.goalDesc}>{t(g.descKey)}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'summary' && goal && (
            <motion.div
              key="summary"
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className={styles.title}>{t('onboarding.summaryTitle')}</h1>
              <p className={styles.subtitle}>
                {t('onboarding.summarySubtitle')}
              </p>

              <div className={styles.summaryGrid}>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>
                    {t('onboarding.dailyCalories')}
                  </span>
                  <input
                    type="number"
                    className={styles.editableInput}
                    value={dailyCalories}
                    onChange={(e) => {
                      const v = parseInt(e.target.value) || 0;
                      setDailyCalories(v);
                      setProteinG(Math.round((v * 0.3) / 4));
                      setCarbsG(Math.round((v * 0.45) / 4));
                      setFatG(Math.round((v * 0.25) / 9));
                    }}
                  />
                  <span className={styles.summaryUnit}>kcal</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>
                    {t('onboarding.protein')}
                  </span>
                  <input
                    type="number"
                    className={styles.editableInput}
                    value={proteinG}
                    onChange={(e) => setProteinG(parseInt(e.target.value) || 0)}
                  />
                  <span className={styles.summaryUnit}>g</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>
                    {t('onboarding.carbs')}
                  </span>
                  <input
                    type="number"
                    className={styles.editableInput}
                    value={carbsG}
                    onChange={(e) => setCarbsG(parseInt(e.target.value) || 0)}
                  />
                  <span className={styles.summaryUnit}>g</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>
                    {t('onboarding.fat')}
                  </span>
                  <input
                    type="number"
                    className={styles.editableInput}
                    value={fatG}
                    onChange={(e) => setFatG(parseInt(e.target.value) || 0)}
                  />
                  <span className={styles.summaryUnit}>g</span>
                </div>
              </div>

              <motion.button
                className={styles.primaryButton}
                onClick={handleConfirm}
                disabled={saving}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {saving ? t('onboarding.saving') : t('onboarding.save')}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
