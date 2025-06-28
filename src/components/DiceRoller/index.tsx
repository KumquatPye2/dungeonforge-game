import React, { useState } from 'react';

// TODO: AI Sprint - Implement full DiceRoller functionality
// This is a functional stub to make the app runnable

interface DiceRollResult {
  dice: number;
  result: number;
  timestamp: Date;
}

interface DiceRollerProps {
  // Add props as needed in future sprints
}

const DiceRoller: React.FC<DiceRollerProps> = () => {
  const [rollHistory, setRollHistory] = useState<DiceRollResult[]>([]);
  const [isRolling, setIsRolling] = useState(false);

  const diceTypes = [4, 6, 8, 10, 12, 20];

  const rollDice = async (sides: number) => {
    setIsRolling(true);
    
    // Simulate rolling animation delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const result = Math.floor(Math.random() * sides) + 1;
    const newRoll: DiceRollResult = {
      dice: sides,
      result,
      timestamp: new Date()
    };
    
    setRollHistory(prev => [newRoll, ...prev.slice(0, 9)]); // Keep last 10 rolls
    setIsRolling(false);
  };

  const containerStyle: React.CSSProperties = {
    padding: '2rem',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    minHeight: '80vh',
    color: '#e6e6e6'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#f72585'
  };

  const diceGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const diceButtonStyle: React.CSSProperties = {
    padding: '1.5rem',
    background: isRolling ? '#666' : '#3a0ca3',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: isRolling ? 'not-allowed' : 'pointer',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    transform: isRolling ? 'scale(0.95)' : 'scale(1)'
  };

  const historyStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '1rem',
    maxHeight: '300px',
    overflowY: 'auto'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>🎲 D&D Dice Roller</h1>
      
      <div style={diceGridStyle}>
        {diceTypes.map(sides => (
          <button
            key={sides}
            style={diceButtonStyle}
            onClick={() => rollDice(sides)}
            disabled={isRolling}
          >
            {isRolling ? '🎲' : `d${sides}`}
          </button>
        ))}
      </div>

      {isRolling && (
        <div style={{ textAlign: 'center', fontSize: '2rem', margin: '1rem 0' }}>
          🎲 Rolling...
        </div>
      )}

      <div style={historyStyle}>
        <h3 style={{ marginTop: 0, color: '#f72585' }}>📜 Roll History</h3>
        {rollHistory.length === 0 ? (
          <p style={{ fontStyle: 'italic', opacity: 0.7 }}>No rolls yet. Click a die to get started!</p>
        ) : (
          rollHistory.map((roll, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.5rem',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              fontSize: '1.1rem'
            }}>
              <span>🎲 d{roll.dice}</span>
              <span style={{ fontWeight: 'bold', color: '#4cc9f0' }}>
                {roll.result}
              </span>
              <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                {roll.timestamp.toLocaleTimeString()}
              </span>
            </div>
          ))
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', opacity: 0.7 }}>
        <p>🤖 AI Generated Dice Roller | Ready for epic adventures!</p>
      </div>
    </div>
  );
};

export default DiceRoller;
