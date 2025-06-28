import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import DiceRoller from './DiceRoller';
import { DICE_CONFIGS } from '../../types/diceRoller.types';

describe('DiceRoller Component', () => {
  const mockRollComplete = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    mockRollComplete.mockClear();
  });

  it('renders without crashing', () => {
    render(<DiceRoller />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('displays all dice type buttons', () => {
    render(<DiceRoller />);
    Object.keys(DICE_CONFIGS).forEach(diceType => {
      expect(screen.getByText(diceType)).toBeInTheDocument();
    });
  });

  it('selects initial dice type correctly', () => {
    render(<DiceRoller initialDiceType="d12" />);
    const d12Button = screen.getByText('d12');
    expect(d12Button).toHaveClass('diceButtonActive');
  });

  it('changes selected dice when clicked', () => {
    render(<DiceRoller />);
    const d8Button = screen.getByText('d8');
    fireEvent.click(d8Button);
    expect(d8Button).toHaveClass('diceButtonActive');
  });

  it('does not allow dice change while rolling', () => {
    render(<DiceRoller />);
    const d20Button = screen.getByText('d20');
    const d6Button = screen.getByText('d6');
    
    fireEvent.click(d20Button);
    fireEvent.click(screen.getByText(/Roll d20/));
    
    // Try to change dice while rolling
    fireEvent.click(d6Button);
    expect(d6Button).not.toHaveClass('diceButtonActive');
  });

  it('triggers roll animation and completes', async () => {
    render(<DiceRoller onRollComplete={mockRollComplete} />);
    const rollButton = screen.getByText(/Roll d20/);
    
    fireEvent.click(rollButton);
    expect(screen.getByText('Rolling...')).toBeInTheDocument();
    
    // Fast-forward animation
    act(() => {
      jest.advanceTimersByTime(DICE_CONFIGS.d20.animationDuration);
    });
    
    expect(mockRollComplete).toHaveBeenCalled();
    expect(screen.getByText(/Rolled/)).toBeInTheDocument();
  });

  it('disables controls when disabled prop is true', () => {
    render(<DiceRoller disabled={true} />);
    const rollButton = screen.getByText(/Roll d20/);
    const d6Button = screen.getByText('d6');
    
    expect(rollButton).toBeDisabled();
    fireEvent.click(d6Button);
    expect(d6Button).not.toHaveClass('diceButtonActive');
  });

  it('responds to keyboard events', () => {
    render(<DiceRoller onRollComplete={mockRollComplete} />);
    const rollButton = screen.getByText(/Roll d20/);
    
    fireEvent.keyDown(document, { key: 'Enter' });
    act(() => {
      jest.advanceTimersByTime(DICE_CONFIGS.d20.animationDuration);
    });
    
    expect(mockRollComplete).toHaveBeenCalled();
  });

  it('applies player color correctly', () => {
    const testColor = '#ff5722';
    render(<DiceRoller playerColor={testColor} />);
    const rollButton = screen.getByText(/Roll d20/);
    
    expect(rollButton).toHaveStyle(`background-color: ${testColor}`);
  });
});