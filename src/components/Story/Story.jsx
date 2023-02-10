import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { selectors as storiesSelectors, actions as storiesActions } from '../../store/storiesSlice.js';
import { fetchComments, fetchStory } from '../../api/hn-api.js';
import CommentsList from '../Comments/CommentsList.jsx';
import dateFormat from '../../utils.js';
import styles from './Story.module.css';

const Story = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [story, setStory] = useState(null);
  const [comments, setComments] = useState([]);
  const { stories } = useSelector(state => state);

  useEffect(() => {
    if (stories.ids.length !== 0) {
      return;
    }
    const getStory = async (id) => {
      const story = await fetchStory(id);
      setStory(story);
      dispatch(storiesActions.addStory(story));
    }
    getStory();
  }, []);


  // const { url, title, time, by, descendants, text, kids } = story !== undefined ? story : useSelector((state) => storiesSelectors.selectById(state, id));
  const { url, title, time, by, descendants, text, kids } = useSelector((state) => storiesSelectors.selectById(state, id));
  const urlObj = typeof url === 'undefined' ? null : new URL(url);

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
    const story = await fetchStory(id);
    const { kids, descendants } = story;
    dispatch(storiesActions.updateStory({ id, changes: { kids, descendants } }));
    console.log('update story');
  };


  const date = dateFormat(time);

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
          {urlObj &&
            <span className={styles['small-text']}>link to original post&nbsp;<a href={url} className={styles['small-link']}>{urlObj.hostname}</a></span>
          }
        </div>
        {text &&
          (<div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />)
        }
      </div>
      <div>
        <div className={styles['comments-header']}>
          <h3 className={styles.title}>Comments</h3>
          <button className={`${styles.button} ${styles['comments-refresh']}`} onClick={() => updateStory()}>Refresh comments</button>
        </div>
        {comments && (
          <CommentsList comments={comments} visible />
        )}
      </div>
    </article >
  )
};

export default Story;
