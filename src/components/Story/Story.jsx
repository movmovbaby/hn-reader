import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { selectors as storiesSelectors, actions as storiesActions } from '../../store/storiesSlice.js';
import { fetchComments, fetchStory } from '../../api/hn-api.js';
import CommentsList from '../Comments/CommentsList.jsx';
import styles from './Story.module.css';
import { dateFormat } from '../../utils.js';

const Story = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [comments, setComments] = useState([]);
  const { url, title, time, by, descendants, text, kids } = useSelector((state) => storiesSelectors.selectById(state, id));
  const { hostname } = new URL(url);

  useEffect(() => {
    const getComments = async () => {
      if (kids === undefined) {
        return;
      }
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
    <article className={styles.article}>
      <button className={styles.button} onClick={() => history.goBack()}>Back to Top</button>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.meta}>
            <small className={styles['small-text']}>posted at {date}</small>
            <small className={styles['small-text']}>by {by}</small>
            {(typeof descendants === 'undefined')
              ? null
              : <small className={styles['small-text']}>{descendants} comments</small>}
          </div>
          <span className={styles['small-text']}>link to original post&nbsp;<a href={url} className={styles['small-link']}>{hostname}</a></span>
        </div>
        {text &&
          (<div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />)
        }
      </div>
      <div>
        <div className={styles['comments-header']}>
          <h3 className={styles.title}>Comments</h3>
          <button className={`${styles.button} ${styles['comments-refresh']}`} onClick={() => updateEntity()}>Refresh comments</button>
        </div>
        {comments && (
          <CommentsList comments={comments} visible />
        )}
      </div>
    </article >
  )
};

export default Story;
