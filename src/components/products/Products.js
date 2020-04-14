import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductList from './ProductList';
import PaginationControl from '../Navigation/PaginationControl';

const PER_PAGE=9;


class Products extends Component{
  render(){
    console.log("MMMMMMMMMMMM");console.log(this.props);console.log("MMMMMMMMMMM");
    const { error, loading, products, pageSelected } = this.props;

    let showP = <p></p>;
    let paginator = <p></p>;
    if(!loading){
        showP =
          <ProductList
            products={products}
            itemsPerPage={PER_PAGE}
            //pageSelected={pageSelected}
          />;
        paginator =
        <PaginationControl
          itemCount={products.length}
          perPage={PER_PAGE}
          // clicked={paginationClickHandler}
           />;
    }

  return (
    <div>
      {showP}
      {paginator}
    </div>
  )
  }
};

const mapStateToProps = state => ({
  // pageSelected: state.control.pageSelected,
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error
});

export default connect(mapStateToProps)(Products);