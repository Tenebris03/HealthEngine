import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
        <div className={styles.header}>
          <div>
            <h1 className={styles.pageTitle}>{t('pageTitle')}</h1>
            <p className={styles.pageSubtitle}>{t('pageSubtitle')}</p>
          </div>
          <button className={styles.editButton} onClick={handleEditGoals}>
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
          </button>
        </div>

        <div className={styles.grid}>
          <div className={styles.column}>
            <WeightTargetCard
              weightTarget={goals.weight}
              onEdit={handleEditGoals}
            />
          </div>
          <div className={styles.column}>
            <MacroTargetCard
              macroTarget={goals.macros}
              onEdit={handleEditGoals}
            />
          </div>
        </div>
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
