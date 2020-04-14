import React, { useState, useEffect, useCallback } from 'react';
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
  console.log("SingleCollection");console.log(props);console.log("SingleCollection");
  const classes = useStyles();
  const { id } = props.match.params;
  const collection = useSelector(state => state.collections.items[id]);
  console.log("collection");console.log(collection);console.log("collection");

  let returnVal = <p></p>;
  if(collection){
    const { title, description, products } = collection;
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
  }
  return (
    <React.Fragment>
      {returnVal}
    </React.Fragment>
  );

}