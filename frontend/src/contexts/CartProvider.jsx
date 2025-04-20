import React, { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book) => {
    setCart((prevCart) => {
      const existingBook = prevCart.find((item) => item.id === book.id);
      if (existingBook) {
        return prevCart.map((item) =>
          item.id === book.id
            ? { ...item, orderedQuantity: (item.orderedQuantity || 0) + 1 }
            : item
        );
      }
      return [...prevCart, { ...book, orderedQuantity: 1 }];
    });
  };

  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateOrderedQuantity = (bookId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === bookId ? { ...item, orderedQuantity: quantity } : item
      )
    );
  };

  const handleCheckout = () => {
    const confirmed = window.confirm("Are you sure you want to place this order?");
    if (confirmed) {
      console.log("Checked out:", cart);
      clearCart();
      alert("Thank you for your order!");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateOrderedQuantity,
        handleCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
