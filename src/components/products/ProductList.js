import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import MediaCard from './MediaCard';

const ProductList = React.memo(props => {
  //console.log("plist props");console.log(props);console.log("plist props");

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
            />
          </Grid>
        ))}
      </Grid>
    </Fragment>;


  return (
    <Fragment>
      {allproducts}
    </Fragment>
  )
});

export default ProductList;