/**
 * Core type definitions for DungeonForge Online
 * Includes all interfaces and types needed for the main App component
 */

// Authentication state types
export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
};

export type User = {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  lastLogin?: string;
  roles: UserRole[];
};

export type UserRole = 'player' | 'dm' | 'admin';

// Routing types
export type AppRoute = {
  path: string;
  element: React.ReactNode;
  label: string;
  icon?: React.ReactNode;
  requiresAuth: boolean;
  requiredRoles?: UserRole[];
  hidden?: boolean;
};

// Character types (D&D 5e compliant)
export type AbilityScores = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

export type SkillProficiency = {
  name: string;
  proficient: boolean;
  expertise: boolean;
};

export type CharacterClass = {
  name: string;
  level: number;
  hitDice: string; // e.g. "1d10"
  subclass?: string;
};

export type CharacterRace = {
  name: string;
  subrace?: string;
  speed: number;
  traits: string[];
};

export type Character = {
  id: string;
  name: string;
  level: number;
  classes: CharacterClass[];
  race: CharacterRace;
  background: string;
  alignment: string;
  abilityScores: AbilityScores;
  skills: SkillProficiency[];
  hitPoints: {
    current: number;
    maximum: number;
    temporary?: number;
  };
  armorClass: number;
  initiative: number;
  speed: number;
  inventory: InventoryItem[];
  spells?: Spell[];
  features: Feature[];
  createdBy: string; // User ID
  campaignId?: string; // Optional campaign association
  createdAt: string;
  updatedAt: string;
};

export type InventoryItem = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  weight: number;
  equipped: boolean;
  attunement: 'none' | 'attuned' | 'requiresAttunement';
  rarity: 'common' | 'uncommon' | 'rare' | 'very rare' | 'legendary';
};

export type Spell = {
  id: string;
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  prepared: boolean;
  ritual: boolean;
  concentration: boolean;
};

export type Feature = {
  name: string;
  description: string;
  source: string; // e.g. "Race", "Class", "Feat"
};

// Campaign types
export type Campaign = {
  id: string;
  name: string;
  description: string;
  dmId: string; // User ID of the DM
  players: string[]; // Array of User IDs
  characters: string[]; // Array of Character IDs
  currentSessionId?: string;
  status: 'preparing' | 'active' | 'completed' | 'paused';
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  nextSession?: string; // ISO date string
};

export type Session = {
  id: string;
  campaignId: string;
  number: number;
  title: string;
  description: string;
  scheduledTime: string;
  duration: number; // in minutes
  status: 'scheduled' | 'in_progress' | 'completed' | 'canceled';
  notes?: string;
  combatEncounters: CombatEncounter[];
};

export type CombatEncounter = {
  id: string;
  name: string;
  round: number;
  turn: number;
  participants: CombatParticipant[];
  map?: GridMap;
  status: 'preparing' | 'active' | 'completed';
};

export type CombatParticipant = {
  id: string;
  type: 'player' | 'npc' | 'monster';
  characterId?: string; // For player characters
  monsterId?: string; // For monsters/NPCs
  initiative: number;
  currentHitPoints: number;
  conditions: Condition[];
  position?: GridPosition;
};

export type Condition = {
  name: string;
  duration?: number; // in rounds
  description: string;
};

export type GridMap = {
  width: number;
  height: number;
  cells: GridCell[][];
};

export type GridCell = {
  terrain: 'normal' | 'difficult' | 'impassable';
  occupied: boolean;
  visible: boolean;
  effects: MapEffect[];
};

export type MapEffect = {
  type: string;
  duration?: number;
  description: string;
};

export type GridPosition = {
  x: number;
  y: number;
};

// Activity types
export type Activity = {
  id: string;
  userId: string;
  type: ActivityType;
  timestamp: string;
  data: Record<string, unknown>;
  campaignId?: string;
  characterId?: string;
};

export type ActivityType =
  | 'character_created'
  | 'character_updated'
  | 'campaign_joined'
  | 'campaign_left'
  | 'session_started'
  | 'session_ended'
  | 'combat_started'
  | 'combat_ended'
  | 'dice_rolled'
  | 'message_sent';

// API response types
export type ApiResponse<T> = {
  data?: T;
  error?: ApiError;
  success: boolean;
};

export type ApiError = {
  code: string;
  message: string;
  details?: Record<string, unknown>;
};

// UI state types
export type UiState = {
  isLoading: boolean;
  activeCampaign?: string;
  activeCharacter?: string;
  activeView: 'campaign' | 'character' | 'combat';
  theme: 'light' | 'dark';
  notifications: Notification[];
};

export type Notification = {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: string;
  read: boolean;
};

// Event types for real-time communication
export type GameEvent = {
  type: GameEventType;
  payload: unknown;
  timestamp: string;
  userId: string;
  campaignId?: string;
};

export type GameEventType =
  | 'combat_turn_change'
  | 'character_move'
  | 'character_stat_change'
  | 'dice_roll'
  | 'chat_message'
  | 'combat_action';

// Props for main App component
export type AppProps = {
  initialAuthState?: Partial<AuthState>;
  routes: AppRoute[];
  defaultTheme?: 'light' | 'dark';
  apiBaseUrl: string;
  websocketUrl: string;
};