import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Replace the URL below with your backend endpoint that returns a list of products.
  useEffect(() => {
    axios.get('http://localhost:8080/api/products')
      .then(response => setProducts(response.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      { products.length === 0 ? (
          <p>No products available</p>
      ) : (
        <ul>
          {products.map(p => (
            <li key={p.id}>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <p>Price: ${p.price}</p>
              {/* Optionally add a button to add the product to the cart */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
