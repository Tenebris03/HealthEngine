import { useState } from 'react';
import styles from './AddEditFoodModal.module.css';
import type { FoodEntry, MealType } from '../../types/progress.types';

interface AddEditFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: Omit<FoodEntry, 'id' | 'timestamp'>) => void;
  editEntry?: FoodEntry | null;
}

const MEAL_TYPES: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

export function AddEditFoodModal({
  isOpen,
  onClose,
  onSubmit,
  editEntry,
}: AddEditFoodModalProps) {
  const [name, setName] = useState(editEntry?.name || '');
  const [calories, setCalories] = useState(
    editEntry?.calories.toString() || '',
  );
  const [protein, setProtein] = useState(editEntry?.protein.toString() || '');
  const [carbs, setCarbs] = useState(editEntry?.carbs.toString() || '');
  const [fat, setFat] = useState(editEntry?.fat.toString() || '');
  const [portion, setPortion] = useState(editEntry?.portion || '');
  const [mealType, setMealType] = useState<MealType>(
    editEntry?.mealType || 'Breakfast',
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !calories) return;

    onSubmit({
      name,
      calories: parseFloat(calories) || 0,
      protein: parseFloat(protein) || 0,
      carbs: parseFloat(carbs) || 0,
      fat: parseFloat(fat) || 0,
      portion,
      mealType,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 id="modal-title" className={styles.modalTitle}>
            {editEntry ? 'Edit Food Entry' : 'Add Food Entry'}
          </h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
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

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="food-name" className={styles.label}>
              Food Name *
            </label>
            <input
              id="food-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              placeholder="e.g., Oatmeal"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="portion" className={styles.label}>
              Portion
            </label>
            <input
              id="portion"
              type="text"
              value={portion}
              onChange={(e) => setPortion(e.target.value)}
              className={styles.input}
              placeholder="e.g., 80g or 1 cup"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="calories" className={styles.label}>
                Calories (kcal) *
              </label>
              <input
                id="calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className={styles.input}
                placeholder="0"
                min="0"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="protein" className={styles.label}>
                Protein (g)
              </label>
              <input
                id="protein"
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className={styles.input}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="carbs" className={styles.label}>
                Carbs (g)
              </label>
              <input
                id="carbs"
                type="number"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                className={styles.input}
                placeholder="0"
                min="0"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="fat" className={styles.label}>
                Fat (g)
              </label>
              <input
                id="fat"
                type="number"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                className={styles.input}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="meal-type" className={styles.label}>
              Meal Type
            </label>
            <select
              id="meal-type"
              value={mealType}
              onChange={(e) => setMealType(e.target.value as MealType)}
              className={styles.select}
            >
              {MEAL_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              {editEntry ? 'Update' : 'Add'} Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
