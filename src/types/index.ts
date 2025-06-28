// TODO: AI Sprint - Expand type definitions as needed
// This is a functional stub to make the app runnable

import { ReactElement } from 'react';

// App State Management
export interface AppState {
  isLoading: boolean;
  error: string | null;
  currentRoute: string;
  theme: AppTheme;
}

export interface AppTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  error: string;
  warning: string;
  success: string;
}

// Routing Configuration
export interface RouteConfig {
  path: string;
  element: ReactElement;
  label: string;
  icon?: string;
  requiresAuth?: boolean;
}

// User and Authentication
export interface User {
  id: string;
  username: string;
  email: string;
  characters: Character[];
  currentCampaign?: string;
}

// Character System
export interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  stats: CharacterStats;
  equipment?: Equipment[];
  spells?: Spell[];
}

export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  hitPoints: number;
  armorClass: number;
  speed: number;
}

// Game Systems
export interface DiceRoll {
  sides: number;
  count: number;
  modifier: number;
  result?: number[];
  total?: number;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  dungeonMaster: string;
  players: string[];
  characters: string[];
  sessions: GameSession[];
}

export interface GameSession {
  id: string;
  date: Date;
  summary: string;
  participants: string[];
}

// Equipment and Items
export interface Equipment {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'tool' | 'misc';
  description: string;
  weight: number;
  value: number;
}

export interface Spell {
  id: string;
  name: string;
  level: number;
  school: string;
  description: string;
  components: string[];
  duration: string;
  range: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Event Types
export interface GameEvent {
  type: 'dice_roll' | 'character_action' | 'chat_message';
  timestamp: Date;
  data: any;
}
