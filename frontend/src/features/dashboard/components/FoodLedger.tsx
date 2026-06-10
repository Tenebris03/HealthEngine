import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { AddEditFoodModal } from '@/features/progress/components/AddEditFoodModal/AddEditFoodModal';
import { FoodEntryCard } from '@/features/progress/components/FoodEntryCard/FoodEntryCard';
import { useFitnessState } from '@/hooks/useFitnessState';
import type {
  FoodEntry,
  MealType,
} from '@/features/progress/types/progress.types';
import styles from './FoodLedger.module.css';

const MEAL_ORDER: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

const mealTypeTranslationKeys: Record<
  MealType,
  keyof (typeof import('@/assets/locales/en/global.json'))['mealTypes']
> = {
  Breakfast: 'breakfast',
  Lunch: 'lunch',
  Dinner: 'dinner',
  Snacks: 'snacks',
};

export function FoodLedger() {
  const { t } = useTranslation('progress');
  const { t: tGlobal } = useTranslation('global');
  const { entries, addEntry, deleteEntry, updateEntry } = useFitnessState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<FoodEntry | null>(null);

  const entriesByMeal = useMemo(() => {
    const grouped: Record<MealType, FoodEntry[]> = {
      Breakfast: [],
      Lunch: [],
      Dinner: [],
      Snacks: [],
    };
    entries.forEach((entry) => {
      grouped[entry.mealType].push(entry);
    });
    return grouped;
  }, [entries]);

  const handleAddEntry = (entry: Omit<FoodEntry, 'id' | 'timestamp'>) => {
    addEntry(entry);
  };

  const handleEditEntry = (entry: Omit<FoodEntry, 'id' | 'timestamp'>) => {
    if (!editingEntry) return;
    updateEntry(editingEntry.id, entry);
    setEditingEntry(null);
  };

  const openAddModal = () => {
    setEditingEntry(null);
    setIsModalOpen(true);
  };

  const openEditModal = (entry: FoodEntry) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEntry(null);
  };

  return (
    <section className={styles.ledger}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('foodLog.title')}</h2>
        <motion.button
          className={styles.addButton}
          onClick={openAddModal}
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
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>{t('foodLog.addFood')}</span>
        </motion.button>
      </div>

      <div className={styles.groups}>
        {MEAL_ORDER.map((mealType) => {
          const mealEntries = entriesByMeal[mealType];
          if (mealEntries.length === 0) return null;

          return (
            <div key={mealType} className={styles.group}>
              <h3 className={styles.mealTitle}>
                {tGlobal(
                  `mealTypes.${mealTypeTranslationKeys[mealType]}` as 'mealTypes.breakfast',
                )}
                <span className={styles.mealCalories}>
                  {mealEntries.reduce((sum, e) => sum + e.calories, 0)}{' '}
                  {tGlobal('units.kcal')}
                </span>
              </h3>
              <div className={styles.entriesList}>
                <AnimatePresence mode="popLayout">
                  {mealEntries.map((entry) => (
                    <FoodEntryCard
                      key={entry.id}
                      entry={entry}
                      onEdit={openEditModal}
                      onDelete={deleteEntry}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {entries.length === 0 && (
        <motion.div
          className={styles.emptyState}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
          </svg>
          <p className={styles.emptyText}>{t('foodLog.emptyState')}</p>
        </motion.div>
      )}

      <AddEditFoodModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingEntry ? handleEditEntry : handleAddEntry}
        editEntry={editingEntry}
      />
    </section>
  );
}
