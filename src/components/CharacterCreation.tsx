import React, { useState, useCallback } from 'react';
import { Character, CharacterCreationProps } from '../../types/character.types';
import styles from './CharacterCreation.module.css';

const CharacterCreation: React.FC<CharacterCreationProps> = ({ 
  onSubmit, 
  isLoading = false, 
  error = null 
}) => {
  const [character, setCharacter] = useState<Character>({
    name: '',
    race: 'Human',
    class: 'Fighter',
    background: 'Folk Hero',
    abilityScores: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10
    },
    equipment: [],
    level: 1
  });

  const [nameError, setNameError] = useState<string | null>(null);

  // Generate random ability scores (4d6 drop lowest)
  const generateAbilityScores = useCallback(() => {
    const rollDice = () => {
      const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
      rolls.sort((a, b) => a - b);
      return rolls.slice(1).reduce((sum, val) => sum + val, 0);
    };

    setCharacter(prev => ({
      ...prev,
      abilityScores: {
        strength: rollDice(),
        dexterity: rollDice(),
        constitution: rollDice(),
        intelligence: rollDice(),
        wisdom: rollDice(),
        charisma: rollDice()
      }
    }));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'name') {
      if (value.length > 50) {
        setNameError('Name must be 50 characters or less');
        return;
      } else {
        setNameError(null);
      }
    }

    if (name in character.abilityScores) {
      const score = parseInt(value, 10);
      if (isNaN(score) || score < 1 || score > 20) return;
      
      setCharacter(prev => ({
        ...prev,
        abilityScores: {
          ...prev.abilityScores,
          [name]: score
        }
      }));
    } else {
      setCharacter(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!character.name.trim()) {
      setNameError('Name is required');
      return;
    }

    if (nameError) return;

    onSubmit(character);
  };

  const races: Race[] = [
    'Human', 'Elf', 'Dwarf', 'Halfling', 
    'Dragonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling'
  ];

  const classes: CharacterClass[] = [
    'Barbarian', 'Bard', 'Cleric', 'Druid', 
    'Fighter', 'Monk', 'Paladin', 'Ranger', 
    'Rogue', 'Sorcerer', 'Warlock', 'Wizard'
  ];

  const backgrounds: Background[] = [
    'Acolyte', 'Charlatan', 'Criminal', 'Entertainer',
    'Folk Hero', 'Guild Artisan', 'Hermit', 'Noble',
    'Outlander', 'Sage', 'Sailor', 'Soldier', 'Urchin'
  ];

  return (
    <div className={styles.container} role="form" aria-labelledby="character-creation-header">
      <h1 id="character-creation-header" className={styles.header}>Create Your Character</h1>
      
      {error && <div className={styles.error} role="alert">{error}</div>}
      {isLoading && <div className={styles.loading}>Creating character...</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Character Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={character.name}
            onChange={handleInputChange}
            className={styles.input}
            maxLength={50}
            required
            aria-required="true"
            aria-invalid={!!nameError}
            aria-describedby={nameError ? "name-error" : undefined}
          />
          {nameError && (
            <span id="name-error" className={styles.error} role="alert">
              {nameError}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="race" className={styles.label}>Race</label>
          <select
            id="race"
            name="race"
            value={character.race}
            onChange={handleInputChange}
            className={styles.select}
          >
            {races.map(race => (
              <option key={race} value={race}>{race}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="class" className={styles.label}>Class</label>
          <select
            id="class"
            name="class"
            value={character.class}
            onChange={handleInputChange}
            className={styles.select}
          >
            {classes.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="background" className={styles.label}>Background</label>
          <select
            id="background"
            name="background"
            value={character.background}
            onChange={handleInputChange}
            className={styles.select}
          >
            {backgrounds.map(bg => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.label}>Ability Scores</div>
          <button 
            type="button" 
            onClick={generateAbilityScores}
            className={styles.button}
            style={{ marginBottom: '1rem' }}
          >
            Roll Ability Scores
          </button>
          <div className={styles.abilityScoreContainer}>
            {Object.entries(character.abilityScores).map(([ability, score]) => (
              <div key={ability} className={styles.abilityScore}>
                <label htmlFor={ability} className={styles.label}>
                  {ability.charAt(0).toUpperCase() + ability.slice(1)}
                </label>
                <input
                  type="number"
                  id={ability}
                  name={ability}
                  value={score}
                  onChange={handleInputChange}
                  min="1"
                  max="20"
                  className={styles.input}
                  style={{ textAlign: 'center' }}
                />
                <div className={styles.abilityScoreValue}>{score}</div>
              </div>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          className={styles.button}
          disabled={isLoading || !!nameError}
          aria-busy={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Character'}
        </button>
      </form>
    </div>
  );
};

export default CharacterCreation;