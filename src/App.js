import React, { Component } from 'react';
import { BrowserRouter, withRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Products from './components/products/Products';
import Collections from './components/collections/Collections';
import SingleProduct from './components/products/SingleProduct';
import NavBar from '../src/components/Navigation/NavBar';

import './App.css';

class App extends Component{
  constructor(){
  super();
  this.state = {

  };
}
  //   const initCollections = useCallback(() => {
  //   fetch("http://localhost:3000/collections.json").then(response => {
  //     response.json().then(data => {
  //       setCollections(data);
  //     })
  // })
  // }, []);


    render(){
    return (
      <BrowserRouter>
      <div className="App">
      <Container maxWidth="lg" className="root">
        {/* <NavBar /> */}
        <Switch>
          <Route exact path="/" component={Products}/>
          {/* <Route exact path="/product/:id" component={SingleProduct}/>
          <Route path="/collections" component={Collections} /> }
          /> */}
        </Switch>
      </Container>
      </div>
      </BrowserRouter>
      );
    }
};

export default App;
