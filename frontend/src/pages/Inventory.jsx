import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import { fetchBooks, fetchVerifyToken, fetchDeleteBook } from "../services/apiService";
import "../styles/Inventory.css";

const Inventory = () => {
  const [books, setBooks] = useState([]);
  const [isStaff, setIsStaff] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  // Fetch books from the API
  useEffect(() => {
    async function getBooks() {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
        alert("Failed to load books. Please try again later.");
      }
    }
    getBooks();
  }, []);

  // Verify if the user is a staff member
  useEffect(() => {
    async function verifyStaff() {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          await fetchVerifyToken(token);
          if (user && user.is_staff) {
            setIsStaff(user.is_staff);
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          setIsStaff(false);
        }
      } else {
        setIsStaff(false);
      }
    }
    verifyStaff();
  }, [user]);

  // Handle book deletion
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;

    try {
      await fetchDeleteBook(id);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete the book. Please try again later.");
    }
  };

  // Handle book editing
  const handleEdit = (id) => {
    navigate(`/edit-book/${id}`);
  };

  return (
    <div className="inventory-container">
      <h2>Inventory Dashboard</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Subject</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="7">No books available in inventory.</td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.subject}</td>
                <td>{book.quantity}</td>
                <td>${book.price}</td>
                <td>
                  {isStaff && (
                    <>
                      <button onClick={() => handleEdit(book.id)}>Edit</button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        style={{ marginLeft: "10px", color: "red" }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                  <button onClick={() => addToCart(book)} style={{ marginLeft: "10px" }}>
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
