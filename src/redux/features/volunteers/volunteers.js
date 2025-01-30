import { api } from "../../api/apiSlice";

const VolunteerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllVolunteers: builder.query({
      query: ({ pageNo, pageSize }) => ({
        url: `/user/getUnapprovedVolunteer?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
    getAllApprovedVolunteers: builder.query({
      query: ({ pageNo, pageSize }) => ({
        url: `/user/getApprovedVolunteer?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllVolunteersQuery, useGetAllApprovedVolunteersQuery } =
  VolunteerApi;
