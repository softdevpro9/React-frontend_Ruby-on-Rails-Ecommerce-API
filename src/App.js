import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';
import Products from './components/products/Products';
import Collections from './components/collections/Collections';
import SingleProduct from './components/products/SingleProduct';
import SingleCollection from './components/collections/SingleCollection';
import { fetchCollections } from './store/collectionsActions';
import { fetchProducts } from './store/productsActions';
import Search from './components/search/Search';
import SideDrawer from './components/shoppingCart/SideDrawer';
import LoseFocusHandler from './util/LoseFocusHandler';
import Layout from './util/Layout';

import './App.css';

class App extends Component{
  // constructor(){
  // super();
  // }
  componentDidMount(){
    this.props.dispatch(fetchCollections());
    this.props.dispatch(fetchProducts());
  }

  render(){
    return (
      <Layout>
        <BrowserRouter>
          <div className="App">
            <Container maxWidth="lg" className="root">
              <LoseFocusHandler>
                <SideDrawer/>
              </LoseFocusHandler>
              <Switch>
                <Route exact path="/" component={Products}/>
                <Route exact path="/product/:id" component={SingleProduct}/>
                <Route exact path="/collection/:id" component={SingleCollection}/>
                <Route exact path="/search" component={Search}/>
                <Route path="/collections" component={Collections} />

              </Switch>
            </Container>
          </div>
        </BrowserRouter>
      </Layout>
    );
  }
};

const mapStateToProps = state => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error
});

export default connect(mapStateToProps)(App);
