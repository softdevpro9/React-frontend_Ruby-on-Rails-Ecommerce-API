import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MediaCard from './MediaCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: 20,
  },
}));


const ProductList = React.memo(props => {
  //console.log("plist props");console.log(props);console.log("plist props");
  const classes = useStyles();
  const { products, page, itemsPerPage } = props;

  const startingIndex = (page -1)*itemsPerPage;
  const endingIndex = page*itemsPerPage;

  const showProducts = products.slice(startingIndex, endingIndex);

  const allproducts =
    <Fragment>
      <Grid container spacing={2} className={classes.root}>
        {showProducts.map(product => (
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