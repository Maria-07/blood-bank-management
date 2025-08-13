import Cookies from "js-cookie";
import { isTokenExpired } from "@/src/Hook/authUtils";

export const apiRequest = async (
  endpoint,
  header = "application/json",
  method = "GET",
  body = null,
  token = null
) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const headers = {
    "Content-Type": `${header}`,
  };

  const tokenToUse = token || Cookies.get("accessToken");

  if (tokenToUse && !isTokenExpired(tokenToUse)) {
    headers.Authorization = `Bearer ${tokenToUse}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, options);

    if (response.status === 401 || response.status === 403) {
      Cookies.remove("accessToken");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new Error("Unauthorized access");
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message === "Unauthorized access") {
      throw error;
    }

    const currentToken = Cookies.get("accessToken");
    if (currentToken && isTokenExpired(currentToken)) {
      Cookies.remove("accessToken");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    throw error;
  }
};

export const handleApiResponse = (response, router) => {
  if (response?.status === 401 || response?.status === 403) {
    Cookies.remove("accessToken");
    router.push("/login");
    return false;
  }

  const token = Cookies.get("accessToken");
  if (token && isTokenExpired(token)) {
    Cookies.remove("accessToken");
    router.push("/login");
    return false;
  }

  return true;
};
