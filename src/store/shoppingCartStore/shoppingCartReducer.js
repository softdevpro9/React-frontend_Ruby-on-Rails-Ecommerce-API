import { LOAD_CART, ADD_PRODUCT, REMOVE_PRODUCT, INCREMENT_PRODUCT } from './actionTypes';

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
    case ADD_PRODUCT:
      return {
        ...state,
        products : [...state.products]
      };
    case INCREMENT_PRODUCT:
      return {
        ...state,
        products :
          [...state.products,
            {product: action.payload, quantity: 1}]
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