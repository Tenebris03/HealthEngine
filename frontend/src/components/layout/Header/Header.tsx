import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/language-switcher/LanguageSwitcher';
import styles from './Header.module.css';

const headerLinks = [
  { key: 'nav.home' as const, path: '/' as const },
  { key: 'nav.goals' as const, path: '/goals' as const },
  { key: 'nav.leaderboard' as const, path: '/leaderboard' as const },
  { key: 'nav.progress' as const, path: '/progress' as const },
  { key: 'nav.about' as const, path: '/about' as const },
] as const;

export function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => handleNavigate('/')}>
        {t('brand')}
      </div>

      <nav className={styles.nav}>
        {headerLinks.map((link) => (
          <button
            key={link.key}
            className={`${styles.navItem} ${location.pathname === link.path ? styles.navItemActive : ''}`}
            onClick={() => handleNavigate(link.path)}
          >
            {t(link.key)}
          </button>
        ))}
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
