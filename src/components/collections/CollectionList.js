import React from 'react';
import { Grid } from '@material-ui/core';
import CollectionMediaCard from './CollectionMediaCard';

const CollectionList = React.memo(props => {
  //console.log("coll_list props"); console.log(props); console.log("Coll_list props");
  let returnVal = <p></p>;

  if(props.collections){
    returnVal =
      <React.Fragment>
        <Grid container spacing={2}>
          {props.collections.map(collection => (
            <Grid
              key={collection.title + collection.id}
              item xs={4} >
              <CollectionMediaCard
                id={collection.id}
                title={collection.title}
                description={collection.description}
                products={collection.products}
              />
            </Grid>
          ))}
        </Grid>
      </React.Fragment>

  }

  return (
    <React.Fragment>
      {returnVal}
    </React.Fragment>
  )
});

export default CollectionList;