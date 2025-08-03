import { api } from "../../api/apiSlice";

const ReviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: ({ pageNo, pageSize }) => ({
        url: `/review/approvedReviews?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
    getAllUnapprovedReviews: builder.query({
      query: ({ pageNo, pageSize }) => ({
        url: `/review/unapprovedReviews?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: "/review/post",
        method: "POST",
        body: data,
      }),
    }),
    approveReview: builder.mutation({
      query: (data) => ({
        url: "/review/Approve",
        method: "POST",
        body: data,
      }),
    }),
    removeReview: builder.mutation({
      query: (data) => ({
        url: "/review/Disapprove",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useAddReviewMutation,
  useGetAllUnapprovedReviewsQuery,
  useApproveReviewMutation,
  useRemoveReviewMutation,
} = ReviewApi;
