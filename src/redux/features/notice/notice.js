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
    // //* Get all running and upcoming notice :
    // getAllRunningnotices: builder.query({
    //   query: ({ pageNo, pageSize }) => ({
    //     url: `/notice/getRunningAndUpcomingnotice?pageNo=${pageNo}&pageSize=${pageSize}`,
    //     method: "GET",
    //   }),
    // }),
    // //* Get all running and upcoming notice :
    // getAllnoticeMedia: builder.query({
    //   query: ({ noticeId }) => ({
    //     url: `/media/getnoticemedia?noticeId=${noticeId}`,
    //     method: "GET",
    //   }),
    // }),
    // // get all media
    // getAllMedia: builder.mutation({
    //   query: (data) => ({
    //     url: "/media/getallmedia",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

    // //* Delete a Media
    // deleteMedia: builder.mutation({
    //   query: ({ data }) => ({
    //     url: `/media/deletenoticemedia`,
    //     method: "DELETE",
    //     body: data,
    //   }),
    // }),
  }),
});

export const { useGetAllNoticesQuery } = noticeApi;
