import React from 'react';
import styles from './Dashboard.module.css';
import { DashboardProps } from './dashboard.types';

// Icons (would be imported from an actual icon library in production)
const DiceIcon = () => <span aria-hidden="true">🎲</span>;
const SwordIcon = () => <span aria-hidden="true">⚔️</span>;
const ScrollIcon = () => <span aria-hidden="true">📜</span>;
const PlusIcon = () => <span aria-hidden="true">➕</span>;
const CharacterIcon = () => <span aria-hidden="true">🧙</span>;
const CampaignIcon = () => <span aria-hidden="true">🏰</span>;
const ActivityIcon = () => <span aria-hidden="true">📅</span>;

const Dashboard: React.FC<DashboardProps> = ({
  characters,
  campaigns,
  recentActivities,
  isLoading,
  error,
  onCreateCharacter,
  onJoinCampaign,
  onRollDice,
  onOpenCombat,
}) => {
  if (isLoading) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.loading}>Loading your adventure...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.error}>
          <p>Failed to load dashboard data.</p>
          <p>{error.message}</p>
          <button 
            className={styles.button}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (date?: Date) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>DungeonForge Online</h1>
        <div className={styles.quickActions}>
          <button 
            className={styles.button} 
            onClick={onRollDice}
            aria-label="Open dice roller"
          >
            <DiceIcon /> Roll Dice
          </button>
          <button 
            className={styles.button} 
            onClick={onOpenCombat}
            aria-label="Open combat tracker"
          >
            <SwordIcon /> Combat
          </button>
        </div>
      </header>

      <div className={styles.grid}>
        {/* Characters Section */}
        <section className={styles.section} aria-labelledby="characters-heading">
          <h2 className={styles.sectionTitle} id="characters-heading">
            <CharacterIcon /> Your Characters
          </h2>
          {characters.length > 0 ? (
            characters.map((character) => (
              <div key={character.id} className={styles.characterCard}>
                <div className={styles.characterName}>{character.name}</div>
                <div className={styles.characterDetails}>
                  <span>{character.race}</span>
                  <span>•</span>
                  <span>Level {character.level} {character.class}</span>
                </div>
                {character.lastPlayed && (
                  <div className={styles.activityTime}>
                    Last played: {formatDate(character.lastPlayed)}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>No characters found</div>
          )}
          <button 
            className={styles.button} 
            onClick={onCreateCharacter}
            aria-label="Create new character"
          >
            <PlusIcon /> Create Character
          </button>
        </section>

        {/* Campaigns Section */}
        <section className={styles.section} aria-labelledby="campaigns-heading">
          <h2 className={styles.sectionTitle} id="campaigns-heading">
            <CampaignIcon /> Your Campaigns
          </h2>
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <div key={campaign.id} className={styles.campaignCard}>
                <div className={styles.campaignName}>{campaign.name}</div>
                <div className={styles.characterDetails}>
                  <span>DM: {campaign.dungeonMaster}</span>
                  <span>•</span>
                  <span>{campaign.playerCount} players</span>
                  <span>•</span>
                  <span>Level {campaign.currentLevel}</span>
                </div>
                {campaign.lastSession && (
                  <div className={styles.activityTime}>
                    Last session: {formatDate(campaign.lastSession)}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>No campaigns found</div>
          )}
          <button 
            className={styles.button} 
            onClick={onJoinCampaign}
            aria-label="Join a campaign"
          >
            <PlusIcon /> Join Campaign
          </button>
        </section>

        {/* Recent Activity Section */}
        <section className={styles.section} aria-labelledby="activity-heading">
          <h2 className={styles.sectionTitle} id="activity-heading">
            <ActivityIcon /> Recent Activity
          </h2>
          {recentActivities.length > 0 ? (
            recentActivities.map((activity) => (
              <div key={activity.id} className={styles.activityItem}>
                <div className={styles.activityTitle}>{activity.title}</div>
                <div>{activity.description}</div>
                <div className={styles.activityTime}>
                  {formatDate(activity.timestamp)}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>No recent activity</div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;