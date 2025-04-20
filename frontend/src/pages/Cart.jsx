import React, { useContext, useMemo } from "react";
import { CartContext } from "../contexts/CartContext";
import Footer from "../components/Footer";
import "../styles/Cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart, handleCheckout, updateOrderedQuantity } =
    useContext(CartContext);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.orderedQuantity || 0) * item.price, 0).toFixed(2);
  }, [cart]);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Ordered Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.cover_url || "/default_cover.png"}
                      alt={`${item.title} cover`}
                      style={{
                        width: "70px",
                        height: "100px",
                        objectFit: "cover",  // ensures it fills without distorting
                        borderRadius: "4px"
                      }}
                      onError={(e) => (e.target.src = "/default_cover.png")}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.orderedQuantity}
                      onChange={(e) =>
                        updateOrderedQuantity(item.id, parseInt(e.target.value, 10) || 1)
                      }
                      style={{ width: "50px" }}
                    />
                  </td>
                  <td>${item.price}</td>
                  <td>${((item.orderedQuantity || 0) * item.price).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)} style={{ color: "red" }}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary">
            <h3>Total: ${cartTotal}</h3>
            <button onClick={handleCheckout} disabled={cart.length === 0}>
              Proceed to Checkout
            </button>
            <button onClick={clearCart} disabled={cart.length === 0} style={{ marginLeft: "10px" }}>
              Clear Cart
            </button>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
