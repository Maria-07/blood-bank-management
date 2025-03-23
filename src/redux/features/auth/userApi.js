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
    getAllAdmin: builder.query({
      query: ({ pageNo, pageSize }) => ({
        url: `/user/getAllAdmin?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
    getAllDonor: builder.mutation({
      query: (data) => ({
        url: "/bloodbank/getbloodbankdata",
        method: "POST",
        body: data,
      }),
    }),
    getAllApprovedDonor: builder.mutation({
      query: (data) => ({
        url: "/user/getApprovedDonor",
        method: "POST",
        body: data,
      }),
    }),
    getAllPendingDonor: builder.mutation({
      query: (data) => ({
        url: "/user/getUnapprovedDonor",
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: (userId) => ({
        url: `/user/getbyid/${userId}`,
        method: "GET",
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
  useGetAllAdminQuery,
  useGetAllUserMutation,
  useGetAllApprovedDonorMutation,
  useGetAllPendingDonorMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = userApi;
