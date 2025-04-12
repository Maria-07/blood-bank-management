// utils/auth.js

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT to get the expiration time
  const expiryTime = decoded.exp * 1000; // Expiry time in milliseconds
  return expiryTime < Date.now();
};
