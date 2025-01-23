"use client";

import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { getUserType } from "./authUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Initialize token and user type from cookies
    const storedToken = Cookies.get("accessToken");
    setToken(storedToken);

    const type = storedToken ? getUserType() : null; // Replace with your `getUserType` logic
    setUserType(type);
  }, []);

  const login = (newToken) => {
    Cookies.set("accessToken", newToken);
    setToken(newToken);
    setUserType(getUserType()); // Replace with your logic to get user type
  };

  const logout = () => {
    Cookies.remove("accessToken");
    setToken(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ token, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
