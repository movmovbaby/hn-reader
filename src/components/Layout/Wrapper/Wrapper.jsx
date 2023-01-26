import React from 'react';
import styles from './Wrapper.module.css';

const Wrapper = (props) => <div className={styles.wrapper}>{props.children}</div>;

export default Wrapper;
