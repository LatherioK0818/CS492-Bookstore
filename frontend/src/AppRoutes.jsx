// AppRoutes.jsx
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Inventory from "./pages/Inventory";
import BookEntry from "./pages/BookEntry";
import EditBook from "./pages/EditBook";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Reports from "./pages/Reports";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Profile from "./pages/Profile"; // Import your Profile component
import { AuthContext } from "./contexts/AuthContext";

// Route protection
const PrivateRoute = ({ children, roles }) => {
  const { accessToken, userRole } = useContext(AuthContext);
  if (!accessToken) return <Navigate to="/login" />;
  if (roles && !roles.includes(userRole)) return <Navigate to="/" />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/inventory"
        element={
          <PrivateRoute>
            <Inventory />
          </PrivateRoute>
        }
      />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={
        <PrivateRoute>
          <Profile /> {/* Add the Profile route here */}
        </PrivateRoute>
      } />
      <Route
        path="/book-entry"
        element={
          <PrivateRoute>
            <BookEntry />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-book/:id"
        element={
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        }
      />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route
        path="/reports"
        element={
          <PrivateRoute roles={["admin"]}>
            <Reports />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;