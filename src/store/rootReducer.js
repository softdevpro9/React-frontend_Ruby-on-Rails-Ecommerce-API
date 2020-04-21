
import { combineReducers } from 'redux';
import products from './productsHelpers/productsReducer';
import collections from './collectionsHelpers/collectionsReducer';
import singleInstance from './singleInstanceReducer';
import control from './controlUIReducer';
import cart from './shoppingCartStore/shoppingCartReducer';
import { authentication } from './_reducers/authentication.reducer';
import { registration } from './_reducers/registration.reducer';
import { customers } from './_reducers/customers.reducer';
import { alert } from './_reducers/alert.reducer';


export default combineReducers({
  products: products,
  collections: collections,
  singleInstance: singleInstance,
  control: control,
  cart: cart,
  authentication,
  registration,
  customers,
  alert
});
