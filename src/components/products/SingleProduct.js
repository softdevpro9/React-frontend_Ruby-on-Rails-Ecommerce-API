import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 750,
  },
  media: {
    height: 550,
  },
});


export default function SingleProduct(props) {
  const classes = useStyles();

  const product = useSelector(state => state.singleInstance.singleProduct);
  console.log("product");console.log(product);console.log("product");

  let returnVal = <p></p>;
  if(product !== null){
    const { title, description, price, image_url, collections } = product;
    returnVal = <Card className={classes.root} >
    <CardActionArea >
      <CardMedia
        className={classes.media}
        image={`http://localhost:3000${image_url}`}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}

        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary">
        Learn More
      </Button>
    </CardActions>
  </Card>;
  }
  return (
    <React.Fragment>
      {returnVal}
    </React.Fragment>
  );

}