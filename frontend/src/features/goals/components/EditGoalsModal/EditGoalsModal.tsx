import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './EditGoalsModal.module.css';
import type { GoalConfig } from '@/features/goals/types/goals.types';

interface EditGoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (goals: GoalConfig) => void;
  initialGoals: GoalConfig;
}

export function EditGoalsModal({
  isOpen,
  onClose,
  onSubmit,
  initialGoals,
}: EditGoalsModalProps) {
  const { t } = useTranslation(['goals', 'global']);
  const [formData, setFormData] = useState<GoalConfig>(initialGoals);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleClose = () => {
    setFormData(initialGoals);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{t('editModal.title')}</h2>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label={t('global:common.closeModal')}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>
              {t('editModal.weightTargetTimeline')}
            </h3>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t('editModal.startWeight')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.weight.startWeight}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      weight: {
                        ...formData.weight,
                        startWeight: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t('editModal.currentWeight')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.weight.currentWeight}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      weight: {
                        ...formData.weight,
                        currentWeight: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                  className={styles.formInput}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t('editModal.targetWeight')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.weight.targetWeight}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      weight: {
                        ...formData.weight,
                        targetWeight: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t('editModal.targetDate')}
                </label>
                <input
                  type="date"
                  value={formData.weight.targetDate.toISOString().split('T')[0]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      weight: {
                        ...formData.weight,
                        targetDate: new Date(e.target.value),
                      },
                    })
                  }
                  className={styles.formInput}
                  required
                />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>
              {t('editModal.macronutrientTargets')}
            </h3>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t('editModal.dailyCalories')}
                </label>
                <input
                  type="number"
                  value={formData.macros.calories}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      macros: {
                        ...formData.macros,
                        calories: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  className={styles.formInput}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t('editModal.protein')}
                </label>
                <input
                  type="number"
                  value={formData.macros.protein}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      macros: {
                        ...formData.macros,
                        protein: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t('editModal.carbs')}
                </label>
                <input
                  type="number"
                  value={formData.macros.carbs}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      macros: {
                        ...formData.macros,
                        carbs: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{t('editModal.fat')}</label>
                <input
                  type="number"
                  value={formData.macros.fat}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      macros: {
                        ...formData.macros,
                        fat: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                  className={styles.formInput}
                  required
                />
              </div>
            </div>
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleClose}
            >
              {t('global:common.cancel')}
            </button>
            <button type="submit" className={styles.submitButton}>
              {t('global:common.saveGoals')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
