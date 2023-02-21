import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectors as storiesSelectors } from '../../store/storiesSlice.js';
import { actions as storiesActions } from '../../store/storiesSlice.js';
import { getStories } from '../../store/storiesSlice.js';
import NewsList from '../../components/NewsList/NewsList.jsx';
import Spinner from '../../components/Spinner/Spinner.jsx'
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

const HomePage = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.stories.loadingStatus);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const ids = useSelector(storiesSelectors.selectIds);

  useEffect(() => {
    const loadStories = async () => {
      try {
        dispatch(getStories());
      } catch (e) {
        console.log(e);
      }
    };

    if (ids.length === 100) {
      return;
    } else {
      loadStories();
    }
  }, []);

  const stories = useSelector(storiesSelectors.selectAll);
  stories.sort((a, b) => a.time > b.time ? -1 : 1);

  const refreshStories = async () => {
    setIsRefreshing(true);
    const stories = await getStories();
    setIsRefreshing(false);
    dispatch(storiesActions.addStories(stories));
  };

  useInterval(() => {
    refreshStories();
  }, 60_000);

  return (
    <>
      {loadingStatus === 'loading'
        ? <Spinner />
        :
        <>
          <button className={
            isRefreshing
              ? styles['refresh-button-animated']
              : styles['refresh-button']
          } onClick={() => {
            console.log('button refresh stories');
            refreshStories();
          }}>{isRefreshing
            ? 'Refreshing ...'
            : 'Refresh stories'}</button>
          <NewsList stories={stories} />
        </>
      }
    </>
  )
};

export default HomePage;
