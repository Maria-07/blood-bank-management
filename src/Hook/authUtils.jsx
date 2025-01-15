import Cookies from "js-cookie";

export const getUserType = () => {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    try {
      const tokenParts = accessToken.split(".");
      const tokenPayload = tokenParts[1];
      const decodedPayload = atob(tokenPayload);
      const payloadObj = JSON.parse(decodedPayload);

      console.log("User type:", payloadObj?.UserType);

      return payloadObj?.UserType || null; // Return userType or null if not present
    } catch (error) {
      console.error("Error decoding token:", error.message);
      return null; // Handle invalid token
    }
  }
  return null; // No token found
};
