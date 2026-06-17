import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/services/api';
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

export function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('info');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState<GoalType | null>(null);
  const [bmr, setBmr] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    authApi.me().then((u) => {
      if (u.age) navigate('/calorie-tracking', { replace: true });
    });
  }, [navigate]);

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

  const handleGoalSelect = useCallback((g: GoalType) => {
    setGoal(g);
    setStep('summary');
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!goal) return;
    setSaving(true);
    try {
      const dailyCalories = calcCalories(bmr, goal);
      await authApi.updateProfile({
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

      navigate('/calorie-tracking', { replace: true });
    } catch {
      setSaving(false);
    }
  }, [goal, bmr, age, height, weight, navigate]);

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
              <h1 className={styles.title}>Let's get started!</h1>
              <p className={styles.subtitle}>Tell us about yourself</p>

              <div className={styles.field}>
                <label className={styles.label}>Your Age</label>
                <input
                  type="number"
                  className={styles.input}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 25"
                  min={1}
                  max={150}
                />
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Weight (kg)</label>
                  <input
                    type="number"
                    className={styles.input}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g. 75"
                    min={20}
                    max={500}
                    step={0.1}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Height (cm)</label>
                  <input
                    type="number"
                    className={styles.input}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g. 175"
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
                Continue
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
                  Calculating your Basal Metabolic Rate...
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
                  <span className={styles.bmrUnit}>kcal/day</span>
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
              <h1 className={styles.title}>What's your goal?</h1>
              <p className={styles.subtitle}>Choose your fitness objective</p>

              <div className={styles.goalGrid}>
                {[
                  {
                    type: 'lose' as GoalType,
                    icon: '🔥',
                    label: 'Lose Weight',
                    desc: 'Create a calorie deficit to shed excess weight',
                    color: 'var(--color-error)',
                  },
                  {
                    type: 'maintain' as GoalType,
                    icon: '⚖️',
                    label: 'Maintain Weight',
                    desc: 'Keep your current weight with balanced nutrition',
                    color: 'var(--color-primary)',
                  },
                  {
                    type: 'gain' as GoalType,
                    icon: '💪',
                    label: 'Gain Weight',
                    desc: 'Build muscle with a calorie surplus',
                    color: 'var(--color-green, #38a169)',
                  },
                ].map((g) => (
                  <motion.button
                    key={g.type}
                    className={styles.goalCard}
                    onClick={() => handleGoalSelect(g.type)}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ '--goal-accent': g.color } as React.CSSProperties}
                  >
                    <span className={styles.goalIcon}>{g.icon}</span>
                    <span className={styles.goalLabel}>{g.label}</span>
                    <span className={styles.goalDesc}>{g.desc}</span>
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
              <h1 className={styles.title}>Your Plan</h1>
              <p className={styles.subtitle}>
                Here's your personalized nutrition plan
              </p>

              <div className={styles.summaryGrid}>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>
                    Basal Metabolic Rate
                  </span>
                  <span className={styles.summaryValue}>{bmr} kcal</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Daily Calories</span>
                  <span
                    className={styles.summaryValue}
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {calcCalories(bmr, goal)} kcal
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Protein</span>
                  <span className={styles.summaryValue}>
                    {Math.round((calcCalories(bmr, goal) * 0.3) / 4)}g
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Carbs</span>
                  <span className={styles.summaryValue}>
                    {Math.round((calcCalories(bmr, goal) * 0.45) / 4)}g
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Fat</span>
                  <span className={styles.summaryValue}>
                    {Math.round((calcCalories(bmr, goal) * 0.25) / 9)}g
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Goal</span>
                  <span className={styles.summaryValue}>
                    {goal === 'lose'
                      ? '🔥 Lose Weight'
                      : goal === 'gain'
                        ? '💪 Gain Weight'
                        : '⚖️ Maintain'}
                  </span>
                </div>
              </div>

              {goal !== 'maintain' && (
                <p className={styles.summaryNote}>
                  {goal === 'lose'
                    ? 'Suggested target: 5 kg weight loss. You can adjust this in your profile.'
                    : 'Suggested target: 5 kg weight gain. You can adjust this in your profile.'}
                </p>
              )}

              <motion.button
                className={styles.primaryButton}
                onClick={handleConfirm}
                disabled={saving}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {saving ? 'Saving...' : 'Sounds good!'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
