import React from 'react';
import { Link } from 'react-router-dom';

const NewsList = () => {
  return (
    <ul>
      <li>
        <Link to="story/123123">LINK TO</Link>
      </li>
    </ul>
  )
};

export default NewsList;
