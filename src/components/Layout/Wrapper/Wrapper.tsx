import React from 'react';
import styles from './Wrapper.module.css';

const Wrapper = (
  {children}: {children: JSX.Element})
  : JSX.Element => <div className={styles.wrapper}>{children}</div>;

export default Wrapper;
