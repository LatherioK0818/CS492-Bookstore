// src/contexts/AuthProvider.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
  fetchVerifyToken,
  loginUser,
  fetchCurrentUser,
} from "../services/apiServices";
import { AuthContext } from "./AuthContext";
import { storeTokens, clearTokens } from "../utils/tokenUtils";

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    setUserRole(null);
    clearTokens();
  }, []);

  useEffect(() => {
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    else localStorage.removeItem("accessToken");

    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    else localStorage.removeItem("refreshToken");
  }, [accessToken, refreshToken]);

  useEffect(() => {
    const verifyAndFetchUser = async () => {
      if (accessToken) {
        try {
          await fetchVerifyToken(accessToken);
          const userData = await fetchCurrentUser();
          setUser(userData);
          setUserRole(
            userData.is_superuser ? "admin" : userData.is_staff ? "staff" : "user"
          );
        } catch {
          logout();
        }
      }
    };
    verifyAndFetchUser();
  }, [accessToken, logout]);

  const login = async (credentials) => {
    const tokens = await loginUser(credentials);
    setAccessToken(tokens.access);
    setRefreshToken(tokens.refresh);
    storeTokens(tokens);

    const userData = await fetchCurrentUser();
    setUser(userData);
    setUserRole(userData.is_superuser ? "admin" : userData.is_staff ? "staff" : "user");

    return userData;
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, user, userRole, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
