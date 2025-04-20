import React from "react";
import PageContainer from "../components/PageContainer"; // Import PageContainer

const HomePage = () => {
  return (
    <PageContainer>
      <div>
        <h1>Welcome to the Bookstore</h1>
        <nav>
            <li><a href="/about">About</a></li>
            <li><a href="/inventory">Inventory</a></li>
        </nav>
        <p>Explore our collection and manage your inventory.</p>
      </div>
    </PageContainer>
  );
};

export default HomePage;
