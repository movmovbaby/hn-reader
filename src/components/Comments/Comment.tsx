import React, { useState, useEffect } from 'react';
import { fetchItems } from '../../api/hn-api';
import CommentsList from './CommentsList';
import dateFormat from '../../utils';
import styles from './Comments.module.css';
import { Item } from '../../types/index';


const Comment = ({ comment }: {comment : Item}): JSX.Element | null => {
  const [subComments, setSubComments] = useState<Item[] | null>(null);
  const [isSubCommentsVisible, setSubCommentsVisible] = useState(false);
  const date = dateFormat(comment.time);
  const kids = comment.kids;

  useEffect(() => {
    const getSubComments = async () => {
      if (kids) {
        const comments = await fetchItems(kids);
        setSubComments(comments);
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
  );
};

export default Comment;
