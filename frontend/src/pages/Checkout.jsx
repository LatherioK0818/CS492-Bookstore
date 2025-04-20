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
  const [paymentInfo, setPaymentInfo] = useState({
    cardholder: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    if (!accessToken) {
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!paymentInfo.cardholder || !paymentInfo.cardNumber || !paymentInfo.expiry || !paymentInfo.cvv) {
      setError("Please fill in all payment information.");
      return;
    }

    try {
      const items = cart.map((item) => ({
        book: item.id,
        quantity: item.orderedQuantity || 1
      }));

      const orderData = {
        items,
        payment: {
          cardholder_name: paymentInfo.cardholder,
          masked_card: `**** **** **** ${paymentInfo.cardNumber.slice(-4)}`
        }
      };

      const createdOrder = await createOrder(orderData);
      clearCart();
      navigate(`/receipt/${createdOrder.id}`);
    } catch (err) {
      setError(err.message || "Something went wrong while placing your order.");
    }
  };

  return (
    <PageContainer>
      <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
        <h2>Checkout</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <div style={{ marginBottom: "1rem" }}>
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

        <div>
          <h3>Payment Information</h3>
          <label>
            Cardholder Name:
            <input type="text" name="cardholder" value={paymentInfo.cardholder} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Card Number:
            <input type="text" name="cardNumber" value={paymentInfo.cardNumber} onChange={handleChange} maxLength={16} required />
          </label>
          <br />
          <label>
            Expiration Date:
            <input type="text" name="expiry" value={paymentInfo.expiry} onChange={handleChange} placeholder="MM/YY" required />
          </label>
          <br />
          <label>
            CVV:
            <input type="text" name="cvv" value={paymentInfo.cvv} onChange={handleChange} maxLength={4} required />
          </label>
        </div>

        <button onClick={handleCheckout} disabled={cart.length === 0} style={{ marginTop: "1rem" }}>
          Submit Payment & Place Order
        </button>
      </div>
    </PageContainer>
  );
};

export default Checkout;
