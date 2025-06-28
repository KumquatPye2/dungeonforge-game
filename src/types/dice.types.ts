// Type definitions for the DiceRoller component
export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';
export type DiceRollResult = {
  value: number;
  diceType: DiceType;
  timestamp: number;
};

export interface DiceRollerProps {
  onRollComplete?: (result: DiceRollResult) => void;
  disabled?: boolean;
  initialDiceType?: DiceType;
  size?: 'small' | 'medium' | 'large';
  ariaLabel?: string;
}

export interface DiceTypeOption {
  value: DiceType;
  label: string;
  maxValue: number;
}