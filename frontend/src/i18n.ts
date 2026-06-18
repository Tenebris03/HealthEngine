import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import globalEn from '@/assets/locales/en/global.json';
import globalDe from '@/assets/locales/de/global.json';
import heroEn from '@/features/hero/locales/en/hero.json';
import heroDe from '@/features/hero/locales/de/hero.json';
import keyFeaturesEn from '@/features/key-features/locales/en/key-features.json';
import keyFeaturesDe from '@/features/key-features/locales/de/key-features.json';
import progressEn from '@/features/progress/locales/en/progress.json';
import progressDe from '@/features/progress/locales/de/progress.json';
import dashboardEn from '@/assets/locales/en/dashboard.json';
import dashboardDe from '@/assets/locales/de/dashboard.json';
import leaderboardEn from '@/features/leaderboard/locales/en/leaderboard.json';
import leaderboardDe from '@/features/leaderboard/locales/de/leaderboard.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'de'],
    fallbackLng: 'en',
    nonExplicitSupportedLngs: true,
    defaultNS: 'global',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        global: globalEn,
        hero: heroEn,
        'key-features': keyFeaturesEn,
        progress: progressEn,
        dashboard: dashboardEn,
        leaderboard: leaderboardEn,
      },
      de: {
        global: globalDe,
        hero: heroDe,
        'key-features': keyFeaturesDe,
        progress: progressDe,
        dashboard: dashboardDe,
        leaderboard: leaderboardDe,
      },
    },
  });

export default i18n;
