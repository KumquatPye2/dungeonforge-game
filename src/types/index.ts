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

// AI Campaign System Types
export interface AICampaign {
  id: string;
  name: string;
  theme: CampaignTheme;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Deadly';
  currentLocation: string;
  playerCharacter: Character;
  worldState: WorldState;
  sessionHistory: SessionEvent[];
  isActive: boolean;
  createdAt: Date;
  lastPlayedAt: Date;
}

export interface CampaignTheme {
  setting: 'High Fantasy' | 'Dark Fantasy' | 'Urban Fantasy' | 'Steampunk' | 'Cosmic Horror';
  tone: 'Heroic' | 'Gritty' | 'Comedic' | 'Mystery' | 'Horror';
  scope: 'Local' | 'Regional' | 'Continental' | 'Planar';
}

export interface WorldState {
  currentChapter: number;
  questLog: Quest[];
  npcs: NPC[];
  locations: Location[];
  playerReputation: Record<string, number>;
  worldEvents: WorldEvent[];
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'Main' | 'Side' | 'Personal';
  status: 'Active' | 'Completed' | 'Failed' | 'Available';
  objectives: QuestObjective[];
  rewards: QuestReward[];
}

export interface NPC {
  id: string;
  name: string;
  role: string;
  personality: string[];
  relationship: number; // -100 to 100
  location: string;
  isAlive: boolean;
  questsGiven: string[];
}

export interface Location {
  id: string;
  name: string;
  type: 'Town' | 'Dungeon' | 'Wilderness' | 'Landmark';
  description: string;
  isDiscovered: boolean;
  npcs: string[];
  exits: LocationExit[];
}

export interface SessionEvent {
  id: string;
  timestamp: Date;
  type: 'Combat' | 'Dialogue' | 'Exploration' | 'Quest' | 'Level Up';
  description: string;
  choices: PlayerChoice[];
  outcome: string;
}

export interface PlayerChoice {
  option: string;
  selected: boolean;
  consequences: string[];
}

// AI Integration Types
export interface AIResponse {
  narrative: string;
  choices: string[];
  worldUpdates: Partial<WorldState>;
  combatEncounter?: CombatEncounter;
  questUpdates?: QuestUpdate[];
}

export interface CombatEncounter {
  enemies: Enemy[];
  environment: string;
  initiative: InitiativeOrder[];
  isActive: boolean;
}

// Supporting Types for AI Campaign System
export interface WorldEvent {
  id: string;
  type: 'Political' | 'Natural' | 'Magical' | 'Economic';
  description: string;
  isActive: boolean;
  startDate: Date;
  endDate?: Date;
}

export interface QuestObjective {
  id: string;
  description: string;
  isCompleted: boolean;
  isOptional: boolean;
}

export interface QuestReward {
  type: 'Experience' | 'Gold' | 'Item' | 'Reputation';
  amount: number;
  description: string;
}

export interface LocationExit {
  direction: string;
  destination: string;
  description: string;
  isLocked: boolean;
  requirements?: string[];
}

export interface QuestUpdate {
  questId: string;
  objectiveId?: string;
  newStatus: string;
  description: string;
}

export interface Enemy {
  id: string;
  name: string;
  type: string;
  hitPoints: number;
  maxHitPoints: number;
  armorClass: number;
  abilities: Ability[];
  position: Position;
}

export interface InitiativeOrder {
  entityId: string;
  entityName: string;
  initiative: number;
  isPlayer: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export interface Ability {
  name: string;
  description: string;
  damage?: string;
  range?: number;
  cooldown?: number;
}
