
import { combineReducers } from 'redux';
import products from './productsReducer';
import collections from './collectionsReducer';
import singleInstance from './singleInstanceReducer';
import control from './controlUIReducer';

export default combineReducers({
  products: products,
  collections: collections,
  singleInstance: singleInstance,
  control: control

});
