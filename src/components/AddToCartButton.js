import React from 'react';
import axios from 'axios';

const AddToCartButton = ({ productId, quantity = 1 }) => {
  const handleAddToCart = () => {
    // Get the JWT token from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user && user.accessToken;

    if (!token) {
      console.error('No token found, please log in.');
      return;
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios.post(`http://localhost:8080/api/cart/add?productId=${productId}&quantity=${quantity}`, {}, config)
      .then(response => {
        console.log('Product added to cart:', response.data);
        
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
      });
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
