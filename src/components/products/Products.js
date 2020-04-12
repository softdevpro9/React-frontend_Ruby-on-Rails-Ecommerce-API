import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProductList from './ProductList';

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

export default function Products(){
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([])
  const [loaded, setLoaded] = useState(false);

  const initProducts = useCallback(() => {
    fetch("http://localhost:3000/products.json").then(response => {
      response.json().then(data => {
        setProducts(data);
      })
  })
  }, []);

  const initCollections = useCallback(() => {
    fetch("http://localhost:3000/collections.json").then(response => {
      response.json().then(data => {
        setCollections(data);
      })
  })
  }, []);

  useEffect(() => {
     initProducts();
     initCollections();
     setLoaded(true);
  }, [initProducts, initCollections])


  let showProducts = <p></p>;
  if(loaded){
      showProducts = <ProductList products={products} />;
  }

  return (
    <div>

      {showProducts}
    </div>
  )
};
