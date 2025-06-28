import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          DungeonForge Online
        </Link>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/game" className={styles.navLink}>
              Game
            </Link>
          </li>
          <li>
            <Link to="/character-creation" className={styles.navLink}>
              Create Character
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;