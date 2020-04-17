import { LOAD_CART, ADD_PRODUCT, REMOVE_PRODUCT } from './actionTypes';
import { useSelector, useDispatch } from 'react-redux';

export const loadCart = products => ({
  type: LOAD_CART,
  payload: products
});

export const addProductHandler = product => {
  const cartProducts = useSelector(state => state.cart.products);
  const dispatch = useDispatch();

  let productAlreadyInCart = false;

  cartProducts.forEach(cp => {
    if (cp.item.id === product.id) {
      cp.quantity += 1;
      productAlreadyInCart = true;
    }
  });

  if (!productAlreadyInCart) {
     cartProducts.push({ item: product, quantity: 1 });
   }
   dispatch({type: ADD_PRODUCT, payload: cartProducts})
};

export const removeProduct = product => ({
  type: REMOVE_PRODUCT,
  payload: product
});
