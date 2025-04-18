import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import AppRoutes from "./AppRoutes"; // Centralized route definitions
import AuthProvider from "./contexts/AuthProvider";
import CartProvider from "./contexts/CartProvider";
import Footer from "./components/Footer"; // Import Footer

const App = () => {
  return (
    <><AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <AppRoutes />
        </Router>
      </CartProvider>
    </AuthProvider><Footer> </Footer></>
  );
};

export default App;
