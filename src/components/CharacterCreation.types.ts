// Type definitions for Character Creation component
export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface CharacterRace {
  id: string;
  name: string;
  description: string;
  statBonuses: Partial<CharacterStats>;
  speed: number;
  features: string[];
}

export interface CharacterClass {
  id: string;
  name: string;
  description: string;
  hitDie: number;
  primaryAbility: keyof CharacterStats;
  savingThrows: (keyof CharacterStats)[];
  features: string[];
}

export interface CharacterBackground {
  id: string;
  name: string;
  description: string;
  skillProficiencies: string[];
  toolProficiencies: string[];
  languages: string[];
  equipment: string[];
  feature: string;
}

export interface CharacterCreationData {
  name: string;
  race: CharacterRace | null;
  class: CharacterClass | null;
  background: CharacterBackground | null;
  stats: CharacterStats;
  alignment: string;
  experience: number;
}