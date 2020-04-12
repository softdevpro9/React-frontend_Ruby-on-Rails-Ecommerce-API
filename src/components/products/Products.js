import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import ProductList from './ProductList';
import CollectionList from './CollectionList';
import NavBar from '../Navigation/NavBar';
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

// const productsReducer = (currentProducts, action) => {
//   switch(action.type){
//     case 'SET':
//       return action.products;
//     default:
//       throw new Error("Shouldn't be here!");
//   }
// }



export default function Products(props){
  //const [products, dispatchProducts] = useReducer(productsReducer, []);
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([])
  const [loaded, setLoaded] = useState(false);
  const [viewSelect, setViewSelect] = useState({
    products: true,
    collections:false
  });


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

  const viewSelectHandler = (selection) => {
    if ( selection === 'products'){
      setViewSelect({products: true, collections: false});
    }
    if ( selection === 'collections'){
      setViewSelect({products: false, collections: true});
    }
  };

    let showProducts = <p></p>;
    let showCollections = <p></p>;
    if(loaded){
      if(viewSelect.products){
        showProducts = <ProductList products={products} />;
      }
      if(viewSelect.collections){
        showCollections = <CollectionList collections ={collections} />;
      }
  }

  return (
    <div>
      <NavBar
        clickedProducts={()=>viewSelectHandler('products')}
        clickedCollections={()=>viewSelectHandler('collections')}
      />
      {showProducts}
      {showCollections}
    </div>
  )
};
