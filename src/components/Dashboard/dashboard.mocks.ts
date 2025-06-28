import { Character, Campaign, Activity } from './dashboard.types';

export const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Erevan Sunshadow',
    class: 'Wizard',
    level: 5,
    race: 'High Elf',
    lastPlayed: new Date('2023-05-15'),
  },
  {
    id: '2',
    name: 'Thorin Ironfist',
    class: 'Fighter',
    level: 3,
    race: 'Mountain Dwarf',
    lastPlayed: new Date('2023-05-10'),
  },
];

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Curse of Strahd',
    dungeonMaster: 'DM Alex',
    currentLevel: 3,
    playerCount: 4,
    lastSession: new Date('2023-05-20'),
  },
  {
    id: '2',
    name: 'Storm King\'s Thunder',
    dungeonMaster: 'DM Jordan',
    currentLevel: 7,
    playerCount: 5,
    lastSession: new Date('2023-05-18'),
  },
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'campaign',
    title: 'Session Completed',
    description: 'Defeated the vampire spawn in the coffin maker\'s shop',
    timestamp: new Date('2023-05-20'),
    relatedId: '1',
  },
  {
    id: '2',
    type: 'character',
    title: 'Level Up!',
    description: 'Thorin Ironfist reached level 3',
    timestamp: new Date('2023-05-10'),
    relatedId: '2',
  },
  {
    id: '3',
    type: 'system',
    title: 'New Feature',
    description: 'Combat tracker has been updated',
    timestamp: new Date('2023-05-05'),
  },
];