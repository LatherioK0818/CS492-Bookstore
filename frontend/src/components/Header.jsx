import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import "../styles/Header.css";

const Header = () => {
  const { accessToken, userRole, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="nav-left">
          <Link to="/" className="nav-link">Home</Link>
          {accessToken && (
            <>
              <Link to="/inventory" className="nav-link">Inventory</Link>
              {userRole === "admin" && (
                <Link to="/reports" className="nav-link">Reports</Link>
              )}
            </>
          )}
        </div>

        <div className="nav-right">
          <Link to="/cart" className="nav-link">
            Cart ({cart?.length || 0})
          </Link>

          {!accessToken ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="nav-link">Profile</Link>
              <button onClick={logout} className="nav-button">Logout</button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

