import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CharacterCreationForm from './CharacterCreationForm';
import { useAuth } from '../../contexts/AuthContext';

// Mock the auth context
jest.mock('../../contexts/AuthContext');

describe('CharacterCreationForm', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: {
        uid: 'test-user-123',
        getIdToken: jest.fn().mockResolvedValue('test-token')
      }
    });
  });

  it('renders the form with default values', () => {
    render(<CharacterCreationForm />);
    
    expect(screen.getByLabelText('Character Name')).toHaveValue('');
    expect(screen.getByLabelText('Race')).toHaveValue('Human');
    expect(screen.getByLabelText('Class')).toHaveValue('Fighter');
    expect(screen.getByLabelText('Background')).toHaveValue('Folk Hero');
    
    // Check default ability scores
    expect(screen.getByLabelText('Strength')).toHaveValue(8);
    expect(screen.getByLabelText('Dexterity')).toHaveValue(8);
  });

  it('validates required fields', async () => {
    render(<CharacterCreationForm />);
    
    fireEvent.click(screen.getByText('Create Character'));
    
    await waitFor(() => {
      expect(screen.getByText('Character name is required')).toBeInTheDocument();
    });
  });

  it('updates ability scores