import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
//import ClearIcon from '@material-ui/icons/Clear';
import currencyFormat from '../../../util/currencyFormat';


const QuantityDisplay = ({product}) => {
  const dispatch = useDispatch();
  let cartProducts = useSelector(state => state.cart.products);
  let selectedInList = useSelector(state =>state.cart.products.find(
    p => p.item.id === product.id
    ));
  const [quantity, setQuantity] = useState(selectedInList.quantity);

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
  setQuantity(quantity+1);
};

  const removeProductHandler = () => {
    cartProducts.forEach(cp => {
      if (cp.item.id === product.id) {
        if(cp.quantity > 1){
          cp.quantity -= 1;
        }
        else{
          cartProducts = cartProducts.filter(
            p => p.item.id !== product.id);
        }
      }
    });
    dispatch({type: 'INCREMENT_OR_DECREMENT_PRODUCT', payload: cartProducts});
    setQuantity(quantity-1);
  };




  return (
    <div>
      <p>{selectedInList.item.title}</p>
      <p>{quantity} x {currencyFormat(selectedInList.item.price)} : {currencyFormat(quantity * selectedInList.item.price)}</p>
      <Button
        onClick={addProductHandler}
      ><AddIcon/></Button>
       <Button
        onClick={removeProductHandler}
      ><RemoveIcon/></Button>
    </div>
  );
};

export default QuantityDisplay;