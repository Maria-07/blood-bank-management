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
    //* Get all Campaign :
    getAllVolunteerPermittedCampaigns: builder.query({
      query: ({ pageNo, pageSize }) => ({
        url: `/campaign/getVolunteerPermittedCampaigns?pageNo=${pageNo}&pageSize=${pageSize}`,
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
    //* Get all running and upcoming Campaign :
    getAllCampaignMedia: builder.query({
      query: ({ campaignId }) => ({
        url: `/media/getcampaignmedia?campaignId=${campaignId}`,
        method: "GET",
      }),
    }),
    // get all media
    getAllMedia: builder.mutation({
      query: (data) => ({
        url: "/media/getallmedia",
        method: "POST",
        body: data,
      }),
    }),

    //* Delete a Media
    deleteMedia: builder.mutation({
      query: (data) => ({
        url: `/media/deletecampaignmedia`,
        method: "DELETE",
        body: data,
      }),
    }),

    postDonationTracking: builder.mutation({
      query: (data) => ({
        url: `/donationTracking/Upsert`,
        method: "POST",
        body: data,
      }),
    }),

    getDonationTracking: builder.query({
      query: ({ pageNo, pageSize, startTime, endTime }) => ({
        url: `/donationTracking/GetHighestDonorList?pageNo=${pageNo}&pageSize=${pageSize}&startTime=${startTime}&endTime=${endTime}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllCampaignsQuery,
  useGetAllVolunteerPermittedCampaignsQuery,
  useGetAllRunningCampaignsQuery,
  useGetAllMediaMutation,
  useGetAllCampaignMediaQuery,
  useDeleteMediaMutation,
  usePostDonationTrackingMutation,
  useGetDonationTrackingQuery,
} = campaignApi;
