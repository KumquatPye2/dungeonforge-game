// Type definitions for DungeonForge Online
export interface User {
  id: string;
  username: string;
  email: string;
  characters: Character[];
  currentCampaign?: string;
}

export interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  inventory: Item[];
}

export interface Item {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'consumable' | 'misc';
  description: string;
}

export interface Campaign {
  id: string;
  name: string;
  dmId: string;
  players: string[];
  currentSession?: string;
}

export interface GameState {
  user: User | null;
  currentCampaign: Campaign | null;
  loading: boolean;
  error: string | null;
}

export type AppRoute = {
  path: string;
  name: string;
  component: React.ComponentType;
  icon: React.ReactNode;
  requiresAuth: boolean;
};