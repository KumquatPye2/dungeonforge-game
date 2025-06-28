import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import Welcome from './components/Welcome';
import CharacterCreation from './components/CharacterCreation';
import DiceRoller from './components/DiceRoller';
import Navigation from './components/Navigation';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import { RouteConfig, AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    isLoading: true,
    error: null,
    currentRoute: '/',
    theme: {
      primary: '#3a0ca3',
      secondary: '#7209b7',
      accent: '#f72585',
      background: '#1a1a2e',
      text: '#e6e6e6',
      error: '#ef233c',
      warning: '#ff9e00',
      success: '#4cc9f0'
    }
  });

  const routes: RouteConfig[] = [
    { path: '/', element: <Welcome />, label: 'Welcome' },
    { path: '/character', element: <CharacterCreation />, label: 'Create Character' },
    { path: '/dice', element: <DiceRoller />, label: 'Dice Roller' }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setState(prev => ({ ...prev, isLoading: false }));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (state.isLoading) {
    return <LoadingSpinner theme={state.theme} />;
  }

  return (
    <div 
      className={styles.appContainer}
      style={{ backgroundColor: state.theme.background }}
    >
      <Router>
        <Navigation routes={routes} theme={state.theme} />
        {state.error && <ErrorDisplay error={state.error} theme={state.theme} />}
        <main className={styles.mainContent} aria-live="polite">
          <Routes>
            {routes.map((route) => (
              <Route 
                key={route.path} 
                path={route.path} 
                element={route.element} 
              />
            ))}
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;