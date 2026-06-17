import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAuth } from '@/features/auth/useAuth';
import { LanguageSwitcher } from '@/components/language-switcher/LanguageSwitcher';
import styles from './Header.module.css';

const headerLinks = [
  { key: 'nav.calorieTracking' as const, path: '/calorie-tracking' as const },
  { key: 'nav.weightTracking' as const, path: '/weight-tracking' as const },
  { key: 'nav.leaderboard' as const, path: '/leaderboard' as const },
] as const;

function AvatarMenu() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (!user) return null;

  const initials = (user.name ?? user.email).slice(0, 2).toUpperCase();

  return (
    <div className={styles.avatarWrapper} ref={ref}>
      <button className={styles.avatarButton} onClick={() => setOpen(!open)}>
        {user.avatar ? (
          <img src={user.avatar} alt="" className={styles.avatarImg} />
        ) : (
          <span className={styles.avatarInitials}>{initials}</span>
        )}
      </button>
      {open && (
        <motion.div
          className={styles.dropdown}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className={styles.dropdownEmail}>{user.email}</div>
          <button
            className={styles.dropdownItem}
            onClick={() => {
              navigate('/profile');
              setOpen(false);
            }}
          >
            {t('common.editProfile')}
          </button>
          <button
            className={`${styles.dropdownItem} ${styles.dropdownDanger}`}
            onClick={() => {
              logout();
              setOpen(false);
            }}
          >
            {t('common.logout')}
          </button>
        </motion.div>
      )}
    </div>
  );
}

export function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

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
        {isAuthenticated ? (
          <AvatarMenu />
        ) : (
          <button
            className={styles.navItem}
            onClick={() => handleNavigate('/login')}
          >
            {t('common.login')}
          </button>
        )}
        <LanguageSwitcher />
      </nav>
    </motion.header>
  );
}
