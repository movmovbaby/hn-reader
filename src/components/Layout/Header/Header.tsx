import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = (): JSX.Element => (
  <header className={styles.header}>
    <Link to='/1'>
      <h1 className={styles.title}>Hacker News Top 100 Reader</h1>
    </Link>
  </header>
);

export default Header;
