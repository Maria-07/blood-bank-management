import Cookies from "js-cookie";

export const getUserDetails = () => {
  const accessToken = Cookies.get("accessToken");

  if (accessToken) {
    try {
      const tokenParts = accessToken.split(".");
      const tokenPayload = tokenParts[1];
      const decodedPayload = atob(tokenPayload);
      const payloadObj = JSON.parse(decodedPayload);

      return {
        userType: payloadObj?.UserType || null,
        id: payloadObj?.UserId || null,
      };
    } catch (error) {
      return { userType: null, id: null };
    }
  }

  return { userType: null, id: null };
};

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const tokenParts = token.split(".");
    const tokenPayload = tokenParts[1];
    const decodedPayload = atob(tokenPayload);
    const payloadObj = JSON.parse(decodedPayload);

    const expiryTime = payloadObj.exp * 1000;
    return expiryTime < Date.now();
  } catch (error) {
    return true;
  }
};

export const getTokenExpiryTime = (token) => {
  if (!token) return null;

  try {
    const tokenParts = token.split(".");
    const tokenPayload = tokenParts[1];
    const decodedPayload = atob(tokenPayload);
    const payloadObj = JSON.parse(decodedPayload);

    return payloadObj.exp * 1000;
  } catch (error) {
    return null;
  }
};

export const getTimeUntilExpiry = (token) => {
  const expiryTime = getTokenExpiryTime(token);
  if (!expiryTime) return 0;

  return expiryTime - Date.now();
};
