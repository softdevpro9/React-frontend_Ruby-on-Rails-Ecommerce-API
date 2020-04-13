import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, withRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Products from './components/products/Products';
import Collections from './components/collections/Collections';
import SingleProduct from './components/products/SingleProduct';
import NavBar from '../src/components/Navigation/NavBar';

import './App.css';

const App = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState();

  const initCollections = useCallback(() => {
    fetch("http://localhost:3000/collections.json").then(response => {
      response.json().then(data => {
        setCollections(data);
      })
  })
  }, []);

  useEffect(() => {
     initCollections();
  }, [initCollections])

  const Pre = () => {
    return (
      <div className="App">
      <Container maxWidth="lg" className="root">
        <NavBar
          collections={collections}
        />
        <Switch>
          <Route exact path="/" component={Products}/>
          <Route exact path="/product/:id" component={SingleProduct}/>
          <Route
            path="/collections"
            render={()=> <Collections collections={collections}/> }
          />
        </Switch>
      </Container>
      </div>
      );
    };
  const AppWithRouter = withRouter(Pre);

  return (
    <BrowserRouter>
      <AppWithRouter/>
    </BrowserRouter>
  );
};


export default App;
