import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectors as storiesSelectors } from '../store/storiesSlice.js';

const NewsList = () => {
  const stories = useSelector(storiesSelectors.selectAll);

  return stories && (
    <ul>
      {stories.map(({ title, score, by, time, id }) => {
        const date = new Date(time * 1000);
        return (
          <li key={id}>
            <article>
              <Link to={`/story/${id}`}>
                <h2>{title}</h2>
                <span>{score} points</span>
                &nbsp;|&nbsp;
                <span>{by}</span>
                &nbsp;|&nbsp;
                <span>{date.toLocaleString('ru-RU')}</span>
              </Link>
            </article>
          </li>)
      })}
    </ul>
  )
};

export default NewsList;
