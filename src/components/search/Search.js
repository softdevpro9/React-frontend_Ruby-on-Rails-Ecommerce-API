import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductList from '../products/ProductList';
import PaginationControl from '../Navigation/PaginationControl';
//import createTypography from '@material-ui/core/styles/createTypography';

class Search extends Component{
  render(){
    const { products, searchString, selectListSelected } = this.props;
    let filteredByTitleAndDescription= [];
    let displaySearchedProducts = <p hidden></p>;
    if(products){
      filteredByTitleAndDescription =
        products.filter(product => product.title
        .concat(product.description)
        .includes(searchString));
        console.log('filteredByTitleAndDescription');console.log(filteredByTitleAndDescription);console.log('filteredByTitleAndDescription');

        if(selectListSelected !== 0){
          filteredByTitleAndDescription =
            filteredByTitleAndDescription.filter(product =>
              product.collections.length !== 0);

          const tempArray =[];
          for (let i = 0; i < filteredByTitleAndDescription.length; i++) {
            const product = filteredByTitleAndDescription[i];
            for (let j = 0; j < product.collections.length; j++) {
              const collection = product.collections[j];
                if(collection.id === selectListSelected){
                  tempArray.push(product);
                }
            }

          }
          console.log('tempArray');console.log(tempArray);console.log('tempArray');
          filteredByTitleAndDescription = tempArray;




        }

        displaySearchedProducts =
          <React.Fragment>
            <ProductList
              products={filteredByTitleAndDescription}
              itemsPerPage='9'/>
            <PaginationControl
              itemCount={filteredByTitleAndDescription.length}
              perPage='9'/>
          </React.Fragment>
      }


    return(
      <React.Fragment>
        <h1>{filteredByTitleAndDescription.length} results matching "{searchString}"</h1>
        {displaySearchedProducts}
      </React.Fragment>
    )
  };
};

const mapStateToProps = state => ({
  products: state.products.items,
  searchString: state.singleInstance.searchString,
  selectListSelected: state.control.selectListSelected
});

export default  connect(mapStateToProps)(Search)