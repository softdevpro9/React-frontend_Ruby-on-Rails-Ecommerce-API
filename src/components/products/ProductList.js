import React, { Fragment, useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import MediaCard from './MediaCard';

const ProductList = React.memo(props => {
  //console.log("plist props");console.log(props);console.log("plist props");
  const [singleView, setSingleView] = useState(false);
  const [singleProduct, setSingleProduct] = useState();
  console.log("plist singleProduct");console.log(singleProduct);console.log("plist singleProduct");

  const singleProductClickHandler = (event) => {
    console.log(event.target.value)
    //setSingleProduct(event.target.value);
    //setSingleView(true);
  };

  const allproducts =
    <Fragment>
      <Grid container spacing={2}>
        {props.products.map(product => (
          <Grid
            key={product.title + product.id}
            item xs={4} >
            <MediaCard
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              image_url={product.image_url}
              collections={product.collections}
              clicked={singleProductClickHandler}
            />
          </Grid>
        ))}
      </Grid>
    </Fragment>;

  const showSingleProduct = <p></p>;
  if(singleProduct){
    showSingleProduct =
      <MediaCard
        id={singleProduct.id}
        title={singleProduct.title}
        description={singleProduct.description}
        price={singleProduct.price}
        image_url={singleProduct.image_url}
        collections={singleProduct.collections}
      />;
  };

  return (
    <Fragment>
      {!singleView && allproducts}
      {singleView && showSingleProduct}
    </Fragment>
  )
});

export default ProductList;