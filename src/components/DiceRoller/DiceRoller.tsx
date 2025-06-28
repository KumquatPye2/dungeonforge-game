import React, { useState, useEffect, useCallback } from 'react';
import styles from './DiceRoller.module.css';
import { DiceType, DiceRollerProps, DICE_CONFIGS } from '../../types/diceRoller.types';

const DiceRoller: React.FC<DiceRollerProps> = ({
  onRollComplete,
  disabled = false,
  initialDiceType = 'd20',
  playerColor,
  ariaLabel = 'Dice roller'
}) => {
  const [selectedDice, setSelectedDice] = useState<DiceType>(initialDiceType);
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [rollHistory, setRollHistory] = useState<Array<{ dice: DiceType; result: number }>>([]);

  // Handle dice selection
  const handleDiceSelect = useCallback((diceType: DiceType) => {
    if (!isRolling) {
      setSelectedDice(diceType);
      setResult(null);
    }
  }, [isRolling]);

  // Roll the selected dice
  const rollDice = useCallback(() => {
    if (isRolling || disabled) return;

    setIsRolling(true);
    setResult(null);

    // Generate random result
    const diceConfig = DICE_CONFIGS[selectedDice];
    const randomResult = Math.floor(Math.random() * diceConfig.faces) + 1;

    // Set result after animation completes
    setTimeout(() => {
      setResult(randomResult);
      setIsRolling(false);
      setRollHistory(prev => [...prev.slice(-9), { dice: selectedDice, result: randomResult }]);
      
      if (onRollComplete) {
        onRollComplete(randomResult, selectedDice);
      }
    }, diceConfig.animationDuration);
  }, [selectedDice, isRolling, disabled, onRollComplete]);

  // Handle keyboard events
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      rollDice();
    }
  }, [rollDice]);

  // Set up and clean up event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Apply player color as CSS variable
  useEffect(() => {
    if (playerColor) {
      document.documentElement.style.setProperty('--player-color', playerColor);
      document.documentElement.style.setProperty('--player-color-dark', 
        `color-mix(in srgb, ${playerColor}, black 20%)`);
    }
  }, [playerColor]);

  // Generate dice faces based on selected dice
  const renderDiceFaces = () => {
    const faces = [];
    const diceConfig = DICE_CONFIGS[selectedDice];
    
    for (let i = 1; i <= diceConfig.faces; i++) {
      faces.push(
        <div 
          key={i}
          className={`${styles.diceFace} ${styles[diceConfig.classModifier]}`}
          style={{ 
            transform: getFaceTransform(selectedDice, i, diceConfig.faces),
            backgroundColor: result === i ? playerColor || '#4caf50' : 'white'
          }}
          aria-hidden="true"
        >
          {i}
        </div>
      );
    }
    
    return faces;
  };

  // Get transform for each face based on dice type
  const getFaceTransform = (diceType: DiceType, face: number, totalFaces: number): string => {
    // Simplified transform calculations for each dice type
    switch (diceType) {
      case 'd4':
        return `rotateX(${(face - 1) * 70.5}deg) translateZ(35px)`;
      case 'd6':
        return `rotateY(${(face - 1) * 90}deg) translateZ(50px)`;
      case 'd8':
        return `rotateX(${(face - 1) * 45}deg) translateZ(60px)`;
      case 'd10':
      case 'd100':
        return `rotateX(${(face - 1) * 36}deg) translateZ(70px)`;
      case 'd12':
        return `rotateX(${(face - 1) * 31.7}deg) translateZ(80px)`;
      case 'd20':
        return `rotateX(${(face - 1) * 18}deg) translateZ(90px)`;
      default:
        return '';
    }
  };

  // Generate random rotation for animation
  const getRandomRotation = () => {
    return {
      transform: isRolling 
        ? `rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg) rotateZ(${Math.random() * 360}deg)`
        : 'none'
    };
  };

  return (
    <div 
      className={styles.container}
      role="region"
      aria-label={ariaLabel}
    >
      <div className={styles.diceSelector}>
        {(Object.keys(DICE_CONFIGS) as DiceType[]).map((diceType) => (
          <button
            key={diceType}
            className={`${styles.diceButton} ${selectedDice === diceType ? styles.diceButtonActive : ''}`}
            onClick={() => handleDiceSelect(diceType)}
            disabled={isRolling || disabled}
            aria-label={`Select ${diceType} dice`}
            aria-pressed={selectedDice === diceType}
          >
            {diceType}
          </button>
        ))}
      </div>

      <div className={styles.diceDisplay}>
        <div 
          className={styles.dice}
          style={{
            ...getRandomRotation(),
            '--animation-duration': `${DICE_CONFIGS[selectedDice].animationDuration}ms`
          } as React.CSSProperties}
          aria-live="polite"
          aria-atomic="true"
        >
          {renderDiceFaces()}
        </div>
      </div>

      <button
        className={styles.rollButton}
        onClick={rollDice}
        disabled={isRolling || disabled}
        aria-label={`Roll ${selectedDice}`}
      >
        {isRolling ? 'Rolling...' : `Roll ${selectedDice}`}
      </button>

      {result !== null && (
        <div className={styles.resultDisplay} aria-live="polite">
          Rolled {result} on {selectedDice}
        </div>
      )}

      {rollHistory.length > 0 && (
        <div className={styles.history} aria-live="off">
          <h3>Recent Rolls:</h3>
          <ul>
            {rollHistory.map((roll, index) => (
              <li key={index}>{roll.dice}: {roll.result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DiceRoller;