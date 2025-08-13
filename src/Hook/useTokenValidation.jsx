import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { isTokenExpired, getTimeUntilExpiry } from "./authUtils";

const useTokenValidation = () => {
  const router = useRouter();
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const logout = useCallback(() => {
    Cookies.remove("accessToken");
    router.push("/login");
  }, [router]);

  const validateToken = useCallback(
    (token) => {
      if (!token || isTokenExpired(token)) {
        logout();
        return false;
      }
      return true;
    },
    [logout]
  );

  const setupTokenValidation = useCallback(
    (token) => {
      if (!token) return;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      const timeUntilExpiry = getTimeUntilExpiry(token);

      if (timeUntilExpiry > 0) {
        timeoutRef.current = setTimeout(() => {
          logout();
        }, timeUntilExpiry);

        intervalRef.current = setInterval(() => {
          const currentToken = Cookies.get("accessToken");
          if (!currentToken || isTokenExpired(currentToken)) {
            logout();
          }
        }, 60000);
      } else {
        logout();
      }
    },
    [logout]
  );

  const checkTokenOnFocus = useCallback(() => {
    const token = Cookies.get("accessToken");
    if (token && isTokenExpired(token)) {
      logout();
    }
  }, [logout]);

  const checkTokenOnVisibilityChange = useCallback(() => {
    if (!document.hidden) {
      checkTokenOnFocus();
    }
  }, [checkTokenOnFocus]);

  useEffect(() => {
    const token = Cookies.get("accessToken");

    if (token) {
      if (validateToken(token)) {
        setupTokenValidation(token);
      }
    }

    window.addEventListener("focus", checkTokenOnFocus);
    document.addEventListener("visibilitychange", checkTokenOnVisibilityChange);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      window.removeEventListener("focus", checkTokenOnFocus);
      document.removeEventListener(
        "visibilitychange",
        checkTokenOnVisibilityChange
      );
    };
  }, [
    validateToken,
    setupTokenValidation,
    checkTokenOnFocus,
    checkTokenOnVisibilityChange,
  ]);

  return {
    validateToken,
    logout,
    setupTokenValidation,
    checkTokenOnFocus,
  };
};

export default useTokenValidation;
