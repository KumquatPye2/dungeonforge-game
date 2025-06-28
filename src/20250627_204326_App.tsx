import React, { useState, useEffect } from 'react';
import styles from './App.module.css';

// Define props interface for the App component
interface AppProps {
  initialSession?: GameSession;
}

const App: React.FC<AppProps> = ({ initialSession }) => {
  const [currentView, setCurrentView] = useState<string>('welcome');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [gameSession, setGameSession] = useState<GameSession | null>(initialSession || null);

  // Navigation items for our D&D app
  const navigationItems: NavigationItem[] = [
    { id: 'welcome', label: 'Welcome', path: '/' },
    { id: 'characters', label: 'Characters', path: '/characters' },
    { id: 'combat', label: 'Combat Tracker', path: '/combat', disabled: !gameSession },
    { id: 'map', label: 'Dungeon Map', path: '/map', disabled: !gameSession },
    { id: 'rules', label: 'Rules Reference', path: '/rules' },
  ];

  // Handle navigation between views
  const handleNavigation = (viewId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setCurrentView(viewId);
    } catch (err) {
      setError('Failed to navigate. Please try again.');
      console.error('Navigation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate loading a game session
  useEffect(() => {
    if (!initialSession) {
      setIsLoading(true);
      // Simulate API call to load game session
      const timer = setTimeout(() => {
        try {
          const mockSession: GameSession = {
            id: 'session-123',
            players: [
              { id: 'player-1', name: 'Gandalf', level: 5, class: 'Wizard' },
              { id: 'player-2', name: 'Aragorn', level: 5, class: 'Ranger' },
            ],
            status: 'lobby',
          };
          setGameSession(mockSession);
        } catch (err) {
          setError('Failed to load game session.');
          console.error('Session load error:', err);
        } finally {
          setIsLoading(false);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [initialSession]);

  // Render different views based on currentView state
  const renderCurrentView = () => {
    if (isLoading) {
      return <div className={styles.contentArea}>Loading your adventure...</div>;
    }

    if (error) {
      return <div className={styles.errorMessage}>{error}</div>;
    }

    switch (currentView) {
      case 'welcome':
        return (
          <div className={styles.contentArea}>
            <h2>Welcome to DungeonForge Online</h2>
            <p>Begin your adventure with friends in this multiplayer D&D experience.</p>
            {gameSession ? (
              <div>
                <h3>Current Session</h3>
                <p>Players: {gameSession.players.length}</p>
                <p>Status: {gameSession.status}</p>
              </div>
            ) : (
              <p>Creating your game session...</p>
            )}
          </div>
        );
      case 'characters':
        return (
          <div className={styles.contentArea}>
            <h2>Character Management</h2>
            <p>Create and manage your D&D characters here.</p>
          </div>
        );
      case 'combat':
        return (
          <div className={styles.contentArea}>
            <h2>Combat Tracker</h2>
            <p>Track initiative, HP, and combat status.</p>
          </div>
        );
      case 'map':
        return (
          <div className={styles.contentArea}>
            <h2>Dungeon Map</h2>
            <p>Interactive tactical map for your adventures.</p>
          </div>
        );
      case 'rules':
        return (
          <div className={styles.contentArea}>
            <h2>Rules Reference</h2>
            <p>Quick access to D&D 5e rules.</p>
          </div>
        );
      default:
        return <div className={styles.contentArea}>Select a section to begin</div>;
    }
  };

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>DungeonForge Online</h1>
        <p className={styles.subtitle}>A multiplayer D&D experience</p>
      </header>

      <nav className={styles.nav}>
        {navigationItems.map((item) => (
          <button
            key={item.id}
            className={styles.navButton}
            onClick={() => handleNavigation(item.id)}
            disabled={item.disabled || isLoading}
            aria-label={`Navigate to ${item.label}`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {renderCurrentView()}
    </div>
  );
};

export default App;