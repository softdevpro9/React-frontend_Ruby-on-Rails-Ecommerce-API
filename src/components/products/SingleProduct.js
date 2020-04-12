import React, { useState, useEffect, useCallback } from 'react';
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


export default function SingleProduct({ match }) {
  //console.log("SingleProduct");console.log(props);console.log("SingleProduct");
  const classes = useStyles();
  const { id } = match.params;
  const [product, setProduct] = useState({});
  const [loaded, setLoaded] = useState(false);



  const initProduct = useCallback(() => {
    fetch(`http://localhost:3000/products/${id}.json`).then(response => {
      response.json().then(data => {
        setProduct(data);
        console.log(data);
      })
  })
  }, []);

  useEffect(() => {
    initProduct();
    setLoaded(true);
 }, [initProduct])

const { title, description, price, image_url, collections } = product;

  return (
    // <Card className={classes.root} >
    <Card >
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
    </Card>
  );
}