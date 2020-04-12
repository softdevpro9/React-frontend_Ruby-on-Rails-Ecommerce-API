import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import Products from '../src/components/products/Products';
import NavBar from '../src/components/Navigation/NavBar';
//import SimpleCard from './components/products/SimpleCard';

import './App.css';

const App = () => {


  return (
  <div className="App">
    <Container maxWidth="lg" className="root">
      <Products />
    </Container>
  </div>
  );
}

export default App;
