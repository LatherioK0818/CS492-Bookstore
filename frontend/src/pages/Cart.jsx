import React, { useState } from "react";
import "../styles/Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // Empty state for now, can be populated from context or props later

  const handleCheckout = () => {
    alert("Checkout functionality not implemented yet.");
  };

  const handleRemove = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${(item.quantity * item.price).toFixed(2)}</td>
                <td>
                  <button onClick={() => handleRemove(item.id)} className="remove-btn">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={handleCheckout} disabled={cartItems.length === 0}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;