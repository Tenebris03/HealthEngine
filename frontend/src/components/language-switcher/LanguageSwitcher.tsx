import { useTranslation } from 'react-i18next';
import headerStyles from '../layout/Header/Header.module.css';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className={headerStyles.languageSwitcher}
      aria-label="Switch language"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
