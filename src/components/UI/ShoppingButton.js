import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';

const ShoppingButton = ({product, add = true, text = '+'}) => {
  const dispatch = useDispatch();
  let cartProducts = useSelector(state => state.cart.products);
  let selectedInList = useSelector(state =>state.cart.products.find(
    p => p.item.id === product.id
  ));

  let disabled = false;
  if(selectedInList) {
    if(selectedInList.quantity > 0 && add)
    { disabled = true; }
  }
  else if(!add){
    { disabled = true; }
  }

  const addProductHandler = () => {
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
     dispatch({type: 'INCREMENT_OR_DECREMENT_PRODUCT', payload: cartProducts})
  };

  const removeProductHandler = () => {
    cartProducts.forEach(cp => {
      if (cp.item.id === product.id) {
          cartProducts = cartProducts.filter(
            p => p.item.id !== product.id);
      }
    });
    dispatch({type: 'INCREMENT_OR_DECREMENT_PRODUCT', payload: cartProducts});
  };

  const handleClick = () => {
    add ? addProductHandler() : removeProductHandler();
  };


  return (
    <Button
      disabled={disabled}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};

export default ShoppingButton;