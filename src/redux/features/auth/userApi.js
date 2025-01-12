import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (bbmentials) => ({
        url: "/auth/login",
        method: "POST",
        body: bbmentials,
      }),
      invalidatesTags: ["profile"],
    }),
    adminLogin: builder.mutation({
      query: (bbmentials) => ({
        url: "/auth/admin-login",
        method: "POST",
        body: bbmentials,
      }),
      invalidatesTags: ["profile"],
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/users/my-profile",
        method: "GET",
        providesTags: ["profile"],
      }),
    }),
    updateProfile: builder.mutation({
      query: (updatedData) => ({
        url: "/users/my-profile",
        method: "PATCH",
        body: updatedData,
      }),
    }),
    getAllUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
        // providesTags: ["profile"],
      }),
    }),
    getAllUserData: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
        // providesTags: ["profile"],
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useAdminLoginMutation,
  useSignupMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAllUserQuery,
} = userApi;
