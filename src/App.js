import React, { useEffect, useState } from 'react';
import { BrowserRouter, withRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Products from './components/products/Products';
import Collections from './components/collections/Collections';
import NavBar from '../src/components/Navigation/NavBar';
//import SimpleCard from './components/products/SimpleCard';

import './App.css';

const preWithRouter = () => {
  return (
    <div className="App">
      <Container maxWidth="lg" className="root">
        <NavBar/>
        <Switch>
        <Route exact path="/" component={Products}/>
        <Route path="/collections" component={Collections}/>
        </Switch>
      </Container>
    </div>
  );
}

const AppWithRouter = withRouter(preWithRouter);

const App = () => {
  return (
    <BrowserRouter>
      <AppWithRouter/>
    </BrowserRouter>
  );
};


export default App;
