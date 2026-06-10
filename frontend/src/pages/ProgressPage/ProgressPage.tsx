import { useState, useMemo } from 'react';
import { ProgressRing } from '../../features/progress/components/ProgressRing/ProgressRing';
import { FoodEntryCard } from '../../features/progress/components/FoodEntryCard/FoodEntryCard';
import { AddEditFoodModal } from '../../features/progress/components/AddEditFoodModal/AddEditFoodModal';
import styles from './ProgressPage.module.css';
import type {
  FoodEntry,
  MealType,
} from '../../features/progress/types/progress.types';

const MEAL_ORDER: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

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
  console.log('ProgressPage rendering');
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

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Daily Progress</h1>

        {/* Progress Rings Section */}
        <section className={styles.ringsSection}>
          <div className={styles.ringsContainer}>
            {/* Outer Ring - Calories (Largest) */}
            <ProgressRing
              progress={totals.calories}
              target={DEFAULT_TARGETS.calories}
              consumed={totals.calories}
              label="Calories"
              color="#f97316"
              size={280}
              strokeWidth={24}
              onHoverStart={() =>
                setHoveredRing({
                  label: 'Calories',
                  consumed: totals.calories,
                  target: DEFAULT_TARGETS.calories,
                  color: '#f97316',
                })
              }
              onHoverEnd={() => setHoveredRing(null)}
            />
            {/* Middle Ring - Protein */}
            <ProgressRing
              progress={totals.protein}
              target={DEFAULT_TARGETS.protein}
              consumed={totals.protein}
              label="Protein"
              color="#06b6d4"
              size={200}
              strokeWidth={20}
              onHoverStart={() =>
                setHoveredRing({
                  label: 'Protein',
                  consumed: totals.protein,
                  target: DEFAULT_TARGETS.protein,
                  color: '#06b6d4',
                })
              }
              onHoverEnd={() => setHoveredRing(null)}
            />
            {/* Inner Ring - Carbs (Smallest) */}
            <ProgressRing
              progress={totals.carbs}
              target={DEFAULT_TARGETS.carbs}
              consumed={totals.carbs}
              label="Carbs"
              color="#8b5cf6"
              size={140}
              strokeWidth={16}
              onHoverStart={() =>
                setHoveredRing({
                  label: 'Carbs',
                  consumed: totals.carbs,
                  target: DEFAULT_TARGETS.carbs,
                  color: '#8b5cf6',
                })
              }
              onHoverEnd={() => setHoveredRing(null)}
            />
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
                {hoveredRing.consumed.toLocaleString()} /{' '}
                {hoveredRing.target.toLocaleString()}
              </div>
            </div>
          )}
        </section>

        {/* Food Log Section */}
        <section className={styles.logSection}>
          <div className={styles.logHeader}>
            <h2 className={styles.logTitle}>Food Log</h2>
            <div className={styles.dateSwitcher}>
              <button
                className={styles.dateButton}
                onClick={() => handleDateChange('prev')}
                aria-label="Previous day"
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
                aria-label="Next day"
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
            aria-label="Add food entry"
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
            <span>Add Food</span>
          </button>

          <div className={styles.mealGroups}>
            {MEAL_ORDER.map((mealType) => {
              const mealEntries = entriesByMeal[mealType];
              if (mealEntries.length === 0) return null;

              return (
                <div key={mealType} className={styles.mealGroup}>
                  <h3 className={styles.mealTitle}>
                    {mealType}
                    <span className={styles.mealCalories}>
                      {mealEntries.reduce((sum, e) => sum + e.calories, 0)} kcal
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
              <p className={styles.emptyText}>
                No food entries yet. Start tracking your meals!
              </p>
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
