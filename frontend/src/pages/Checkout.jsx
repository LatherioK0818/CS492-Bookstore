import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import { createOrder } from "../services/apiServices";
import PageContainer from "../components/PageContainer";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { accessToken } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!accessToken) {
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      const items = cart.map((item) => ({
        book: item.id,
        quantity: item.orderedQuantity || 1,
      }));

      const orderData = { items };
      await createOrder(orderData);

      clearCart();
      setSuccess("Order placed successfully!");
      setTimeout(() => navigate("/inventory"), 2000);
    } catch (err) {
      setError(err.message || "Something went wrong while placing your order.");
    }
  };

  return (
    <PageContainer>
      <div style={{ padding: "2rem" }}>
        <h2>Checkout</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <div>
          <h3>Order Summary</h3>
          {cart.length > 0 ? (
            <ul>
              {cart.map((book) => (
                <li key={book.id}>
                  {book.title} x {book.orderedQuantity || 1}
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is currently empty.</p>
          )}
        </div>

        <button onClick={handleCheckout} disabled={cart.length === 0}>
          Place Order
        </button>
      </div>
    </PageContainer>
  );
};

export default Checkout;
