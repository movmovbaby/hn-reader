import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getStories, selectors as storiesSelectors } from '../../store/storiesSlice';
import NewsList from '../../components/NewsList/NewsList';
import Spinner from '../../components/Spinner/Spinner';
import styles from './Home.module.css';
import { Item } from '../../types/index';

const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null && delay !== 0) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const HomePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector((state) => state.stories.loadingStatus);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const ids = useAppSelector(storiesSelectors.selectIds);

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

  const stories = useAppSelector(storiesSelectors.selectAll) as Item[];
  stories.sort((a, b) => a.time > b.time ? -1 : 1);

  const refreshStories = async () => {
    setIsRefreshing(true);
    dispatch(getStories());
    setIsRefreshing(false);
    console.log(stories);

  };

  useInterval(() => {
    refreshStories();
  }, 600_000);

  return (
    <>
      {loadingStatus === 'loading'
        ? <Spinner />
        :
        <>
          <button className={
              isRefreshing ? styles['refresh-button-animated'] : styles['refresh-button']
            }
            onClick={() => {
              console.log('button refresh stories');
              refreshStories();
            }}>
              {isRefreshing
              ? 'Refreshing ...'
              : 'Refresh stories'}
          </button>
          <NewsList stories={stories} />
        </>
      }
    </>
  );
};

export default HomePage;
