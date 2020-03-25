import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

function HomePage(props) {
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
    return () => {
      //
    };
  }, [])

  const load_conditionals = () => {
    return loading ? <div>Loading...</div> : error ? <div>{error}</div> : "Not Yet"
  }

  const load_component = () => {
    if (products.products) {
      return <ul className="products">
        {
          products.products.map(product =>
            <li key={product._id}>
              <div className="product">
                <Link to={'/product/' + product._id}>
                  <img className="product-image" src={product.image} alt="product" />
                </Link>
                <div className="product-name">
                  <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">{product.rating} Stars ({product.numReiews} Reviews)</div>
              </div>
            </li>)
        }
      </ul>
    }
    else {
      return "Not Yet";
    }
  }
  return !products ? load_conditionals() : load_component();
}
export default HomePage;