import React from 'react';
import styles from './Welcome.module.css';
import { WelcomeProps } from '../../types/welcome.types';

/**
 * Welcome component for DungeonForge Online
 * Displays welcome message, character creation button, and player count
 */
const Welcome: React.FC<WelcomeProps> = ({
  onCharacterCreate,
  playerCount,
  isLoading,
  error,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onCharacterCreate();
    }
  };

  return (
    <div className={styles.container} role="main" aria-label="Welcome to DungeonForge Online">
      <img 
        src="/assets/dnd-logo.png" 
        alt="Dungeons & Dragons Logo" 
        className={styles.dndLogo}
        aria-hidden="true"
      />
      
      <h1 className={styles.title}>DungeonForge Online</h1>
      
      <p className={styles.subtitle}>
        Embark on epic adventures with friends in this multiplayer D&D experience. 
        Create your hero, join a party of 2-8 adventurers, and battle through 
        tactical combat on a 2D grid. Will you answer the call to adventure?
      </p>
      
      {isLoading ? (
        <p className={styles.loading}>Connecting to multiplayer server...</p>
      ) : error ? (
        <p className={styles.error} role="alert">
          {error} - Please refresh or try again later
        </p>
      ) : (
        <button
          className={styles.button}
          onClick={onCharacterCreate}
          onKeyDown={handleKeyDown}
          aria-label="Begin character creation"
          disabled={isLoading}
        >
          Begin Your Adventure
        </button>
      )}
      
      <p className={styles.playerCount}>
        {playerCount > 0 
          ? `${playerCount} adventurers currently questing` 
          : 'Be the first to embark!'}
      </p>
    </div>
  );
};

export default React.memo(Welcome);