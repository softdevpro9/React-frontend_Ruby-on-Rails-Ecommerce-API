import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ItemDisplay from './ItemDisplay';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { history } from '../../authSrc/_helpers';


const handleCheckoutClick = () => {
  history.push('/checkout');
}

const ShoppingCartForm = () => {
  const dispatch = useDispatch();
  let cartProducts = useSelector(state => state.cart.products);

  const addProductHandler = (product) => {
    for (let i=0; i< cartProducts.length; i++) {
      let cp = cartProducts[i];
      if (cp.item.id === product.item.id) {
        cp.quantity += 1;
        dispatch({type: 'INCREMENT_OR_DECREMENT_PRODUCT', payload: cartProducts});
        break;
      }
    }
  };

  const removeProductHandler = (product) => {
    cartProducts.forEach(cp => {
      if (cp.item.id === product.item.id) {
        if(cp.quantity > 1){
          cp.quantity -= 1;
        }
        else{
          cartProducts = cartProducts.filter(
            p => p.item.id !== product.item.id);
        }
      }
    });
    dispatch({type: 'INCREMENT_OR_DECREMENT_PRODUCT', payload: cartProducts});
  };

  return (
    <React.Fragment>
      <List>
        {cartProducts.map(product =>
        (
          <React.Fragment key={product.item.id}>
            <li>
              <ItemDisplay
                prod={product}
                clickUp={addProductHandler}
                clickDown={removeProductHandler} />
            </li>
            <Divider/>
          </React.Fragment>
        ))}
      </List>
      <Divider />
      <Button onClick={handleCheckoutClick}>
        Proceed to Checkout
      </Button>
    </React.Fragment>
  );
};

export default ShoppingCartForm;