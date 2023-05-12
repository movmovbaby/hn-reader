import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Wrapper from './components/Layout/Wrapper/Wrapper';
import Main from './components/Layout/Main/Main';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import StoryPage from './pages/StoryPage/StoryPage';

const App = () => {
  return (
    <>
      <Wrapper>
        <Header />
        <Main>
          <Switch>
            <Route path='/story/:id'>
              <StoryPage />
            </Route>
            <Route path='/:page'>
              <HomePage />
            </Route>
            <Route exact path='/'>
              <Redirect to='/1' />
            </Route>
          </Switch>
        </Main>
        <Footer />
      </Wrapper>
    </>
  );
};

export default App;
