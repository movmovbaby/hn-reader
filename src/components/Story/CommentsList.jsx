import React from 'react';
import Comment from './Comment.jsx';

const CommentsList = ({ comments, visible }) => {
  return (
    <ul style={{ display: visible ? 'block' : 'none' }}>
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
