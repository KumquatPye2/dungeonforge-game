import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationProps } from '../types/navigation.types';
import styles from '../styles/navigation.module.css';

const Navigation: React.FC<NavigationProps> = ({
  authState,
  onLogout,
  onLogin,
  currentPath,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Navigation items configuration
  const navItems = [
    {
      label: 'Character Creation',
      path: '/character',
      icon: '🧙',
      requiresAuth: true,
    },
    {
      label: 'Dice Roller',
      path: '/dice',
      icon: '🎲',
      requiresAuth: false,
    },
    {
      label: 'Campaigns',
      path: '/campaigns',
      icon: '🗺️',
      requiresAuth: true,
    },
    {
      label: 'Combat',
      path: '/combat',
      icon: '⚔️',
      requiresAuth: true,
    },
  ];

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const handleNavigation = useCallback(
    (path: string) => {
      navigate(path);
      setMobileMenuOpen(false);
    },
    [navigate]
  );

  const filteredNavItems = navItems.filter(
    (item) => !item.requiresAuth || authState.isAuthenticated
  );

  return (
    <nav className={styles.navContainer} aria-label="Main navigation">
      <div 
        className={styles.logo} 
        onClick={() => handleNavigation('/')}
        role="button"
        tabIndex={0}
        aria-label="DungeonForge Online - Return to home"
        onKeyDown={(e) => e.key === 'Enter' && handleNavigation('/')}
      >
        DungeonForge Online
      </div>

      <div className={styles.navItems}>
        {filteredNavItems.map((item) => (
          <button
            key={item.path}
            className={`${styles.navLink} ${
              currentPath === item.path ? styles.activeLink : ''
            }`}
            onClick={() => handleNavigation(item.path)}
            aria-current={currentPath === item.path ? 'page' : undefined}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>

      <div className={styles.authSection}>
        {authState.isAuthenticated ? (
          <>
            <div className={styles.userInfo}>
              {authState.username && <span>Welcome, {authState.username}</span>}
              {authState.characterName && (
                <span> | Playing as {authState.characterName}</span>
              )}
            </div>
            <button
              className={styles.authButton}
              onClick={onLogout}
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className={styles.authButton}
            onClick={onLogin}
            aria-label="Login"
          >
            Login
          </button>
        )}
      </div>

      <div
        className={styles.hamburger}
        onClick={toggleMobileMenu}
        role="button"
        tabIndex={0}
        aria-label="Toggle mobile menu"
        onKeyDown={(e) => e.key === 'Enter' && toggleMobileMenu()}
      >
        ☰
      </div>

      {mobileMenuOpen && (
        <div className={`${styles.mobileMenu} ${mobileMenuOpen ? 'open' : ''}`}>
          {filteredNavItems.map((item) => (
            <button
              key={item.path}
              className={`${styles.navLink} ${
                currentPath === item.path ? styles.activeLink : ''
              }`}
              onClick={() => handleNavigation(item.path)}
              aria-current={currentPath === item.path ? 'page' : undefined}
            >
              {item.icon} {item.label}
            </button>
          ))}
          <div className={styles.authSection}>
            {authState.isAuthenticated ? (
              <button
                className={styles.authButton}
                onClick={onLogout}
                aria-label="Logout"
              >
                Logout
              </button>
            ) : (
              <button
                className={styles.authButton}
                onClick={onLogin}
                aria-label="Login"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;