// Type definitions for Welcome component
export interface WelcomeProps {
  /**
   * Callback when character creation is initiated
   */
  onCharacterCreate: () => void;
  /**
   * Current number of active players
   */
  playerCount: number;
  /**
   * Loading state for multiplayer connection
   */
  isLoading?: boolean;
  /**
   * Error message if connection fails
   */
  error?: string | null;
}

export interface WelcomeStyles {
  container: string;
  title: string;
  subtitle: string;
  button: string;
  error: string;
  loading: string;
  playerCount: string;
  dndLogo: string;
}