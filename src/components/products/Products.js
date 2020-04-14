import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductList from './ProductList';
import PaginationControl from '../Navigation/PaginationControl';
import { fetchProducts } from '../../store/productsActions';

class Products extends Component{
  // constructor(props){
  //   super(props);
  // };
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  paginationClickHandler = (event, value) => {
    //setPage(value);
  };

  // const searchBarSelectHandler = (event, value) => {

  // }

  render(){



    const { error, loading, products } = this.props;

    let showP = <p></p>;
    let paginator = <p></p>;
    if(!loading){
        showP =
          <ProductList
            products={products}
            //itemsPerPage={itemsPerPage}
            //page={page}
          />;
        // paginator =
        // <PaginationControl
        //   itemCount={products.length}
        //   perPage={itemsPerPage}
        //   clicked={paginationClickHandler} />;
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
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error
});

export default connect(mapStateToProps)(Products);