import {ReactNode} from 'react';
import styles from './Wrapper.module.css';


interface WrapperProps {
    children: ReactNode;
}

const Wrapper = ({children}: WrapperProps): JSX.Element => <div className={styles.wrapper}>{children}</div>;

export default Wrapper;
