import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser, fetchCurrentUser } from "../services/apiServices";
import { AuthContext } from "../contexts/AuthContext";
import PageContainer from "../components/PageContainer";

const Register = () => {
  const { setAccessToken, setRefreshToken, setUser, setUserRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      const tokenData = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      setAccessToken(tokenData.access);
      setRefreshToken(tokenData.refresh);
      localStorage.setItem("accessToken", tokenData.access);
      localStorage.setItem("refreshToken", tokenData.refresh);

      const userData = await fetchCurrentUser();
      setUser(userData);
      setUserRole(userData.is_superuser ? "admin" : userData.is_staff ? "staff" : "user");

      navigate("/inventory");
    } catch (err) {
      setError(err.message || "Registration failed. Try again.");
    }
  };

  return (
    <PageContainer>
      <div style={{ padding: "2rem" }}>
        <h2>Create Your Account</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" required onChange={handleChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" required onChange={handleChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" required onChange={handleChange} />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input type="password" name="confirmPassword" required onChange={handleChange} />
          </div>
          <button type="submit" style={{ marginTop: "1rem" }}>Register & Continue</button>
        </form>
      </div>
    </PageContainer>
  );
};

export default Register;
