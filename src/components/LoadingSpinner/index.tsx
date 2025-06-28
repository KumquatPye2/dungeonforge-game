import React from 'react';
import { AppTheme } from '../../types/index';

// TODO: AI Sprint - Implement full LoadingSpinner functionality
// This is a functional stub to make the app runnable

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  message?: string;
  theme?: AppTheme;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = '#f72585',
  message = 'Loading...',
  theme
}) => {
  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'small': return { width: '20px', height: '20px' };
      case 'large': return { width: '60px', height: '60px' };
      default: return { width: '40px', height: '40px' };
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    padding: '2rem'
  };

  const spinnerStyle: React.CSSProperties = {
    ...getSizeStyles(size),
    border: '3px solid rgba(255,255,255,0.1)',
    borderTop: `3px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  const messageStyle: React.CSSProperties = {
    color: '#e6e6e6',
    fontSize: '1rem',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <div style={spinnerStyle}></div>
      {message && <p style={messageStyle}>🏰 {message}</p>}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
