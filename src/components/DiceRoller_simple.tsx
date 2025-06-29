import React, { useState } from 'react';

// TODO: AI Sprint - Implement full Dice Roller functionality
// This is a functional stub to make the app runnable

interface DiceRollerProps {
  onRollComplete?: (result: number) => void;
  disabled?: boolean;
}

const DiceRoller: React.FC<DiceRollerProps> = ({ 
  onRollComplete, 
  disabled = false 
}) => {
  const [lastRoll, setLastRoll] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (disabled) return;
    
    setIsRolling(true);
    
    // Simulate rolling animation
    setTimeout(() => {
      const result = Math.floor(Math.random() * 20) + 1;
      setLastRoll(result);
      setIsRolling(false);
      onRollComplete?.(result);
    }, 1000);
  };

  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      minHeight: '80vh',
      color: '#e6e6e6'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem',
        marginBottom: '1rem',
        color: '#f72585'
      }}>
        Dice Roller
      </h1>
      <p style={{ 
        fontSize: '1.2rem',
        marginBottom: '2rem',
        opacity: 0.8 
      }}>
        Roll the dice and let fate decide!
      </p>
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '2rem',
        borderRadius: '12px',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '2rem',
          minHeight: '5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {isRolling ? '🎲' : (lastRoll ? lastRoll : '🎲')}
        </div>
        
        <button
          onClick={rollDice}
          disabled={disabled || isRolling}
          style={{
            background: disabled || isRolling ? '#666' : '#f72585',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            borderRadius: '8px',
            cursor: disabled || isRolling ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          {isRolling ? 'Rolling...' : 'Roll D20'}
        </button>
        
        {lastRoll && !isRolling && (
          <div style={{
            marginTop: '1rem',
            fontSize: '1.1rem',
            opacity: 0.8
          }}>
            You rolled: {lastRoll}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiceRoller;
