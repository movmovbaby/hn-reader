import React from 'react';
import Comment from './Comment.jsx';
import styles from './Comments.module.css';

const CommentsList = ({ comments, visible }) => {
  return (
    <ul className={styles['comments-list']} style={{ display: visible ? 'block' : 'none' }}>
      {comments.map((comment) => (
        comment.deleted || comment.dead ? null : (
          <li key={comment.id}>
            <Comment comment={comment} />
          </li>)
      ))}
    </ul>
  );
};

export default CommentsList;
