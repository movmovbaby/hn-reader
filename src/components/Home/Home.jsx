import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors as storiesSelectors } from '../../store/storiesSlice.js';
import { actions as storiesActions } from '../../store/storiesSlice.js';
import { getStories } from '../../api/hn-api.js';
import NewsList from '../NewsList/NewsList.jsx';
import styles from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const stories = useSelector(storiesSelectors.selectAll);
  stories.sort((a, b) => a.time > b.time ? -1 : 1);

  const refreshStories = async () => {

    const stories = await getStories();
    dispatch(storiesActions.addStories(stories));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('refresh stories');
      refreshStories();
    }, 60000);

    return () => clearInterval(timer);
  }, [])

  return (
    <>
      <button className={styles['refresh-button']} onClick={() => {
        console.log('button refresh stories');
        refreshStories();
      }}>Refresh stories</button>
      <NewsList stories={stories} />
    </>
  )
};

export default Home;
