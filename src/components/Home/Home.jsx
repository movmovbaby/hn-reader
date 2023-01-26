import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors as storiesSelectors } from '../../store/storiesSlice.js';
import { actions as storiesActions } from '../../store/storiesSlice.js';
import { getStories } from '../../api/hn-api.js';
import NewsList from '../NewsList/NewsList.jsx';

const Home = () => {
  const dispatch = useDispatch();
  const stories = useSelector(storiesSelectors.selectAll);
  stories.sort((a, b) => a.time > b.time ? -1 : 1);

  const refreshStories = async () => {
    console.log('refresh stories')
    const stories = await getStories();
    dispatch(storiesActions.addStories(stories));

    return setTimeout(() => refreshStories(), 5000);
  };

  useEffect(() => {
    refreshStories();
  }, [])

  return (
    <NewsList stories={stories} />
  )
};

export default Home;
