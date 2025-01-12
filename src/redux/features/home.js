import { api } from "../api/apiSlice";

const homeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => ({
        url: "/bloodbank/getdashboarddata",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardDataQuery } = homeApi;
