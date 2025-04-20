// src/components/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children, roles }) => {
  const { accessToken, userRole } = useContext(AuthContext);

  if (!accessToken) return <Navigate to="/login" />;
  if (roles && !roles.includes(userRole)) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
