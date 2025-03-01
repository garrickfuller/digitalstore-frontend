import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState({ cartItems: [] });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: { Authorization: `Bearer ${user?.accessToken}` }
    };
    axios.get('http://localhost:8080/api/cart', config)
      .then(response => {
       
        const data = response.data;
        if (!data.cartItems) {
          data.cartItems = [];
        }
        setCart(data);
      })
      .catch(err => console.error('Error fetching cart:', err));
  }, []);

  const handleClearCart = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: { Authorization: `Bearer ${user?.accessToken}` }
    };
    axios.delete('http://localhost:8080/api/cart/clear', config)
      .then(response => {
        setCart({ cartItems: [] }); // Reset to an empty cart object.
        alert(response.data);
      })
      .catch(err => console.error('Error clearing cart:', err));
  };

  return (
    <div>
      <h2>Your Cart</h2>
      { (cart?.cartItems ?? []).length > 0 ? (
        <>
          <ul>
            {(cart?.cartItems ?? []).map(item => (
              <li key={item.id}>
                {item.product?.name} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
          <button onClick={handleClearCart}>Clear Cart</button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
