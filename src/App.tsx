import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
            <Route exact path='/'>
              <HomePage />
            </Route>
            {/* <Route path='/:number'>
              <HomePage />
            </Route> */}
            <Route path='/story/:id'>
              <StoryPage />
            </Route>
          </Switch>
        </Main>
        <Footer />
      </Wrapper>
    </>
  );
};

export default App;
