import React, { useState } from 'react';
import Welcome from './components/Welcome/Welcome';
import './App.css';

interface AppState {
  currentView: 'welcome' | 'game';
  playerCount: number;
  isLoading: boolean;
  error: string | null;
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentView: 'welcome',
    playerCount: 42,
    isLoading: false,
    error: null
  });

  const handleCharacterCreate = () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate character creation
    setTimeout(() => {
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
        currentView: 'game'
      }));
      alert('🎲 Welcome to DungeonForge Online! Your AI-generated D&D adventure begins!');
    }, 2000);
  };

  return (
    <div className="App">
      {state.currentView === 'welcome' && (
        <Welcome
          onCharacterCreate={handleCharacterCreate}
          playerCount={state.playerCount}
          isLoading={state.isLoading}
          error={state.error}
        />
      )}
      {state.currentView === 'game' && (
        <div className="game-view">
          <h1>🏰 DungeonForge Online</h1>
          <h2>🎮 Your Adventure Begins!</h2>
          <p>The AI-generated D&D game is ready. More features coming soon...</p>
          <button onClick={() => setState(prev => ({ ...prev, currentView: 'welcome' }))}>
            🔙 Back to Welcome
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
