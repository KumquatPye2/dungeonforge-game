// Type definitions for D&D character creation
export type AbilityScores = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

export type CharacterRace =
  | 'Human'
  | 'Elf'
  | 'Dwarf'
  | 'Halfling'
  | 'Dragonborn'
  | 'Gnome'
  | 'Half-Elf'
  | 'Half-Orc'
  | 'Tiefling';

export type CharacterClass =
  | 'Barbarian'
  | 'Bard'
  | 'Cleric'
  | 'Druid'
  | 'Fighter'
  | 'Monk'
  | 'Paladin'
  | 'Ranger'
  | 'Rogue'
  | 'Sorcerer'
  | 'Warlock'
  | 'Wizard';

export type CharacterBackground =
  | 'Acolyte'
  | 'Charlatan'
  | 'Criminal'
  | 'Entertainer'
  | 'Folk Hero'
  | 'Guild Artisan'
  | 'Hermit'
  | 'Noble'
  | 'Outlander'
  | 'Sage'
  | 'Sailor'
  | 'Soldier'
  | 'Urchin';

export type Character = {
  id?: string;
  name: string;
  race: CharacterRace;
  class: CharacterClass;
  background: CharacterBackground;
  level: number;
  abilityScores: AbilityScores;
  hitPoints: number;
  skills: string[];
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CharacterCreationErrors = {
  name?: string;
  race?: string;
  class?: string;
  background?: string;
  abilityScores?: Record<keyof AbilityScores, string>;
  general?: string;
};

export type CharacterCreationResponse = {
  character?: Character;
  errors?: CharacterCreationErrors;
  success: boolean;
};