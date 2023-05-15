import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getStories, selectors as storiesSelectors } from '../../store/storiesSlice';
import NewsList from '../../components/NewsList/NewsList';
import Spinner from '../../components/Spinner/Spinner';
import styles from './Home.module.css';
import { Item } from '../../types/index';
import { useInterval } from '../../hooks';
import { REFRESH_RATE, NEWS_PER_PAGE } from '../../constants';
import Pagination from '../../components/Pagination/Pagination';
import { getIndexesForPage } from '../../utils';

const HomePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { page } = useParams<{page: string}>();
  const pageNumber = Number(page);

  const loadingStatus = useAppSelector((state) => state.stories.loadingStatus);
  const ids = useAppSelector(storiesSelectors.selectIds);

  useEffect(() => {
    const loadStories = async () => {
      try {
        dispatch(getStories(pageNumber));
      } catch (e) {
        console.log(e);
      }
    };

    if (ids.length === 100) {
      return;
    } else {
      loadStories();
    }
  }, [pageNumber]);

  const stories = useAppSelector(storiesSelectors.selectAll) as Item[];
  stories.sort((a: Item, b: Item): -1 | 1 => a.time > b.time ? -1 : 1);
  const [start, end] = getIndexesForPage(pageNumber);
  const storiesToShow = stories.slice(start, end);

  const refreshStories = async () => {
    dispatch(getStories(pageNumber));
  };

  useInterval(() => {
    console.log('timer refresh');
    refreshStories();
  }, REFRESH_RATE);

  return (
    <>
      {loadingStatus === 'loading' && ids.length !== NEWS_PER_PAGE * pageNumber
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
          <NewsList stories={storiesToShow} pageNumber={pageNumber} />
          <Pagination pageNumber={pageNumber}/>
        </>
      }
    </>
  );
};

export default HomePage;
