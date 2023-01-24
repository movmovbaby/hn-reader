import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { selectors as storiesSelectors, actions as storiesActions } from '../../store/storiesSlice.js';
import { fetchComments, fetchStory } from '../../api/hn-api.js';
import CommentsList from './CommentsList.jsx';
import { dateFormat } from '../../utils.js';

const Story = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [comments, setComments] = useState([]);
  const { url, title, time, by, descendants, text, kids } = useSelector((state) => storiesSelectors.selectById(state, id));

  useEffect(() => {
    const getComments = async () => {
      const comments = await fetchComments(kids);
      setComments(comments);
    };
    getComments();
  }, [kids]);

  const date = dateFormat(time);

  const updateEntity = async () => {
    const story = await fetchStory(id);
    const { kids, descendants } = story;
    dispatch(storiesActions.updateStory({ id, changes: { kids, descendants } }));
    console.log('update story');
  };

  return (
    <article>
      <button onClick={() => history.goBack()}>Back to Top</button>
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
        <h2>Comments</h2>
        <button onClick={() => updateEntity()}>Refresh comments</button>
        {comments && (
          <CommentsList comments={comments} visible />
        )}
      </div>
    </article >
  )
};

export default Story;
