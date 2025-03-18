"use client";

import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { getUserDetails } from "./authUtils"; // Updated function

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null); // ✅ Add state for user ID

  useEffect(() => {
    // Initialize token and user details from cookies
    const storedToken = Cookies.get("accessToken");
    setToken(storedToken);

    if (storedToken) {
      const { userType, id } = getUserDetails(); // ✅ Get both `userType` and `id`
      setUserType(userType);
      setUserId(id);
    }
  }, []);

  const login = (newToken) => {
    Cookies.set("accessToken", newToken);
    setToken(newToken);

    const { userType, id } = getUserDetails();
    setUserType(userType);
    setUserId(id);
  };

  const logout = () => {
    Cookies.remove("accessToken");
    setToken(null);
    setUserType(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, userType, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
