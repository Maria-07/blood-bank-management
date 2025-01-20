import { api } from "../../api/apiSlice";

const VolunteerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllVolunteers: builder.query({
      query: () => ({
        url: "/user/unapprovedVolunteer",
        method: "GET",
      }),
    }),
    getAllApprovedVolunteers: builder.query({
      query: () => ({
        url: "/user/getallapprovedvolunteer",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllVolunteersQuery, useGetAllApprovedVolunteersQuery } =
  VolunteerApi;
