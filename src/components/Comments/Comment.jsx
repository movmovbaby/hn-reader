import React, { useState, useEffect } from 'react';
import { fetchComments } from '../../api/hn-api.js';
import CommentsList from './CommentsList.jsx';
import dateFormat from '../../utils.js';
import styles from './Comments.module.css';


const Comment = ({ comment }) => {
  const [subComments, setSubComments] = useState(null);
  const [isSubCommentsVisible, setSubCommentsVisible] = useState(false);
  const date = dateFormat(comment.time);
  const kids = comment.kids;

  useEffect(() => {
    const getSubComments = async () => {
      if (kids) {
        const comments = await fetchComments(kids);
        setSubComments(comments);
      } else {
        return null;
      }
    };
    getSubComments();
  }, [kids]);

  const showComments = () => {
    setSubCommentsVisible(!isSubCommentsVisible);
  };

  return (
    comment.deleted || comment.dead ? null : (
      <div className={styles.comment}>
        <div className={styles['comment-meta']}>
          <span>{comment.by}</span>
          <span>at {date}</span>
          {subComments &&
            <a className={styles.button} onClick={() => showComments()}>
              {isSubCommentsVisible ? '[-]' : `[${subComments.length} more]`}
            </a>
          }
        </div>
        {comment.text &&
          <p className={styles.text} dangerouslySetInnerHTML={{ __html: comment.text }} />
        }
        {subComments &&
          <CommentsList comments={subComments} visible={isSubCommentsVisible} />
        }
      </div>
    )
  )
};

export default Comment;
