import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { dateFormat } from '../../utils';
import styles from './NewsList.module.css';
import { Item } from '../../types/index';
import { NEWS_PER_PAGE } from '../../constants';

interface NewsListProps {
  stories: Item[];
  pageNumber: number;
}

const NewsList = ({stories, pageNumber}: NewsListProps): JSX.Element => {
  const history = useHistory();
  const handleClick = () => history.push(`/${pageNumber}`);

  return stories && (
    <>
      {
      stories.map(({ title, score, by, time, id }: Item, index: number): JSX.Element => {
        const date = dateFormat(time);
        const startIndex = pageNumber * NEWS_PER_PAGE - (NEWS_PER_PAGE - 1);
        return (
          <article key={id} className={styles.news}>
            <Link to={`/story/${id}`} onClick={handleClick} className={styles.link}>
              <div className={styles.rank}><span>{startIndex + index}.</span></div>
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
      }
    </>
    
  );
};

export default NewsList;
