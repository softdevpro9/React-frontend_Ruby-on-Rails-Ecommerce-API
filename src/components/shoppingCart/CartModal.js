import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Redirect} from 'react-router';
import ShoppingButton from '../UI/ShoppingButton';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const [redirected, setRedirected] = React.useState(false);
  let redirect = <br/>;
  if(redirected){   redirect = <Redirect to='/'/>   };

  const shoppingCartContents = useSelector(state => state.cart.products);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setRedirected(true);
  };

  return (
    <div>
      <Button variant="outlined" color="transparent" onClick={handleClickOpen}>

        <ShoppingCartIcon htmlColor="white" style={{border:"none"}} />
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Shopping Cart
        </DialogTitle>
        <DialogContent dividers>
          {/* <Typography gutterBottom> */}
            <ul>
            {shoppingCartContents.map(product => {
              return(
              <li>
                { product.quantity} x {product.item.title}
                <ShoppingButton product={product}/>
                <ShoppingButton product={product} add={false} text='-'/>
              </li>
              )
            })}
            </ul>
          {/* </Typography> */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Proceed To Checkout
          </Button>
        </DialogActions>
      </Dialog>
      {redirect}
    </div>
  );
}