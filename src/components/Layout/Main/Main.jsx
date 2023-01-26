import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getStories } from '../../../api/hn-api.js';
import { actions as storiesActions } from '../../../store/storiesSlice.js';
import Spinner from '../../Spinner/Spinner.jsx'
import styles from './Main.module.css';

const Main = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadStories = async () => {
      console.log('main loadStories');
      try {
        setLoading(true);
        const stories = await getStories();
        dispatch(storiesActions.addStories(stories));
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    loadStories();
  }, []);

  return (
    <main className={styles.main}>
      {loading
        ? <Spinner />
        : props.children
      }</main>
  )
};

export default Main;
