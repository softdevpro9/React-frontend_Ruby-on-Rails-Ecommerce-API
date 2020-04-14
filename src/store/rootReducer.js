
import { combineReducers } from 'redux';
import products from './productsReducer';
import collections from './collectionsReducer';
import singleProduct from './singleProductReducer';
import control from './controlUIReducer';

export default combineReducers({
  products: products,
  collections: collections,
  singleProduct: singleProduct,
  control: control

});
