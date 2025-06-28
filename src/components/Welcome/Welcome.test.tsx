import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Welcome from './Welcome';

describe('Welcome Component', () => {
  const mockOnCharacterCreate = jest.fn();

  const defaultProps = {
    onCharacterCreate: mockOnCharacterCreate,
    playerCount: 3,
  };

  it('renders correctly with default props', () => {
    render(<Welcome {...defaultProps} />);
    
    expect(screen.getByText('DungeonForge Online')).toBeInTheDocument();
    expect(screen.getByText('Begin Your Adventure')).toBeInTheDocument();
    expect(screen.getByText('3 adventurers currently questing')).toBeInTheDocument();
  });

  it('calls onCharacterCreate when button is clicked', () => {
    render(<Welcome {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Begin Your Adventure'));
    expect(mockOnCharacterCreate).toHaveBeenCalledTimes(1);
  });

  it('calls onCharacterCreate when Enter key is pressed', () => {
    render(<Welcome {...defaultProps} />);
    
    const button = screen.getByText('Begin Your Adventure');
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(mockOnCharacterCreate).toHaveBeenCalledTimes(1);
  });

  it('shows loading state when isLoading is true', () => {
    render(<Welcome {...defaultProps} isLoading={true} />);
    
    expect(screen.getByText('Connecting to multiplayer server...')).toBeInTheDocument();
    expect(screen.getByText('Begin Your Adventure')).toBeDisabled();
  });

  it('shows error message when error exists', () => {
    const errorMsg = 'Connection failed';
    render(<Welcome {...defaultProps} error={errorMsg} />);
    
    expect(screen.getByText(`${errorMsg} - Please refresh or try again later`)).toBeInTheDocument();
  });

  it('shows different message when no players are online', () => {
    render(<Welcome {...defaultProps} playerCount={0} />);
    
    expect(screen.getByText('Be the first to embark!')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Welcome {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});