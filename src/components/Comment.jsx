import React, { useState, useEffect } from 'react';
import { fetchComments } from '../api/hn-api.js';
import CommentsList from './CommentsList.jsx';

const Comment = ({ comment }) => {
  const [subComments, setSubComments] = useState(null);
  const [isSubCommentsVisible, setSubCommentsVisible] = useState(false);
  const date = new Date(comment.time * 1000).toLocaleString();
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
    console.log('op')
    setSubCommentsVisible(!isSubCommentsVisible)
  };

  return (
    <div>
      <span>{comment.by}</span>&nbsp;|
      <span>{date}</span>&nbsp;
      {subComments &&
        <button onClick={showComments}>More</button>
      }
      {comment.text &&
        <p dangerouslySetInnerHTML={{ __html: comment.text }} />
      }
      {subComments &&
        <CommentsList comments={subComments} visible={isSubCommentsVisible} />
      }
    </div>
  )
};

export default Comment;
