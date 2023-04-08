import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import dateFormat from '../../utils';
import styles from './NewsList.module.css';

const NewsList = ({ stories }) => {
  const history = useHistory();
  const handleClick = () => history.push('/');

  return stories && (
    stories.map(({ title, score, by, time, id }, index) => {
      const date = dateFormat(time);
      return (
        <article key={id} className={styles.news}>
          <Link to={`/story/${id}`} onClick={handleClick} className={styles.link}>
            <div className={styles.rank}><span>{index + 1}.</span></div>
            <div className={styles.container}>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.meta}>
                <small className={styles.small}>{score} points</small>
                <small className={styles.small}>by <i>{by}</i></small>
                <small className={styles.small}>posted at {date}</small>
              </div>
            </div>
          </Link>
        </article >);
    })
  );
};

export default NewsList;
