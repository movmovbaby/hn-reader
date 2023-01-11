import React from 'react';

const Comment = ({ comment }) => {
  const date = new Date(comment.time * 1000).toLocaleString();
  return (
    <div>
      <span>{comment.by}</span>&nbsp;|
      <span>{date}</span>&nbsp;
      {comment.kids && (<button>More</button>)}
      <p>{comment.text}</p>
    </div>
  )
};

export default Comment;
