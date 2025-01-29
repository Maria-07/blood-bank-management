import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserType: builder.query({
      query: () => ({
        url: "/Auth/usertype",
        method: "GET",
      }),
    }),
    getAllUser: builder.mutation({
      query: (data) => ({
        url: "/user/getall",
        method: "POST",
        body: data,
      }),
    }),
    getAllDonor: builder.mutation({
      query: (data) => ({
        url: "/bloodbank/getbloodbankdata",
        method: "POST",
        body: data,
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
  }),
});

export const {
  useGetUserTypeQuery,
  useGetAllDonorMutation,
  useGetAllUserMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = userApi;
