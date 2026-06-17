import globalEn from '../assets/locales/en/global.json';
import heroEn from '../features/hero/locales/en/hero.json';
import keyFeaturesEn from '../features/key-features/locales/en/key-features.json';
import goalsEn from '../features/goals/locales/en/goals.json';
import progressEn from '../features/progress/locales/en/progress.json';
import dashboardEn from '../assets/locales/en/dashboard.json';
import leaderboardEn from '../features/leaderboard/locales/en/leaderboard.json';

interface Resources {
  global: typeof globalEn;
  hero: typeof heroEn;
  'key-features': typeof keyFeaturesEn;
  goals: typeof goalsEn;
  progress: typeof progressEn;
  dashboard: typeof dashboardEn;
  leaderboard: typeof leaderboardEn;
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'global';
    resources: Resources;
  }
}
