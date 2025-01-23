import { api } from "../../api/apiSlice";

const VolunteerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllVolunteers: builder.query({
      query: () => ({
        url: "/user/getUnapprovedVolunteer",
        method: "GET",
      }),
    }),
    getAllApprovedVolunteers: builder.query({
      query: () => ({
        url: "/user/getApprovedVolunteer",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllVolunteersQuery, useGetAllApprovedVolunteersQuery } =
  VolunteerApi;
