import styles from './MacroTargetCard.module.css';
import type { MacroTarget } from '../../types/goals.types';

interface MacroTargetCardProps {
  macroTarget: MacroTarget;
  onEdit?: () => void;
}

export function MacroTargetCard({ macroTarget, onEdit }: MacroTargetCardProps) {
  const { protein, carbs, fat, calories } = macroTarget;

  const totalMacros = protein + carbs + fat;
  const proteinPercent = (protein / totalMacros) * 100;
  const carbsPercent = (carbs / totalMacros) * 100;
  const fatPercent = (fat / totalMacros) * 100;

  const handleEdit = () => {
    if (onEdit) onEdit();
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Target Macronutrient Split</h3>
        {onEdit && (
          <button
            className={styles.editButton}
            onClick={handleEdit}
            aria-label="Edit macro targets"
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
          </button>
        )}
      </div>

      <div className={styles.calorieTarget}>
        <div className={styles.calorieLabel}>Daily Calorie Target</div>
        <div className={styles.calorieValue}>{calories} kcal</div>
      </div>

      <div className={styles.macroGrid}>
        {/* Protein */}
        <div className={`${styles.macroItem} ${styles.protein}`}>
          <div className={styles.macroIcon}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <div className={styles.macroLabel}>Protein</div>
          <div className={styles.macroValue}>{protein}g</div>
          <div className={styles.macroPercent}>
            {proteinPercent.toFixed(0)}%
          </div>
          <div className={styles.macroCalories}>
            {(protein * 4).toLocaleString()} kcal
          </div>
        </div>

        {/* Carbs */}
        <div className={`${styles.macroItem} ${styles.carbs}`}>
          <div className={styles.macroIcon}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
          </div>
          <div className={styles.macroLabel}>Carbs</div>
          <div className={styles.macroValue}>{carbs}g</div>
          <div className={styles.macroPercent}>{carbsPercent.toFixed(0)}%</div>
          <div className={styles.macroCalories}>
            {(carbs * 4).toLocaleString()} kcal
          </div>
        </div>

        {/* Fat */}
        <div className={`${styles.macroItem} ${styles.fat}`}>
          <div className={styles.macroIcon}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
          </div>
          <div className={styles.macroLabel}>Fat</div>
          <div className={styles.macroValue}>{fat}g</div>
          <div className={styles.macroPercent}>{fatPercent.toFixed(0)}%</div>
          <div className={styles.macroCalories}>
            {(fat * 9).toLocaleString()} kcal
          </div>
        </div>
      </div>

      {/* Macro Distribution Bar */}
      <div className={styles.distributionBar}>
        <div
          className={`${styles.distributionSegment} ${styles.proteinSegment}`}
          style={{ width: `${proteinPercent}%` }}
          title={`Protein: ${proteinPercent.toFixed(1)}%`}
        ></div>
        <div
          className={`${styles.distributionSegment} ${styles.carbsSegment}`}
          style={{ width: `${carbsPercent}%` }}
          title={`Carbs: ${carbsPercent.toFixed(1)}%`}
        ></div>
        <div
          className={`${styles.distributionSegment} ${styles.fatSegment}`}
          style={{ width: `${fatPercent}%` }}
          title={`Fat: ${fatPercent.toFixed(1)}%`}
        ></div>
      </div>

      <div className={styles.distributionLegend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.protein}`}></div>
          <span>Protein ({proteinPercent.toFixed(0)}%)</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.carbs}`}></div>
          <span>Carbs ({carbsPercent.toFixed(0)}%)</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.fat}`}></div>
          <span>Fat ({fatPercent.toFixed(0)}%)</span>
        </div>
      </div>
    </div>
  );
}
