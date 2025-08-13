"use client";

import { createContext, useState, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  getUserDetails,
  isTokenExpired,
  getTimeUntilExpiry,
} from "./authUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    setToken(null);
    setUserType(null);
    setUserId(null);
    router.push("/login");
  };

  const validateToken = (tokenToValidate) => {
    if (!tokenToValidate || isTokenExpired(tokenToValidate)) {
      handleLogout();
      return false;
    }
    return true;
  };

  const setupTokenValidation = (tokenToValidate) => {
    if (!tokenToValidate) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const timeUntilExpiry = getTimeUntilExpiry(tokenToValidate);

    if (timeUntilExpiry > 0) {
      timeoutRef.current = setTimeout(() => {
        handleLogout();
      }, timeUntilExpiry);

      intervalRef.current = setInterval(() => {
        const currentToken = Cookies.get("accessToken");
        if (!currentToken || isTokenExpired(currentToken)) {
          handleLogout();
        }
      }, 60000);
    } else {
      handleLogout();
    }
  };

  useEffect(() => {
    const storedToken = Cookies.get("accessToken");

    if (storedToken && validateToken(storedToken)) {
      setToken(storedToken);
      const { userType, id } = getUserDetails();
      setUserType(userType);
      setUserId(id);
      setupTokenValidation(storedToken);
    } else if (storedToken) {
      handleLogout();
    }

    setIsLoading(false);
  }, []);

  const login = (newToken) => {
    if (validateToken(newToken)) {
      Cookies.set("accessToken", newToken);
      setToken(newToken);
      const { userType, id } = getUserDetails();
      setUserType(userType);
      setUserId(id);
      setupTokenValidation(newToken);
    }
  };

  const logout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    handleLogout();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        userType,
        userId,
        login,
        logout,
        isLoading,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
