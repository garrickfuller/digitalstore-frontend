import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddToCartButton from './AddToCartButton';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/products')
      .then(response => {
        console.log('Products:', response.data);
        setProducts(response.data);
      })
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      { products.length === 0 ? (
          <p>No products available</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <AddToCartButton productId={product.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
