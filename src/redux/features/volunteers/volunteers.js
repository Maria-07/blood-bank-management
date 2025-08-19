import { api } from "../../api/apiSlice";

const VolunteerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOfficialLeaders: builder.query({
      query: ({ pageNo, pageSize }) => ({
        url: `/user/getAllAdmin?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
    getScoutLeaders: builder.query({
      query: ({ pageNo, pageSize }) => ({
        url: `/user/getScoutLeaders?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
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

export const {
  useGetOfficialLeadersQuery,
  useGetScoutLeadersQuery,
  useGetAllVolunteersQuery,
  useGetAllApprovedVolunteersQuery,
} = VolunteerApi;
