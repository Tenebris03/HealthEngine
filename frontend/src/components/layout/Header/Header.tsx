import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAuth } from '@/features/auth/useAuth';
import { LanguageSwitcher } from '@/components/language-switcher/LanguageSwitcher';
import styles from './Header.module.css';

const headerLinks = [
  { key: 'nav.home' as const, path: '/' as const },
  { key: 'nav.dashboard' as const, path: '/dashboard' as const },
  { key: 'nav.goals' as const, path: '/goals' as const },
  { key: 'nav.leaderboard' as const, path: '/leaderboard' as const },
  { key: 'nav.progress' as const, path: '/progress' as const },
  { key: 'nav.about' as const, path: '/about' as const },
] as const;

export function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header
      className={styles.header}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' as const }}
    >
      <motion.div
        className={styles.logo}
        onClick={() => handleNavigate('/')}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {t('brand')}
      </motion.div>

      <nav className={styles.nav}>
        {headerLinks.map((link) => (
          <motion.button
            key={link.key}
            className={`${styles.navItem} ${location.pathname === link.path ? styles.navItemActive : ''}`}
            onClick={() => handleNavigate(link.path)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {t(link.key)}
          </motion.button>
        ))}
        {isAuthenticated && user ? (
          <div className={styles.userSection}>
            <span className={styles.userEmail}>{user.email}</span>
            <button className={styles.logoutButton} onClick={logout}>
              {t('common.logout')}
            </button>
          </div>
        ) : (
          <button className={styles.navItem} onClick={() => handleNavigate('/login')}>
            {t('common.login')}
          </button>
        )}
        <LanguageSwitcher />
      </nav>
    </motion.header>
  );
}
