import React, { useState, useEffect, useCallback } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import CollectionList from '../collections/CollectionList';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     height: 140,
//     width: 100,
//   },
//   control: {
//     padding: 20,
//   },
// }));

export default function Collections({ collections }){
  const [loaded] = useState(true);

  let showCollections = <p></p>;
  if(loaded){
      showCollections = <CollectionList collections={collections} />;
  }

  return (
    <React.Fragment>
      {showCollections}
    </React.Fragment>
  )
};
