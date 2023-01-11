import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectors as storiesSelectors } from '../store/storiesSlice.js';
import { fetchComments } from '../api/hn-api.js';
import CommentsList from './CommentsList.jsx';

const Story = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const { url, title, time, by, descendants, text, kids } = useSelector((state) => storiesSelectors.selectById(state, id));

  useEffect(() => {
    const getComments = async () => {
      const comments = await fetchComments(kids);
      setComments(comments);
    };
    getComments();
  }, [])

  const date = new Date(time * 1000).toLocaleString();

  return (
    <article>
      <h2>{title}</h2>
      <a href={url}>[{url}]</a>
      &nbsp;|&nbsp;
      <span>posted at {date}</span>
      &nbsp;|&nbsp;
      <span>by {by}</span>
      &nbsp;|&nbsp;
      <span>{descendants} comments</span>
      &nbsp;|&nbsp;
      <p>{text}</p>
      <div>
        <CommentsList comments={comments} />
      </div>
    </article>
  )
};

export default Story;
