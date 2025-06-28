import React from 'react';

// TODO: AI Sprint - Implement full Dashboard functionality
// This is a functional stub to make the app runnable

const Dashboard: React.FC = () => {
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
        Dashboard
      </h1>
      <p style={{ 
        fontSize: '1.2rem',
        marginBottom: '2rem',
        opacity: 0.8 
      }}>
        Your D&D adventure hub!
      </p>
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '2rem',
        borderRadius: '12px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
          📊 Dashboard features coming soon!
        </p>
        <p style={{ fontSize: '1rem', opacity: 0.7 }}>
          This feature will be implemented in the next AI development sprint.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
