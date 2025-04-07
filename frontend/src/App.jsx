import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Inventory from "./pages/Inventory";
import BookEntry from "./pages/BookEntry";
import EditBook from "./pages/EditBook";
import Cart from "./pages/Cart";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/book-entry" element={<BookEntry />} />
        <Route path="/edit/:id" element={<EditBook />} />
        <Route path="/add-book" element={<BookEntry />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
