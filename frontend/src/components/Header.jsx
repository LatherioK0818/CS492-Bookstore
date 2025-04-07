import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css"; 

const Header = () => {
  return (
    <header style={{ padding: "1rem", background: "#eee" }}>
      <nav>
        <Link to="/" style={{ marginRight: "1rem" }}>Login</Link>
        <Link to="/register" style={{ marginRight: "1rem" }}>Register</Link>
        <Link to="/inventory">Inventory</Link>
      </nav>
    </header>
  );
};

export default Header;
