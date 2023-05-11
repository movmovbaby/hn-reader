import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getStories, selectors as storiesSelectors } from '../../store/storiesSlice';
import NewsList from '../../components/NewsList/NewsList';
import Spinner from '../../components/Spinner/Spinner';
import styles from './Home.module.css';
import { Item } from '../../types/index';
import { useInterval } from '../../hooks';
import { REFRESH_RATE } from '../../constants';

const HomePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector((state) => state.stories.loadingStatus);
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
  stories.sort((a: Item, b: Item): -1 | 1 => a.time > b.time ? -1 : 1);

  const refreshStories = async () => {
    dispatch(getStories());
  };

  useInterval(() => {
    refreshStories();
  }, REFRESH_RATE);

  return (
    <>
      {loadingStatus === 'loading' && ids.length !== 100
        ? <Spinner />
        :
        <>
          <button className={
              loadingStatus === 'loading' ? styles['refresh-button-animated'] : styles['refresh-button']
            }
            onClick={() => {
              console.log('button refresh stories');
              refreshStories();
            }}>
              {loadingStatus === 'loading'
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
