import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MediaCard from '../products/MediaCard';

const useStyles = makeStyles({
  root: {
    maxWidth: 750,
  },
  media: {
    height: 550,
  },
});


export default function SingleCollection(props) {
  //console.log("SingleCollection");console.log(props);console.log("SingleCollection");
  const classes = useStyles();
  const collection = useSelector(state => state.singleInstance.singleCollection);
  console.log("collection");console.log(collection);console.log("collection");

  let returnVal = <p></p>;
  let collectionProducts = <p>derp</p>;
  if(collection){
    const { title, description, products } = collection;
    console.log(products);
    returnVal = <Card className={classes.root} >
    <CardActionArea >
      {/* <CardMedia
        className={classes.media}
        image={`http://localhost:3000${image_url}`}
        title={title}
      /> */}
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
  if(collection){
    collectionProducts =
    <div>
    {products.map(product => {
      return(
      <MediaCard
        key={product.id+product.title}
        id={product.id}
        title={product.title}
        description={product.description}
        price={product.price}
        image_url={product.image_url}
        collections={product.collections} />
    )})}
    </div>
  }
  }
  return (
    <React.Fragment>
      {returnVal}
      {collectionProducts}
    </React.Fragment>
  );

}