import React, { useState, useEffect } from 'react';
import Card from 'UI/card'

import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products.json").then(response => {
      response.json().then(data => {
        setProducts(data);
      });
    });
  }, []);

  return (
    <div className="App">
      {products.map(product => (
        <div key={product.title + product.id}>
        <h3 >{product.title}</h3>
        {product.collections.map(col => (
         <p key={col.title + col.id}>{ col.title} </p>
        ))}</div>
      ))
      }
    </div>
  );
}

export default App;
