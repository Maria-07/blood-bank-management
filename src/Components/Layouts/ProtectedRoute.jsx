"use client";

import { useAuth } from "@/src/Hook/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "./Loader";

const ProtectedRoute = ({ children, allowedUserTypes = [] }) => {
  const { token, userType, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && allowedUserTypes.length > 0) {
      if (!allowedUserTypes.includes(userType)) {
        router.push("/");
      }
    }
  }, [isLoading, isAuthenticated, userType, allowedUserTypes, router]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (allowedUserTypes.length > 0 && !allowedUserTypes.includes(userType)) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
