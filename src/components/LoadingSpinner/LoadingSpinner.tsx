import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.spinnerContainer} aria-live="polite" aria-busy="true">
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Loading DungeonForge...</p>
    </div>
  );
};

export default LoadingSpinner;