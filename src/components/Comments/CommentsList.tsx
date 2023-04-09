import React from 'react';
import Comment from './Comment';
import styles from './Comments.module.css';
import { Item } from '../../types/index.js';

const CommentsList = ({ comments, visible }: {comments: Item[], visible: boolean}):JSX.Element => {
  return (
    <ul className={styles['comments-list']} style={{ display: visible ? 'block' : 'none' }}>
      {comments.map((comment: Item): JSX.Element | null => (
        comment.deleted || comment.dead ? null : (
          <li key={comment.id}>
            <Comment comment={comment} />
          </li>)
      ))}
    </ul>
  );
};

export default CommentsList;
