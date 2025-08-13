// import { BASE_URL } from "@/config/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { isTokenExpired } from "@/src/Hook/authUtils";

export const getAccessToken = () => {
  return Cookies.get("accessToken");
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, {}) => {
      const token = getAccessToken();

      if (token && !isTokenExpired(token)) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});

export const handleApiError = (error, router) => {
  if (error?.status === 401 || error?.status === 403) {
    Cookies.remove("accessToken");
    router.push("/login");
    return;
  }

  const token = getAccessToken();
  if (token && isTokenExpired(token)) {
    Cookies.remove("accessToken");
    router.push("/login");
    return;
  }
};
