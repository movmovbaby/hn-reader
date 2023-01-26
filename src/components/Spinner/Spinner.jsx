import React from 'react';
import styles from './Spinner.module.css';

const Spinner = () => (
  <div className={styles['spinner-wrapper']}>
    <p className={styles['spinner-text']}>Loading TOP 100 Hacker News stories</p>
  </div>
);

export default Spinner;
