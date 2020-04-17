import { LOAD_CART, INCREMENT_OR_DECREMENT_PRODUCT, REMOVE_PRODUCT } from './actionTypes';

const initialState = {
  products: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      return {
        ...state,
        products: action.payload
      };
    case INCREMENT_OR_DECREMENT_PRODUCT:
      return {
        ...state,
        products : action.payload

      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products : [...state.products.filter(p => p.product.id !== action.payload.id)]
      };
    default:
      return state;
  }
}