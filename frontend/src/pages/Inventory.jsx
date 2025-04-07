import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Inventory.css"; 

const Inventory = () => {
  const [books, setBooks] = useState([]);
const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/books/")  
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching inventory:", err));
  }, []);
  
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;
  
    fetch(`http://127.0.0.1:8000/api/books/${id}/`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        } else {
          console.error("Failed to delete book.");
        }
      })
      .catch((err) => console.error("Error deleting book:", err));
  };

  const handleEdit = (id) => {
    navigate(`/edit-book/${id}`);
  };
  

  return (
    <div className="inventory-container">
      <h2>Inventory Dashboard</h2>
      <div style={{ marginBottom: "20px" }}>
  <Link to="/add-book">
    <button>Add New Book</button>
  </Link>
</div>
      <table className="inventory-table">
      <thead>
  <tr>
    <th>Title</th>
    <th>Author</th>
    <th>ISBN</th>
    <th>Subject</th>
    <th>Quantity</th>
    <th>Price</th>
    <th>Actions</th> {/* Add this here */}
  </tr>
</thead>

        <tbody>
  {books.map((book) => (
    <tr key={book.id}>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.isbn}</td>
      <td>{book.subject}</td>
      <td>{book.quantity}</td>
      <td>${book.price}</td>
      <td>
  <button onClick={() => handleEdit(book.id)}>Edit</button>
  <button
    onClick={() => handleDelete(book.id)}
    style={{ marginLeft: "10px", color: "red" }}
  >
    Delete
  </button>
</td>

    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default Inventory;
