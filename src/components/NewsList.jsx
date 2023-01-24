import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { selectors as storiesSelectors } from '../store/storiesSlice.js';
import { dateFormat } from '../utils.js';

const NewsList = () => {
  const history = useHistory();
  const stories = useSelector(storiesSelectors.selectAll);
  stories.sort((a, b) => a.time > b.time ? -1 : 1);

  const handleClick = () => history.push('/');

  return stories && (
    <ul>
      {stories.map(({ title, score, by, time, id, descendants }) => {
        const date = dateFormat(time);
        return (
          <li key={id}>
            <article>
              <Link to={`/story/${id}`} onClick={handleClick}>
                <h2>{title}</h2>
                <span>{score} points</span>
                &nbsp;|&nbsp;
                <span>{by}</span>
                &nbsp;|&nbsp;
                <span>{date}</span>
                &nbsp;|&nbsp;
                <span>{descendants} comments</span>
              </Link>
            </article>
          </li>)
      })}
    </ul>
  )
};

export default NewsList;
