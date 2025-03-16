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
      query: ({ id, newsData }) => ({
        url: `/news/update/${id}`,
        method: "PUT",
        body: newsData,
      }),
    }),

    //* Get all My News :
    // getAllNews: builder.mutation({
    //   query: (data) => ({
    //     url: "/news/getall",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

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
} = newsApi;
