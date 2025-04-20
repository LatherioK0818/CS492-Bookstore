import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import { fetchBooks, fetchDeleteBook } from "../services/apiServices";
import PageContainer from "../components/PageContainer";
import "../styles/Inventory.css";

const Inventory = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { accessToken } = useContext(AuthContext);

  console.log("Inventory component rendered. accessToken from context:", accessToken);

  useEffect(() => {
    console.log("Inventory useEffect triggered. accessToken:", accessToken);
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data || []);
        console.log("Books state updated:", data);
      } catch (err) {
        console.error("Error fetching books:", err.message);
        setError(err.message || "Failed to load books.");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      loadBooks();
    } else {
      console.log("AccessToken is null or undefined. Not fetching books.");
    }
  }, [accessToken]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;

    try {
      await fetchDeleteBook(id);
      setBooks((prev) => prev.filter((book) => book.id !== id));
      alert("Book deleted successfully.");
    } catch (err) {
      console.error("Error deleting book:", err.message);
      alert("Failed to delete the book.");
    }
  };

  const handleEdit = (id) => navigate(`/edit-book/${id}`);

  return (
    <PageContainer>
      <div className="inventory-container">
        <h2>Inventory Dashboard</h2>

        {loading && <p>Loading books...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && books.length === 0 && <p>No books available.</p>}

        {books.length > 0 && (
          <div className="inventory-table-container">
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
                {books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.isbn}</td>
                    <td>{book.subject}</td>
                    <td>{book.quantity}</td>
                    <td>${book.price}</td>
                    <td>
                       
                        <>
                          <button onClick={() => handleEdit(book.id)}>Edit</button>
                          <button
                            onClick={() => handleDelete(book.id)}
                            className="delete-button"
                          >
                            Delete
                          </button>
                        </>
                      
                      <button onClick={() => addToCart(book)} className="cart-button">
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default Inventory;
