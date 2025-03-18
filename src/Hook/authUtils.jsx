import Cookies from "js-cookie";

export const getUserDetails = () => {
  const accessToken = Cookies.get("accessToken");

  if (accessToken) {
    try {
      const tokenParts = accessToken.split(".");
      const tokenPayload = tokenParts[1];
      const decodedPayload = atob(tokenPayload); // Decode base64
      const payloadObj = JSON.parse(decodedPayload); // Convert to JSON

      // console.log(payloadObj?.UserId);

      // Extract `UserType` & `id`
      return {
        userType: payloadObj?.UserType || null,
        id: payloadObj?.UserId || null,
      };
    } catch (error) {
      console.error("Error decoding token:", error.message);
      return { userType: null, id: null }; // Handle invalid token
    }
  }

  return { userType: null, id: null }; // No token found
};
