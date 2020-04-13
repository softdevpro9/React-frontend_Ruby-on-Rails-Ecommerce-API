import React, { useState, useEffect, useCallback } from 'react';
import ProductList from './ProductList';
import PaginationControl from '../Navigation/PaginationControl';


export default function Products(){
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(9);

  const initProducts = useCallback(() => {
    fetch("http://localhost:3000/products.json").then(response => {
      response.json().then(data => {
        setProducts(data);
      })
  })
  }, []);

  const searchBarSelectHandler = (event, value) => {

  }

  const paginationClickHandler = (event, value) => {
    setPage(value);

  };

  useEffect(() => {
     initProducts();
     setLoaded(true);
  }, [initProducts]);


  let showP = <p></p>;
  let paginator = <p></p>;
  if(loaded){
      showP =
        <ProductList
          products={products}
          itemsPerPage={itemsPerPage}
          page={page}
        />;
      paginator =
      <PaginationControl
        itemCount={products.length}
        perPage={itemsPerPage}
        clicked={paginationClickHandler} />;
  }

  return (
    <div>
      {showP}
      {paginator}
    </div>
  )
};
