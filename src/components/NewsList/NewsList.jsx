import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { selectors as storiesSelectors } from '../../store/storiesSlice.js';
import { dateFormat } from '../../utils.js';
import styles from './NewsList.module.css';

const NewsList = () => {
  const history = useHistory();
  const stories = useSelector(storiesSelectors.selectAll);
  stories.sort((a, b) => a.time > b.time ? -1 : 1);

  const handleClick = () => history.push('/');

  return stories && (
    stories.map(({ title, score, by, time, id }, index) => {
      const date = dateFormat(time);
      return (
        <article key={id} className={styles.news}>
          <Link to={`/story/${id}`} onClick={handleClick} className={styles.link}>
            <div className={styles.rank}>{index + 1}.</div>
            <div className={styles.container}>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.meta}>
                <small>{score} points</small>
                <small>by {by}</small>
                <small>posted at {date}</small>
              </div>
            </div>
          </Link>
        </article >)
    })
  )
};

export default NewsList;
