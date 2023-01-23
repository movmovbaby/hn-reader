import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { fetchStories, fetchTop100StoriesId } from './api/hn-api';
import { actions as storiesActions } from './store/storiesSlice.js';
import Main from './components/Layout/Main.jsx';
import Header from './components/Layout/Header.jsx';
import Footer from './components/Layout/Footer.jsx';
import Home from './components/Home.jsx';
import Story from './components/Story/Story.jsx';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getStories = async () => {
      const ids = await fetchTop100StoriesId();
      const stories = await fetchStories(ids);
      dispatch(storiesActions.addStories(stories));
    }
    getStories();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Main>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/story/:id'>
            <Story />
          </Route>
        </Switch>
      </Main>
      <Footer />
    </>
  );
}

export default App;
