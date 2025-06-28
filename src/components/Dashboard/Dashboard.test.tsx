import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';
import { DashboardProps } from './dashboard.types';

describe('Dashboard Component', () => {
  const mockProps: DashboardProps = {
    characters: [
      {
        id: '1',
        name: 'Erevan Sunshadow',
        class: 'Wizard',
        level: 5,
        race: 'High Elf',
        lastPlayed: new Date('2023-05-15'),
      },
    ],
    campaigns: [
      {
        id: '1',
        name: 'Curse of Strahd',
        dungeonMaster: 'DM Alex',
        currentLevel: 3,
        playerCount: 4,
        lastSession: new Date('2023-05-20'),
      },
    ],
    recentActivities: [
      {
        id: '1',
        type: 'campaign',
        title: 'Session Completed',
        description: 'Defeated the vampire spawn in the coffin maker\'s shop',
        timestamp: new Date('2023-05-20'),
        relatedId: '1',
      },
    ],
    isLoading: false,
    error: null,
    onCreateCharacter: jest.fn(),
    onJoinCampaign: jest.fn(),
    onRollDice: jest.fn(),
    onOpenCombat: jest.fn(),
  };

  it('renders without crashing', () => {
    render(<Dashboard {...mockProps} />);
    expect(screen.getByText('DungeonForge Online')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    render(<Dashboard {...mockProps} isLoading={true} />);
    expect(screen.getByText('Loading your adventure...')).toBeInTheDocument();
  });

  it('displays error state', () => {
    const error = new Error('Test error');
    render(<Dashboard {...mockProps} error={error} />);
    expect(screen.getByText('Failed to load dashboard data.')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('displays character data', () => {
    render(<Dashboard {...mockProps} />);
    expect(screen.getByText('Erevan Sunshadow')).toBeInTheDocument();
    expect(screen.getByText('Level 5 Wizard')).toBeInTheDocument();
  });

  it('displays campaign data', () => {
    render(<Dashboard {...mockProps} />);
    expect(screen.getByText('Curse of Strahd')).toBeInTheDocument();
    expect(screen.getByText('DM: DM Alex')).toBeInTheDocument();
  });

  it('displays activity data', () => {
    render(<Dashboard {...mockProps} />);
    expect(screen.getByText('Session Completed')).toBeInTheDocument();
  });

  it('calls onCreateCharacter when button clicked', () => {
    render(<Dashboard {...mockProps} />);
    fireEvent.click(screen.getByText('Create Character'));
    expect(mockProps.onCreateCharacter).toHaveBeenCalled();
  });

  it('calls onRollDice when button clicked', () => {
    render(<Dashboard {...mockProps} />);
    fireEvent.click(screen.getByText('Roll Dice'));
    expect(mockProps.onRollDice).toHaveBeenCalled();
  });
});