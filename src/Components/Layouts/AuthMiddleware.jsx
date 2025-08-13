"use client";

import { useAuth } from "@/src/Hook/AuthContext";
import useTokenValidation from "@/src/Hook/useTokenValidation";

const AuthMiddleware = ({ children }) => {
  const { isLoading } = useAuth();
  useTokenValidation();

  if (isLoading) {
    return null;
  }

  return children;
};

export default AuthMiddleware;
