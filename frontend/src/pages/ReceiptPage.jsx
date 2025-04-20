// pages/ReceiptPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../services/apiServices";
import PageContainer from "../components/PageContainer";

const ReceiptPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (err) {
        setError("Unable to load receipt.");
      }
    };

    fetchOrder();
  }, [orderId]);

  if (error) {
    return (
      <PageContainer>
        <p style={{ color: "red" }}>{error}</p>
      </PageContainer>
    );
  }

  if (!order) {
    return (
      <PageContainer>
        <p>Loading receipt...</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
        <h2>✅ Order Receipt</h2>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>

        {order.payment && (
          <>
            <p><strong>Cardholder:</strong> {order.payment.cardholder_name}</p>
            <p><strong>Card:</strong> {order.payment.masked_card}</p>
          </>
        )}

        <h3>Items:</h3>
        <ul>
          {order.items.map((item, idx) => (
            <li key={idx}>
              {item.book_title || "Book"} × {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </PageContainer>
  );
};

export default ReceiptPage;
