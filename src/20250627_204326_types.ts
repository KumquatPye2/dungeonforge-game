// Define core types for our D&D application
interface Player {
  id: string;
  name: string;
  level: number;
  class: string;
}

interface GameSession {
  id: string;
  players: Player[];
  currentTurn?: string;
  status: 'lobby' | 'combat' | 'exploration';
}

type NavigationItem = {
  id: string;
  label: string;
  path: string;
  disabled?: boolean;
};