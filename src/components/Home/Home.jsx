import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors as storiesSelectors } from '../../store/storiesSlice.js';
import { actions as storiesActions } from '../../store/storiesSlice.js';
import { getStories } from '../../api/hn-api.js';
import NewsList from '../NewsList/NewsList.jsx';
import styles from './Home.module.css';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const Home = () => {
  const dispatch = useDispatch();
  const stories = useSelector(storiesSelectors.selectAll);
  stories.sort((a, b) => a.time > b.time ? -1 : 1);
  const [loading, setLoading] = useState(false);

  const refreshStories = async () => {
    setLoading(true);
    const stories = await getStories();
    setLoading(false);
    dispatch(storiesActions.addStories(stories));
  };

  useInterval(() => {
    console.log('refresh stories');
    refreshStories();
  }, 60000);

  return (
    <>
      <button className={
        loading
          ? styles['refresh-button-animated']
          : styles['refresh-button']
      } onClick={() => {
        console.log('button refresh stories');
        refreshStories();
      }}>{loading
        ? 'Refreshing ...'
        : 'Refresh stories'}</button>
      <NewsList stories={stories} />
    </>
  )
};

export default Home;
