import React from 'react';
import styles from './Main.module.css';

const Main = ({children}: {children: JSX.Element}): JSX.Element => {
  return <main className={styles.main}>{children}</main>;
};

export default Main;
