import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchStories, fetchTop100StoriesId } from '../../api/hn-api.js';
import { actions as storiesActions } from '../../store/storiesSlice.js';
import NewsList from '../NewsList/NewsList.jsx';
import Spinner from '../Spinner/Spinner.jsx';

const Home = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getStories = async () => {
      try {
        setIsLoading(true);
        const ids = await fetchTop100StoriesId();
        const stories = await fetchStories(ids);
        dispatch(storiesActions.addStories(stories));
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    getStories();
  }, [dispatch]);
  return (
    <>

      {isLoading
        ? <Spinner />
        : <NewsList />
      }
    </>
  );
};

export default Home;
