import React from 'react';
import styles from './Header.module.css';

const Header = (): JSX.Element => (
  <header className={styles.header}>
    <h1 className={styles.title}>Hacker News Top 100 Reader</h1>
  </header>
);

export default Header;
