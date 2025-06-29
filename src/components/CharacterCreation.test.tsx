import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CharacterCreation from './CharacterCreation';

describe('CharacterCreation', () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('renders correctly', () => {
    render(<CharacterCreation onSubmit={mockSubmit} />);
    
    expect(screen.getByText('Create Your Character')).toBeInTheDocument();
    expect(screen.getByLabelText('Character Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Race')).toBeInTheDocument();
    expect(screen.getByLabelText('Class')).toBeInTheDocument();
    expect(screen.getByLabelText('Background')).toBeInTheDocument();
    expect(screen.getByText('Roll Ability Scores')).toBeInTheDocument();
  });

  it('validates character name', async () => {
    render(<CharacterCreation onSubmit={mockSubmit} />);
    
    const nameInput = screen.getByLabelText('Character Name');
    
    // Test empty name
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.submit(screen.getByRole('form'));
    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();

    // Test long name
    fireEvent.change(nameInput, { target: { value: 'a'.repeat(51) } });
    expect(await screen.findByText('Name must be 50 characters or less')).toBeInTheDocument();
  });

  it('allows ability score generation', () => {
    render(<CharacterCreation onSubmit={mockSubmit} />);
    
    const rollButton = screen.getByText('Roll Ability Scores');
    fireEvent.click(rollButton);
    
    const strengthInput = screen.getByDisplayValue('10');
    expect(parseInt(strengthInput.getAttribute('value') || '0')).toBeGreaterThanOrEqual(3);
    expect(parseInt(strengthInput.getAttribute('value') || '0')).toBeLessThanOrEqual(18);
  });

  it('submits valid character data', async () => {
    render(<CharacterCreation onSubmit={mockSubmit} />);
    
    await act(async () => {
      fireEvent.change(screen.getByLabelText('Character Name'), { target: { value: 'Test Character' } });
      fireEvent.change(screen.getByLabelText('Race'), { target: { value: 'Elf' } });
      fireEvent.change(screen.getByLabelText('Class'), { target: { value: 'Wizard' } });
      fireEvent.change(screen.getByLabelText('Background'), { target: { value: 'Sage' } });
      fireEvent.submit(screen.getByRole('form'));
    });

    expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Test Character',
      race: 'Elf',
      class: 'Wizard',
      background: 'Sage'
    }));
  });

  it('shows loading state', () => {
    render(<CharacterCreation onSubmit={mockSubmit} isLoading={true} />);
    expect(screen.getByText('Creating character...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Creating...' })).toBeDisabled();
  });

  it('shows error message', () => {
    const errorMessage = 'Failed to create character';
    render(<CharacterCreation onSubmit={mockSubmit} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});