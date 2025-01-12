import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (createUser) => ({
        url: "/user/registration",
        method: "POST",
        body: createUser,
      }),
      invalidatesTags: ["profile"],
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: "/user/registration",
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
  useSignupMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAllUserQuery,
} = userApi;
