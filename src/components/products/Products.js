import React, { useState, useEffect, useCallback } from 'react';
import ProductList from './ProductList';
import PaginationControl from '../Navigation/PaginationControl';


export default function Products(){
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const initProducts = useCallback(() => {
    fetch("http://localhost:3000/products.json").then(response => {
      response.json().then(data => {
        setProducts(data);
      })
  })
  }, []);


  useEffect(() => {
     initProducts();
     setLoaded(true);
  }, [initProducts])


  let showProducts = <p></p>;
  if(loaded){
      showProducts = <ProductList products={products} />;
  }

  return (
    <div>
      {showProducts}
      <PaginationControl
        itemCount={products.length}

      />
    </div>
  )
};
