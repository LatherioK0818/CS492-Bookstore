const API_BASE = import.meta.env.VITE_API_BASE_URL;
console.log("Using API base URL:", API_BASE);

if (!API_BASE) {
  throw new Error("VITE_API_BASE_URL is not defined. Check your .env and restart the dev server.");
}

const getToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

// Refresh the access token using the refresh token
const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token available");

  const response = await fetch(`${API_BASE}/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Token refresh failed");
  }

  const data = await response.json();
  localStorage.setItem("accessToken", data.access);
  return data.access;
};

// Wrapper for secure API calls with token refresh handling
const secureFetch = async (url, options, retry = true, setAccessToken = null) => {
  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401 && retry) {
    try {
      const newAccess = await refreshAccessToken();
      if (setAccessToken) setAccessToken(newAccess);
      return secureFetch(url, options, false, setAccessToken); // retry once
    } catch {
      throw new Error("Session expired. Please log in again.");
    }
  }

  return response;
};


// Books API
export const fetchBooks = async () => {
  const response = await secureFetch(`${API_BASE}/books/`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return response.json();
};

export const fetchDeleteBook = async (id) => {
  const response = await secureFetch(`${API_BASE}/books/${id}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete book");
  }

  return true;
};

export const createBook = async (bookData) => {
  const response = await secureFetch(`${API_BASE}/books/`, {
    method: "POST",
    body: JSON.stringify(bookData),
  });

  if (!response.ok) {
    throw new Error("Failed to create book");
  }

  return response.json();
};

export const updateBook = async (id, bookData) => {
  const response = await secureFetch(`${API_BASE}/books/${id}/`, {
    method: "PUT",
    body: JSON.stringify(bookData),
  });

  if (!response.ok) {
    throw new Error("Failed to update book");
  }

  return response.json();
};

// Orders
export const createOrder = async (orderData) => {
  const response = await secureFetch(`${API_BASE}/orders/`, {
    method: "POST",
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to create order");
  }

  return response.json();
};

export const getOrderById = async (orderId) => {
  const response = await secureFetch(`${API_BASE}/orders/${orderId}/`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch order");
  }

  return response.json();
};

// Auth
export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Registration failed");
  }

  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE}/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Login failed");
  }

  return response.json();  // access & refresh tokens
};

export const fetchCurrentUser = async () => {
  const response = await secureFetch(`${API_BASE}/me/`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }

  return response.json();
};

export const fetchVerifyToken = async (token) => {
  const response = await fetch(`${API_BASE}/token/verify/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    throw new Error("Token verification failed");
  }

  return response.json();
};

export { secureFetch };