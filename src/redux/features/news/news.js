import { api } from "../../api/apiSlice";

const newsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //* post a news
    postNews: builder.mutation({
      query: (data) => ({
        url: "/news/create",
        method: "POST",
        body: data,
      }),
    }),

    //* Update a news
    updateNews: builder.mutation({
      query: (newsData) => ({
        url: `/news/update`,
        method: "PUT",
        body: newsData,
      }),
    }),

    //* Delete a News
    deleteNews: builder.mutation({
      query: ({ id }) => ({
        url: `/news/delete/${id}`,
        method: "DELETE",
      }),
    }),

    getAllNews: builder.query({
      query: ({ pageNo, pageSize }) => ({
        url: `/news/getall?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  // useGetAllNewsMutation,
  useGetAllNewsQuery,
  usePostNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsApi;
