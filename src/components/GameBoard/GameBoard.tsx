import React from 'react';
import styles from './GameBoard.module.css';
import { DungeonForgeTheme } from '../../styles/theme.types';

interface GameBoardProps {
  theme?: Partial<DungeonForgeTheme>;
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  leftSidebarContent?: React.ReactNode;
  rightSidebarContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  onCellClick?: (x: number, y: number) => void;
  isLoading?: boolean;
  error?: Error | null;
}

const GameBoard: React.FC<GameBoardProps> = ({
  children,
  headerContent,
  leftSidebarContent,
  rightSidebarContent,
  footerContent,
  onCellClick,
  isLoading = false,
  error = null,
}) => {
  if (isLoading) {
    return <div className={styles.container}>Loading game board...</div>;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className="error-message">
          Error loading game board: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {headerContent || <h1>DungeonForge Online</h1>}
      </header>

      <main className={styles.main}>
        <aside className={styles.sidebar}>
          {leftSidebarContent || <div>Left Sidebar</div>}
        </aside>

        <section className={styles.gameArea}>
          <div className={styles.gridContainer}>
            {children}
          </div>
        </section>

        <aside className={styles.sidebar}>
          {rightSidebarContent || <div>Right Sidebar</div>}
        </aside>
      </main>

      <footer className={styles.footer}>
        {footerContent || <div>Game Controls</div>}
      </footer>
    </div>
  );
};

export default GameBoard;