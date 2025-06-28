// src/components/App.tsx

import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import { NavigationItem, AppState } from '../types/types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    isLoading: true,
    error: null,
    currentPath: '/'
  });

  const navigationItems: NavigationItem[] = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'characters', label: 'Characters', path: '/characters' },
    { id: 'combat', label: 'Combat', path: '/combat' },
    { id: 'spells', label: 'Spells', path: '/spells' },
    { id: 'items', label: 'Items', path: '/items' },
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setState(prev => ({ ...prev, isLoading: false }));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (path: string) => {
    setState(prev => ({ ...prev, currentPath: path }));
  };

  const renderContent = () => {
    if (state.isLoading) {
      return <div className={styles.loading}>Loading DungeonForge Online...</div>;
    }

    if (state.error) {
      return <div className={styles.error}>Error: {state.error}</div>;
    }

    switch (state.currentPath) {
      case '/characters':
        return <h2>Character Management</h2>;
      case '/combat':
        return <h2>Tactical Combat</h2>;
      case '/spells':
        return <h2>Spell Compendium</h2>;
      case '/items':
        return <h2>Magic Items</h2>;
      default:
        return (
          <div>
            <h2>Welcome to DungeonForge Online</h2>
            <p>Begin your adventure with 2-8 players in this digital D&D experience.</p>
            <p>Features include:</p>
            <ul>
              <li>2D grid-based tactical combat</li>
              <li>Character progression from levels 1-20</li>
              <li>Real-time multiplayer with turn-based combat</li>
            </ul>
          </div>
        );
    }
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>DungeonForge Online</h1>
        <p className={styles.subtitle}>A Digital D&D Experience</p>
      </header>
      
      <nav className={styles.nav} aria-label="Main navigation">
        {navigationItems.map(item => (
          <button
            key={item.id}
            className={styles.navButton}
            onClick={() => handleNavigation(item.path)}
            aria-current={state.currentPath === item.path ? 'page' : undefined}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main className={styles.content}>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;