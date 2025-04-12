import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getToken, removeToken, isTokenExpired } from "./utils/auth";

const useAutoLogout = () => {
  const history = useHistory();

  useEffect(() => {
    const token = getToken();

    if (isTokenExpired(token)) {
      handleLogout();
    } else {
      // Optionally, set a timer to log out when the token expires
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      const expiryTime = decoded.exp * 1000;

      const timeout = setTimeout(() => {
        handleLogout();
      }, expiryTime - Date.now());

      // Cleanup timeout when the component unmounts
      return () => clearTimeout(timeout);
    }
  }, [history]);

  const handleLogout = () => {
    removeToken(); // Remove token from localStorage/sessionStorage
    history.push("/login"); // Redirect to the login page
  };
};

export default useAutoLogout;
