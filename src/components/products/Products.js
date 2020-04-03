import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SimpleCard from './SimpleCard';

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

const Products = () =>{
const [products, setProducts] = useState([]);
const [customers, setCustomers] = useState([]);

const classes = useStyles();

  useEffect(() => {
    fetch("http://localhost:3000/products.json").then(response => {
      response.json().then(data => {
        setProducts(data);
      });
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/customers.json").then(response => {
      response.json().then(data => {
        setCustomers(data);
      });
    });
  }, []);

  return (
  <React.Fragment>
    <Grid container spacing={4}>
      {products.map(product => (
        <Grid
          key={product.title + product.id}
          item xs={6} >
          <SimpleCard
            id={product.id}
            title={product.title}
            description={product.description}
          />
        </Grid>
      ))}
    </Grid>
  </React.Fragment>
  )
          }
export default Products;