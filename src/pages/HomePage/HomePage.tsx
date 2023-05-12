import React, { useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
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
  const { page } = useParams<{page: string}>();
  const pageNumber = Number(page);
  
  const history = useHistory();
  const handleClick = () => history.push(`/${pageNumber}`);

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

  const refreshStories = async () => {
    dispatch(getStories(pageNumber));
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
          <NewsList stories={stories} pageNumber={pageNumber} />

          <ul className={styles['pagination']}>
            <li className={`${styles['pagination__item']} ${styles['pagination__item--active']}`}>
              <Link to={'/1'} onClick={handleClick} className={styles['pagination__page-number']}>1</Link>
            </li>
            <li className={styles['pagination__item']}>
              <Link to={'/2'} onClick={handleClick} className={styles['pagination__page-number']}>2</Link>
            </li>
            <li className={styles['pagination__item']}>
              <Link to={`/3`} onClick={handleClick} className={styles['pagination__page-number']}>3</Link>
            </li>
            <li className={styles['pagination__item']}>
              <Link to={`/4`} onClick={handleClick} className={styles['pagination__page-number']}>4</Link>
            </li>
            <li className={styles['pagination__item']}>
              <Link to={`/5`} onClick={handleClick} className={styles['pagination__page-number']}>5</Link>
            </li>
          </ul>
        </>
        
      }
    </>
  );
};

export default HomePage;
