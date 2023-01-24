import React from 'react';
import styles from './Main.module.css';

const Main = (props) => <main className={styles.main}>{props.children}</main>;

export default Main;
