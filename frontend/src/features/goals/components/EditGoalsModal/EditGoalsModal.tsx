import { useState } from 'react';
import styles from './EditGoalsModal.module.css';
import type { GoalConfig } from '../../types/goals.types';

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
          <h2 className={styles.modalTitle}>Edit Goals</h2>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close modal"
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
          {/* Weight Goals Section */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Weight Target Timeline</h3>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Start Weight (kg)</label>
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
                <label className={styles.formLabel}>Current Weight (kg)</label>
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
                <label className={styles.formLabel}>Target Weight (kg)</label>
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
                <label className={styles.formLabel}>Target Date</label>
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

          {/* Macro Goals Section */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Macronutrient Targets</h3>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Daily Calories (kcal)
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
                <label className={styles.formLabel}>Protein (g)</label>
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
                <label className={styles.formLabel}>Carbs (g)</label>
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
                <label className={styles.formLabel}>Fat (g)</label>
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
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Save Goals
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
