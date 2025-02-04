import { api } from "../../api/apiSlice";

const campaignApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //* Get all Campaign :
    getAllCampaigns: builder.query({
      query: ({ pageNo, pageSize }) => ({
        url: `/campaign/GetAll?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
    //* Get all running and upcoming Campaign :
    getAllRunningCampaigns: builder.query({
      query: ({ pageNo, pageSize }) => ({
        url: `/campaign/getRunningAndUpcomingCampaign?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
    // get all images
    getAllImages: builder.mutation({
      query: (data) => ({
        url: "/media/getcampaignmedia",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllCampaignsQuery,
  useGetAllRunningCampaignsQuery,
  useGetAllImagesMutation,
} = campaignApi;
