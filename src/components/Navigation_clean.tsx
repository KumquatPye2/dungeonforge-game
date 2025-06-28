import React from 'react';
import { Link } from 'react-router-dom';

// TODO: AI Sprint - Implement full Navigation functionality
// This is a functional stub to make the app runnable

interface NavigationProps {
  // Add props as needed in future sprints
}

const Navigation: React.FC<NavigationProps> = () => {
  const navStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    borderBottom: '2px solid #3a0ca3',
    position: 'sticky',
    top: 0,
    zIndex: 100
  };

  const logoStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#f72585',
    textDecoration: 'none'
  };

  const navLinksStyle: React.CSSProperties = {
    display: 'flex',
    gap: '2rem',
    listStyle: 'none',
    margin: 0,
    padding: 0
  };

  const linkStyle: React.CSSProperties = {
    color: '#e6e6e6',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'all 0.3s ease'
  };

  const aiTagStyle: React.CSSProperties = {
    fontSize: '0.8rem',
    color: '#888',
    opacity: 0.7,
    fontStyle: 'italic'
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>
        🏰 DungeonForge
      </Link>
      
      <ul style={navLinksStyle}>
        <li>
          <Link to="/" style={linkStyle}>
            🏠 Home
          </Link>
        </li>
        <li>
          <Link to="/character" style={linkStyle}>
            🧙‍♂️ Characters
          </Link>
        </li>
        <li>
          <Link to="/dice" style={linkStyle}>
            🎲 Dice
          </Link>
        </li>
        <li>
          <Link to="/campaigns" style={linkStyle}>
            🗺️ Campaigns
          </Link>
        </li>
      </ul>
      
      <div style={aiTagStyle}>
        🤖 AI Generated
      </div>
    </nav>
  );
};

export default Navigation;
