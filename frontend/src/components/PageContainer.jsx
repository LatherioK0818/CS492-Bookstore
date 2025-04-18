// components/PageContainer.jsx
import React from "react";
import "../styles/PageContainer.css";

const PageContainer = ({ children }) => {
  return <div className="page-container">{children}</div>;
};

export default PageContainer;
