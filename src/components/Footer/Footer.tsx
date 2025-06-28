import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>© {new Date().getFullYear()} DungeonForge Online - Not affiliated with Wizards of the Coast</p>
        <p>
          Dungeons & Dragons, D&D, and their respective logos are trademarks of Wizards of the Coast LLC.
        </p>
      </div>
    </footer>
  );
};

export default Footer;