import React, { Component } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import CollectionList from '../collections/CollectionList';
import { connect } from 'react-redux';

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

class Collections extends Component{


  render(){
    const { collections, loading } = this.props;
    let showCollections = <p></p>;
    if(!loading){
      console.log(this.props);
      showCollections = <CollectionList collections={collections} />;
    }
    return (
      <React.Fragment>
        {showCollections}
      </React.Fragment>
    )
  }
};

const mapStateToProps = state => {
  return {
    collections: state.collections.items,
    loading: state.collections.loading,
    error: state.collections.error
  }
};

export default connect(mapStateToProps)(Collections);