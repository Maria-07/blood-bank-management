import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { isTokenExpired, getTimeUntilExpiry } from "@/src/Hook/authUtils";

const useAutoLogout = () => {
  const router = useRouter();
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    router.push("/login");
  };

  const checkTokenExpiry = () => {
    const token = Cookies.get("accessToken");

    if (!token || isTokenExpired(token)) {
      handleLogout();
      return;
    }

    const timeUntilExpiry = getTimeUntilExpiry(token);

    if (timeUntilExpiry <= 0) {
      handleLogout();
      return;
    }

    if (timeUntilExpiry <= 60000) {
      handleLogout();
      return;
    }
  };

  const setupTokenValidation = () => {
    const token = Cookies.get("accessToken");

    if (!token || isTokenExpired(token)) {
      handleLogout();
      return;
    }

    const timeUntilExpiry = getTimeUntilExpiry(token);

    if (timeUntilExpiry <= 0) {
      handleLogout();
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      handleLogout();
    }, timeUntilExpiry);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      checkTokenExpiry();
    }, 60000);
  };

  useEffect(() => {
    setupTokenValidation();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { handleLogout };
};

export default useAutoLogout;
