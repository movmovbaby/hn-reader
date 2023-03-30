import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actions as storiesActions } from '../../store/storiesSlice.js';
import CommentsList from '../../components/Comments/CommentsList.jsx';
import dateFormat from '../../utils.js';
import { fetchComments, fetchItem } from '../../api/hn-api.js';
import styles from './Story.module.css';

const Story = ({ story }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [isRefreshingComments, setIsRefreshingComments] = useState(false);

  const { id, url, title, time, by, descendants, text, kids } = story;
  const _URL = typeof url === 'undefined' ? null : new URL(url);

  const date = dateFormat(time);

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

  const updateStory = async () => {
    setIsRefreshingComments(true);
    const story = await fetchItem(id);
    const { kids, descendants } = story;
    dispatch(storiesActions.updateStory({ id, changes: { kids, descendants } }));
    setIsRefreshingComments(false);
  };

  return (
    <article className={styles.article}>
      <button className={styles.button} onClick={() => history.goBack()}>Back to Top News</button>
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
          {_URL &&
            <span className={styles['small-text']}>link to original post&nbsp;<a href={url} className={styles['small-link']}>{_URL.hostname}</a></span>
          }
        </div>
        {text &&
          (<div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />)
        }
      </div>
      <div>
        <div className={styles['comments-header']}>
          <h3 className={styles.title}>Comments</h3>
          <button className={`${styles.button} ${styles['comments-refresh']}`} onClick={() => updateStory()}>
            {isRefreshingComments
              ? 'Refreshing...'
              : 'Refresh comments'}</button>
        </div>
        {comments && (
          <CommentsList comments={comments} visible />
        )}
      </div>
    </article >
  )
}

export default Story;
