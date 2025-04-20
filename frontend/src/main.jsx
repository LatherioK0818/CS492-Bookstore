// src/main.jsx or src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // ✅ Import Router
import App from "./App";
import CartProvider from "./contexts/CartProvider";
import AuthProvider from "./contexts/AuthProvider"; // ✅ Import AuthProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
  /* </React.StrictMode> */
);
