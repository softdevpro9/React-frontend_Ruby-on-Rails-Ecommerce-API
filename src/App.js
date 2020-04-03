import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Products from '../src/components/products/Products';

import SimpleCard from '../src/components/products/SimpleCard';

import NavBar from '../src/components/Navigation/NavBar';


import './App.css';

function App() {

  return (
    <div className="App">
      <Container className="root">
        <NavBar/>
          <Switch>
            <Route path="/" exact />
            <Route path="/products" component={Products}/>
            {/* <Route path="/product" component={SimpleCard}/> */}
          </Switch>
      </Container>
    </div>
  );
}

export default App;
