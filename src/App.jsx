import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Wrapper from './components/Layout/Wrapper/Wrapper';
import Main from './components/Layout/Main/Main.jsx';
import Header from './components/Layout/Header/Header.jsx';
import Footer from './components/Layout/Footer/Footer.jsx';
import Home from './components/Home/Home.jsx';
import Story from './components/Story/Story.jsx';

const App = () => (
  <>
    <Wrapper>
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
    </Wrapper>
  </>
);

export default App;
