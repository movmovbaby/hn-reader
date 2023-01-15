import React, { useState } from 'react';
import Comment from './Comment.jsx';

const CommentsList = ({ comments, visible }) => {
  return (
    <ul style={{ display: visible ? 'block' : 'none' }}>
      {comments.map((comment) => (
        <li key={comment.id}>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
