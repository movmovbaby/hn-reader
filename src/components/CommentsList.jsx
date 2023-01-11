import React from 'react';
import Comment from './Comment.jsx';

const CommentsList = ({ comments }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
