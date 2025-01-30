import { api } from "../../api/apiSlice";

const campaignApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //* Get all Campaign :
    getAllCampaigns: builder.query({
      query: ({ pageNo, pageSize }) => ({
        url: `/campaign/GetAll?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
        providesTags: [],
      }),
    }),

    //* Get all My Books :
    getAllMyBooks: builder.query({
      query: ({ mail }) => ({
        url: `/books?userEmail=${mail}`,
        method: "GET",
        providesTags: ["books"],
      }),
    }),

    //* Get a single Book
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["books"],
    }),

    //* Update a book
    updateBook: builder.mutation({
      query: ({ id, bookData }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: bookData,
      }),
      invalidatesTags: ["books"],
    }),

    //* Delete a Book
    deleteBook: builder.mutation({
      query: ({ id }) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),

    //* post a book review
    postBookReview: builder.mutation({
      query: ({ id, reviews }) => ({
        url: `/books/${id}/reviews`,
        method: "POST",
        body: reviews,
      }),
      invalidatesTags: ["book"],
    }),
  }),
});

export const {
  useGetAllCampaignsQuery,
  useGetAllMyBooksQuery,
  useGetSingleBookQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  usePostBookReviewMutation,
} = campaignApi;
