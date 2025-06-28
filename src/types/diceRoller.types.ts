// Type definitions for DiceRoller component
export type DiceType = 4 | 6 | 8 | 10 | 12 | 20 | 100;
export type DiceRollResult = {
  value: number;
  diceType: DiceType;
  timestamp: number;
};

export interface DiceRollerProps {
  onRollComplete: (result: DiceRollResult) => void;
  disabled?: boolean;
  initialDiceType?: DiceType;
  playerColor?: string;
  ariaLabel?: string;
}

export interface DiceState {
  isRolling: boolean;
  currentValue: number;
  diceType: DiceType;
}