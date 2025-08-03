import { api } from "../../api/apiSlice";

const noticeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //* Get all notice :
    getAllNotices: builder.query({
      query: ({ pageNo, pageSize }) => ({
        url: `/notice/getall?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllNoticesQuery } = noticeApi;
