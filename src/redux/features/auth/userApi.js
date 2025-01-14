import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/Auth/token",
        method: "POST",
        body: userInfo,
      }),
    }),
    signup: builder.mutation({
      query: (formData) => ({
        url: "/user/registration",
        method: "POST",
        body: formData,
      }),
    }),
    getUserType: builder.query({
      query: () => ({
        url: "/Auth/usertype",
        method: "GET",
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
  useSignupMutation,
  useGetUserTypeQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = userApi;
