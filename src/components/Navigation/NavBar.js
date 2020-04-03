import React, { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button,
         IconButton, Typography, Link } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const NavBar = () => {
return (
<Fragment>
  <AppBar position="static">
    <Toolbar>
      <IconButton edge="start"  color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" >
      <Link style={{margin:"10px"}} component={RouterLink} to="/products">
          <span style={{color:"white"}}>All Products</span>
        </Link>
        <Link className="space" component={RouterLink} to="/">
          <span style={{color:"white"}}>No Products</span>
        </Link>
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
</AppBar>
</Fragment>
);
}

export default NavBar;