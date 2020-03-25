import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';


function ProductPage(props) {
  // const product = data.products.filter(x => x._id === props.match.params.id);
  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, []);

  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)

  }


  const load_conditionals = () => {
    return loading ? <div>Loading...</div> : error ? <div>{error}</div> : load_component()
  }

  const load_component = () => {
    if (product.detailsProduct) {
      return <div>
        <div className="back-to-result">
          <Link to="/">Back to result</Link>
        </div>
        {loading ? <div>Loading...</div> :
          error ? <div>{error} </div> :
            (
              <div className="details">
                <div className="details-image">
                  <img src={product.detailsProduct.image} alt="product.detailsProduct" ></img>
                </div>
                <div className="details-info">
                  <ul>
                    <li>
                      <h4>{product.detailsProduct.name}</h4>
                    </li>
                    <li>
                      {product.detailsProduct.rating} Stars ({product.detailsProduct.numReviews} Reviews)
      </li>
                    <li>
                      Price: <b>${product.detailsProduct.price}</b>
                    </li>
                    <li>
                      Description:
        <div>
                        {product.detailsProduct.description}
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="details-action">
                  <ul>
                    <li>
                      Price: {product.detailsProduct.price}
                    </li>
                    <li>
                      Status: {product.detailsProduct.countInStock > 0 ? "In Stock" : "Unavailable."}
                    </li>
                    <li>
                      Qty: <select value={qty} onChange={(e) => { setQty(e.target.value) }}>
                        {[...Array(product.detailsProduct.countInStock).keys()].map(x =>
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        )}
                      </select>
                    </li>
                    <li>
                      {product.detailsProduct.countInStock > 0 && <button onClick={handleAddToCart} className="button primary" >Add to Cart</button>
                      }
                    </li>
                  </ul>
                </div>
              </div>
            )
        }


      </div>
    }
    else {
      return "Not Yet";
    }
  }
  return !product ? load_conditionals() : load_component();

}
export default ProductPage;
