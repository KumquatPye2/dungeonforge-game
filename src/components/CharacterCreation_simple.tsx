import React from 'react';

// TODO: AI Sprint - Implement full Character Creation functionality
// This is a functional stub to make the app runnable

interface CharacterCreationProps {
  onSubmit?: (character: any) => void;
  isLoading?: boolean;
  error?: string | null;
}

const CharacterCreation: React.FC<CharacterCreationProps> = ({ 
  onSubmit, 
  isLoading = false, 
  error = null 
}) => {
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
        Character Creation
      </h1>
      <p style={{ 
        fontSize: '1.2rem',
        marginBottom: '2rem',
        opacity: 0.8 
      }}>
        Build your legendary D&D character here!
      </p>
      
      {error && (
        <div style={{
          background: '#ef233c',
          color: 'white',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '2rem',
        borderRadius: '12px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
          🎭 Character creation form coming soon!
        </p>
        <p style={{ fontSize: '1rem', opacity: 0.7 }}>
          This feature will be implemented in the next AI development sprint.
        </p>
        {isLoading && (
          <div style={{ marginTop: '1rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid rgba(255, 255, 255, 0.3)',
              borderTop: '4px solid #f72585',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterCreation;
