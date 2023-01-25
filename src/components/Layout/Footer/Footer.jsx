import React from 'react';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <a href="news.ycombinator.com" className={`${styles.link} ${styles.item}`}>Hacker news site</a>
    <span className={`${styles.text} ${styles.item}`}>repository at&nbsp;<a href="https://github.com/movmovbaby/hn-reader" className={styles.link}>github</a></span>
  </footer>);

export default Footer;
