import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import currencyFormat from '../../util/currencyFormat'
//import ClearIcon from '@material-ui/icons/Clear';


const ItemDisplay = ({prod, clickUp, clickDown}) => {
  //console.log(prod);
  const [localQuantity, setLocalQuantity] = useState(prod.quantity);

  const plusHandler = () => {
    setLocalQuantity(localQuantity+1);
    clickUp(prod);
  };

  const minusHandler = () => {
    setLocalQuantity(localQuantity-1);
    clickDown(prod);
  };

  let showItemDisplay = <p hidden></p>;
  if(!!prod && localQuantity>0){
    showItemDisplay =
      <div>
        <p>{prod.item.title}</p>
        <p>{localQuantity} x {currencyFormat(prod.item.price)} : {currencyFormat(localQuantity * prod.item.price)}</p>
        <Button
          onClick={plusHandler}
        ><AddIcon/></Button>
        <Button
          onClick={minusHandler}
        ><RemoveIcon/></Button>
      </div>;
  }

  return (
    <React.Fragment>
      {showItemDisplay}
    </React.Fragment>
  );
};

export default ItemDisplay;