import React from 'react';
import { AppTheme } from '../../types/index';

interface ErrorDisplayProps {
  error: string | null;
  onDismiss?: () => void;
  theme?: AppTheme;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onDismiss, theme }) => {
  if (!error) return null;

  return (
    <div style={{
      background: '#ef233c',
      color: 'white',
      padding: '1rem',
      borderRadius: '4px',
      margin: '1rem 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span>{error}</span>
      {onDismiss && (
        <button 
          onClick={onDismiss}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1.2rem'
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;
