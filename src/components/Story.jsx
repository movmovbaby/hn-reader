import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectors as storiesSelectors } from '../store/storiesSlice.js';

const Story = () => {
  const { id } = useParams();

  const { url, title, time, by, descendants, kids } = useSelector((state) => storiesSelectors.selectById(state, id));
  const date = new Date(time * 1000);

  return (
    <article>
      <h2>{title}</h2>
      <span>{url}</span>
      <span>{date.toLocaleString()}</span>
      <span>{by}</span>
      <span>{descendants}</span>
      <div>{JSON.stringify(kids)}</div>
    </article>
  )
};

export default Story;
