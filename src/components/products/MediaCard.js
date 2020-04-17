import React from 'react';
import { useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import currencyFormat from '../../util/currencyFormat';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});



export default function MediaCard(props) {
  const classes = useStyles();
  const { id, title, description, price, image_url, collections } = props;
  //console.log("media card");console.log(props);console.log("media card");
  const x = {id: id, title:title, description:description, image_url:image_url};
  const dispatch = useDispatch();

  return (
    <Card className={classes.root} >
      <CardActionArea >
        <Link
          onClick={()=> dispatch({ type: 'SET_SINGLE_PRODUCT', value:{id: id, title:title, price:price, description:description, image_url:image_url}})}
          to={{pathname: `/product/${id}`}}
          query={{id:id}}
          style={{textDecoration: 'none'}} >
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
            {currencyFormat(price)}
          </Typography>
        </CardContent>
        </Link>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          derp
        </Button>
      </CardActions> */}
    </Card>
  );
}