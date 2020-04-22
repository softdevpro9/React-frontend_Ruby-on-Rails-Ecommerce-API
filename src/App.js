import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';
import Products from './components/products/Products';
import Collections from './components/collections/Collections';
import SingleProduct from './components/products/SingleProduct';
import SingleCollection from './components/collections/SingleCollection';
import { fetchCollections } from './store/collectionsHelpers/collectionsActions';
import { fetchProducts } from './store/productsHelpers/productsActions';
import { fetchProvinces } from './store/provincesHelpers/provincesActions';
import Search from './components/search/Search';
import SideDrawer from './components/shoppingCart/SideDrawer';
import LoseFocusHandler from './util/LoseFocusHandler';
import Layout from './util/Layout';
import { history } from './authSrc/_helpers';
import { alertActions } from './authSrc/_actions';
import { PrivateRoute } from './authSrc/_components/PrivateRoute';
import { LoginPage } from './authSrc/LoginPage'
import { RegisterPage } from './authSrc/RegisterPage';
import Checkout from './components/checkout/Checkout';
import './App.css';




class App extends Component{
  constructor(props){
    super(props);

      history.listen((location, action) => {
        this.props.clearAlerts();
      })
  }

  componentDidMount(){
    this.props.dispatch(fetchCollections());
    this.props.dispatch(fetchProducts());
    this.props.dispatch(fetchProvinces());
  }

  render(){
    return (
      <Layout>
        <Router history={history}>
          <div className="App">
            <Container maxWidth="lg" className="root">
              <LoseFocusHandler>
                <SideDrawer/>
              </LoseFocusHandler>
              <Switch>
                <Route exact path="/" component={Products} />
                <Route exact path="/product/:id" component={SingleProduct} />
                <Route exact path="/collection/:id" component={SingleCollection} />
                <Route exact path="/search" component={Search} />
                <Route path="/collections" component={Collections} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <Route path="/checkout" component={Checkout} />

              </Switch>
            </Container>
          </div>
        </Router>
      </Layout>
    );
  }
};


const mapStateToProps = state => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error,
  alert: state.alert

});

const mapDispatchToProps = dispatch =>  ({
  clearAlerts: alertActions.clear,
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
