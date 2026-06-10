import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  WeightTargetCard,
  MacroTargetCard,
  EditGoalsModal,
} from '@/features/goals';
import styles from './GoalsPage.module.css';
import type { GoalConfig } from '@/features/goals/types/goals.types';

const MOCK_GOALS: GoalConfig = {
  weight: {
    startDate: new Date('2024-01-01'),
    startWeight: 95,
    currentWeight: 87.5,
    targetWeight: 80,
    targetDate: new Date('2024-12-31'),
  },
  macros: {
    protein: 150,
    carbs: 250,
    fat: 65,
    calories: 2000,
  },
};

export function GoalsPage() {
  const { t } = useTranslation('goals');
  const [goals, setGoals] = useState<GoalConfig>(MOCK_GOALS);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditGoals = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveGoals = (updatedGoals: GoalConfig) => {
    setGoals(updatedGoals);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <h1 className={styles.pageTitle}>{t('pageTitle')}</h1>
            <p className={styles.pageSubtitle}>{t('pageSubtitle')}</p>
          </div>
          <motion.button
            className={styles.editButton}
            onClick={handleEditGoals}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <span>{t('editModal.title')}</span>
          </motion.button>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, staggerChildren: 0.15 }}
        >
          <motion.div
            className={styles.column}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <WeightTargetCard
              weightTarget={goals.weight}
              onEdit={handleEditGoals}
            />
          </motion.div>
          <motion.div
            className={styles.column}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <MacroTargetCard
              macroTarget={goals.macros}
              onEdit={handleEditGoals}
            />
          </motion.div>
        </motion.div>
      </div>

      <EditGoalsModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveGoals}
        initialGoals={goals}
      />
    </div>
  );
}
