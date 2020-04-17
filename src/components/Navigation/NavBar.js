import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button,
         IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBar from 'material-ui-search-bar';
import ProductSearchBar from './ProductSearchBar';
import SelectList from '../UI/SelectList';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));
const NavBar = props => {
  //console.log("navigation");console.log(props);console.log("navigation");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const classes = useStyles();
  const collections = useSelector(state => state.collections.items);;
  const [selectedCollection, setSelectedCollection] = useState('');

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" >
          <Button style={{margin:"10px"}} >
            <Link
              to="/"
              style={{textDecoration: 'none',
                      color:"white"}} >
              Products
            </Link>
          </Button>
          <Button className="space" >
            <Link
              to="/collections"
              style={{textDecoration: 'none',
                      color:"white"}} >
              Collections
            </Link>
          </Button>
          </Typography>
          <div className={classes.search}>
            {/* <SearchBar
              onRequestSearch={()=>{console.log("FOCUSED")}}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            /> */}
            <ProductSearchBar/>
            </div>
            <div className={classes.search}>
            <SelectList
              collections={collections}
            />
          </div>
          <Button color="inherit" >Login</Button>
          <Button color="inherit" onClick={props.clicked}>
            <ShoppingCartIcon htmlColor="white" style={{border:"none"}} />
          </Button>
        </Toolbar>
    </AppBar>
    </Fragment>
  );
}

export default NavBar;