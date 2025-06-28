import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Character, 
  CharacterRace, 
  CharacterClass, 
  CharacterBackground,
  AbilityScores,
  CharacterCreationErrors
} from '../../types/character.types';
import styles from './CharacterCreationForm.module.css';

// Default ability scores for a new character
const DEFAULT_ABILITY_SCORES: AbilityScores = {
  strength: 8,
  dexterity: 8,
  constitution: 8,
  intelligence: 8,
  wisdom: 8,
  charisma: 8
};

// Available points for point-buy system
const POINT_BUY_POINTS = 27;

const CharacterCreationForm: React.FC = () => {
  const { currentUser } = useAuth();
  const [character, setCharacter] = useState<Character>({
    name: '',
    race: 'Human',
    class: 'Fighter',
    background: 'Folk Hero',
    level: 1,
    abilityScores: { ...DEFAULT_ABILITY_SCORES },
    hitPoints: 0,
    skills: [],
    userId: currentUser?.uid || ''
  });

  const [errors, setErrors] = useState<CharacterCreationErrors>({});
  const [remainingPoints, setRemainingPoints] = useState(POINT_BUY_POINTS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Calculate remaining points whenever ability scores change
  useEffect(() => {
    let pointsUsed = 0;
    Object.values(character.abilityScores).forEach(score => {
      if (score >= 13) pointsUsed += score - 8;
      else if (score === 12) pointsUsed += 3;
      else if (score === 11) pointsUsed += 2;
      else if (score === 10) pointsUsed += 1;
      else if (score === 9) pointsUsed += 0;
      else if (score === 8) pointsUsed += 0;
    });
    setRemainingPoints(POINT_BUY_POINTS - pointsUsed);
  }, [character.abilityScores]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name in character.abilityScores) {
      const abilityName = name as keyof AbilityScores;
      const newValue = parseInt(value, 10) || 8;
      
      setCharacter(prev => ({
        ...prev,
        abilityScores: {
          ...prev.abilityScores,
          [abilityName]: newValue
        }
      }));
    } else {
      setCharacter(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: CharacterCreationErrors = {};

    // Name validation
    if (!character.name.trim()) {
      newErrors.name = 'Character name is required';
    } else if (character.name.length > 50) {
      newErrors.name = 'Name must be 50 characters or less';
    }

    // Ability score validation
    const abilityErrors: Record<string, string> = {};
    Object.entries(character.abilityScores).forEach(([key, value]) => {
      if (value < 8 || value > 15) {
        abilityErrors[key] = 'Score must be between 8 and 15';
      }
    });

    if (Object.keys(abilityErrors).length > 0) {
      newErrors.abilityScores = abilityErrors as Record<keyof AbilityScores, string>;
    }

    // Point buy validation
    if (remainingPoints < 0) {
      newErrors.general = 'You have exceeded your available points';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage('');
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await currentUser?.getIdToken()}`
        },
        body: JSON.stringify(character)
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { general: 'Failed to create character' });
        setSubmitMessage('Failed to create character');
      } else {
        setSubmitMessage('Character created successfully!');
        // Reset form or redirect to character sheet
      }
    } catch (error) {
      setErrors({ general: 'Network error occurred' });
      setSubmitMessage('Failed to create character');
    } finally {
      setIsSubmitting(false);
    }
  };

  const abilityScoreCost = (score: number): number => {
    if (score >= 13) return score - 8;
    if (score === 12) return 3;
    if (score === 11) return 2;
    if (score === 10) return 1;
    return 0;
  };

  return (
    <div className={styles.container} aria-labelledby="character-creation-heading">
      <h1 id="character-creation-heading">Create New Character</h1>
      
      {errors.general && (
        <div className={styles.error} role="alert">
          {errors.general}
        </div>
      )}

      {submitMessage && !errors.general && (
        <div className={styles.message} role="status">
          {submitMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <h2>Basic Information</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="name">Character Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={character.name}
              onChange={handleInputChange}
              required
              aria-required="true"
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <span className={styles.errorMessage} role="alert">
                {errors.name}
              </span>
            )}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="race">Race</label>
              <select
                id="race"
                name="race"
                value={character.race}
                onChange={handleInputChange}
                aria-invalid={!!errors.race}
              >
                {Object.values([
                  'Human', 'Elf', 'Dwarf', 'Halfling', 'Dragonborn',
                  'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling'
                ]).map(race => (
                  <option key={race} value={race}>{race}</option>
                ))}
              </select>
              {errors.race && (
                <span className={styles.errorMessage} role="alert">
                  {errors.race}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="class">Class</label>
              <select
                id="class"
                name="class"
                value={character.class}
                onChange={handleInputChange}
                aria-invalid={!!errors.class}
              >
                {Object.values([
                  'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter',
                  'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer',
                  'Warlock', 'Wizard'
                ]).map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
              {errors.class && (
                <span className={styles.errorMessage} role="alert">
                  {errors.class}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="background">Background</label>
              <select
                id="background"
                name="background"
                value={character.background}
                onChange={handleInputChange}
                aria-invalid={!!errors.background}
              >
                {Object.values([
                  'Acolyte', 'Charlatan', 'Criminal', 'Entertainer',
                  'Folk Hero', 'Guild Artisan', 'Hermit', 'Noble',
                  'Outlander', 'Sage', 'Sailor', 'Soldier', 'Urchin'
                ]).map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
              {errors.background && (
                <span className={styles.errorMessage} role="alert">
                  {errors.background}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>Ability Scores (Point Buy System)</h2>
          <p className={styles.pointsRemaining}>
            Points Remaining: <span className={remainingPoints < 0 ? styles.negative : ''}>
              {remainingPoints}
            </span>
          </p>

          <div className={styles.abilityScores}>
            {Object.entries(character.abilityScores).map(([ability, score]) => (
              <div key={ability} className={styles.abilityScore}>
                <label htmlFor={ability}>{ability.charAt(0).toUpperCase() + ability.slice(1)}</label>
                <input
                  type="number"
                  id={ability}
                  name={ability}
                  min="8"
                  max="15"
                  value={score}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.abilityScores?.[ability as keyof AbilityScores]}
                />
                <span className={styles.abilityCost}>
                  Cost: {abilityScoreCost(score)}
                </span>
                {errors.abilityScores?.[ability as keyof AbilityScores] && (
                  <span className={styles.errorMessage} role="alert">
                    {errors.abilityScores[ability as keyof AbilityScores]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formActions}>
          <button
            type="submit"
            disabled={isSubmitting || remainingPoints < 0}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Character'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CharacterCreationForm;