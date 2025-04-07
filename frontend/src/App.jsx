// src/App.jsx
import React from "react";
import { AuthProvider } from './contexts/AuthProvider';
import { CartProvider } from './contexts/CartProvider'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Inventory from "./pages/Inventory";
import BookEntry from "./pages/BookEntry";
import EditBook from "./pages/EditBook";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Header from "./components/Header";
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
    <AuthProvider>
      <CartProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
            <Route path="/book-entry" element={<ProtectedRoute><BookEntry /></ProtectedRoute>} />
            <Route path="/edit/:id" element={<ProtectedRoute><EditBook /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          </Routes>
       
      </CartProvider>
    </AuthProvider> 
    </Router>
  );
};


export default App;