import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ProgressRing } from '@/features/progress/components/ProgressRing/ProgressRing';
import { FoodEntryCard } from '@/features/progress/components/FoodEntryCard/FoodEntryCard';
import { AddEditFoodModal } from '@/features/progress/components/AddEditFoodModal/AddEditFoodModal';
import styles from './ProgressPage.module.css';
import type {
  FoodEntry,
  MealType,
} from '@/features/progress/types/progress.types';

const MEAL_ORDER: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

const mealTypeTranslationKeys = {
  Breakfast: 'global:mealTypes.breakfast',
  Lunch: 'global:mealTypes.lunch',
  Dinner: 'global:mealTypes.dinner',
  Snacks: 'global:mealTypes.snacks',
} as const;

const DEFAULT_TARGETS = {
  calories: 2000,
  protein: 150,
  carbs: 250,
  fat: 65,
};

const SAMPLE_ENTRIES: FoodEntry[] = [
  {
    id: '1',
    name: 'Oatmeal with Berries',
    calories: 320,
    protein: 12,
    carbs: 54,
    fat: 6,
    portion: '80g',
    mealType: 'Breakfast',
    timestamp: new Date(),
  },
  {
    id: '2',
    name: 'Grilled Chicken Salad',
    calories: 450,
    protein: 45,
    carbs: 20,
    fat: 18,
    portion: '1 bowl',
    mealType: 'Lunch',
    timestamp: new Date(),
  },
  {
    id: '3',
    name: 'Greek Yogurt',
    calories: 150,
    protein: 15,
    carbs: 12,
    fat: 4,
    portion: '200g',
    mealType: 'Snacks',
    timestamp: new Date(),
  },
];

export function ProgressPage() {
  const { t } = useTranslation(['progress', 'global']);
  const [entries, setEntries] = useState<FoodEntry[]>(SAMPLE_ENTRIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<FoodEntry | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hoveredRing, setHoveredRing] = useState<{
    label: string;
    consumed: number;
    target: number;
    color: string;
  } | null>(null);

  const totals = useMemo(() => {
    return entries.reduce(
      (acc, entry) => ({
        calories: acc.calories + entry.calories,
        protein: acc.protein + entry.protein,
        carbs: acc.carbs + entry.carbs,
        fat: acc.fat + entry.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    );
  }, [entries]);

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

  const handleAddEntry = (entryData: Omit<FoodEntry, 'id' | 'timestamp'>) => {
    const newEntry: FoodEntry = {
      ...entryData,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setEntries((prev) => [...prev, newEntry]);
  };

  const handleEditEntry = (entryData: Omit<FoodEntry, 'id' | 'timestamp'>) => {
    if (!editingEntry) return;

    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === editingEntry.id ? { ...entry, ...entryData } : entry,
      ),
    );
    setEditingEntry(null);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const openAddModal = () => {
    setEditingEntry(null);
    setIsModalOpen(true);
  };

  const openEditModal = (entry: FoodEntry) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEntry(null);
  };

  const handleDateChange = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString())
      return t('global:date.today');
    if (date.toDateString() === yesterday.toDateString())
      return t('global:date.yesterday');
    if (date.toDateString() === tomorrow.toDateString())
      return t('global:date.tomorrow');

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const ringConfigs = [
    {
      key: 'calories' as const,
      color: '#f97316',
      size: 280,
      strokeWidth: 24,
      current: totals.calories,
      target: DEFAULT_TARGETS.calories,
    },
    {
      key: 'protein' as const,
      color: '#06b6d4',
      size: 200,
      strokeWidth: 20,
      current: totals.protein,
      target: DEFAULT_TARGETS.protein,
    },
    {
      key: 'carbs' as const,
      color: '#8b5cf6',
      size: 140,
      strokeWidth: 16,
      current: totals.carbs,
      target: DEFAULT_TARGETS.carbs,
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>{t('pageTitle')}</h1>

        <section className={styles.ringsSection}>
          <div className={styles.ringsContainer}>
            {ringConfigs.map((ring) => (
              <ProgressRing
                key={ring.key}
                progress={ring.current}
                target={ring.target}
                consumed={ring.current}
                label={t(`rings.${ring.key}`)}
                color={ring.color}
                size={ring.size}
                strokeWidth={ring.strokeWidth}
                onHoverStart={() =>
                  setHoveredRing({
                    label: t(`rings.${ring.key}`),
                    consumed: ring.current,
                    target: ring.target,
                    color: ring.color,
                  })
                }
                onHoverEnd={() => setHoveredRing(null)}
              />
            ))}
          </div>

          {hoveredRing && (
            <div
              className={styles.fixedTooltip}
              style={{
                backgroundColor: `${hoveredRing.color}40`,
                border: `1px solid ${hoveredRing.color}`,
              }}
            >
              <div className={styles.tooltipLabel}>{hoveredRing.label}</div>
              <div className={styles.tooltipValue}>
                {hoveredRing.consumed.toLocaleString()} {t('rings.of')}{' '}
                {hoveredRing.target.toLocaleString()}
              </div>
            </div>
          )}
        </section>

        <section className={styles.logSection}>
          <div className={styles.logHeader}>
            <h2 className={styles.logTitle}>{t('foodLog.title')}</h2>
            <div className={styles.dateSwitcher}>
              <button
                className={styles.dateButton}
                onClick={() => handleDateChange('prev')}
                aria-label={t('global:common.previousDay')}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <span className={styles.dateLabel}>
                {formatDate(selectedDate)}
              </span>
              <button
                className={styles.dateButton}
                onClick={() => handleDateChange('next')}
                aria-label={t('global:common.nextDay')}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <button
            className={styles.addButton}
            onClick={openAddModal}
            aria-label={t('global:common.addFoodEntry')}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>{t('foodLog.addFood')}</span>
          </button>

          <div className={styles.mealGroups}>
            {MEAL_ORDER.map((mealType) => {
              const mealEntries = entriesByMeal[mealType];
              if (mealEntries.length === 0) return null;

              return (
                <div key={mealType} className={styles.mealGroup}>
                  <h3 className={styles.mealTitle}>
                    {t(mealTypeTranslationKeys[mealType])}
                    <span className={styles.mealCalories}>
                      {mealEntries.reduce((sum, e) => sum + e.calories, 0)}{' '}
                      {t('global:units.kcal')}
                    </span>
                  </h3>
                  <div className={styles.entriesList}>
                    {mealEntries.map((entry) => (
                      <FoodEntryCard
                        key={entry.id}
                        entry={entry}
                        onEdit={openEditModal}
                        onDelete={handleDeleteEntry}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {entries.length === 0 && (
            <div className={styles.emptyState}>
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
              <p className={styles.emptyText}>{t('foodLog.emptyState')}</p>
            </div>
          )}
        </section>
      </div>

      <AddEditFoodModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={editingEntry ? handleEditEntry : handleAddEntry}
        editEntry={editingEntry}
      />
    </div>
  );
}
