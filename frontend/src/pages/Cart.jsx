import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import "../styles/Cart.css"; 

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items before proceeding to checkout.");
    } else {
      alert("Proceeding to checkout functionality not implemented yet.");
      // Implement checkout functionality here, for example, making an API call to create an order.
    }
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
                  <button onClick={() => removeFromCart(item.id)} style={{ color: "red" }}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="cart-summary">
        <button onClick={handleCheckout} disabled={cartItems.length === 0}>
          Proceed to Checkout
        </button>
        <button onClick={clearCart} disabled={cartItems.length === 0} style={{ marginLeft: "10px" }}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
