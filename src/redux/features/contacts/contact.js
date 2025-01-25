import { api } from "../../api/apiSlice";

const ContactsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllContacts: builder.query({
      query: ({ pageNo, pageSize, contactType }) => ({
        url: `contact/getall?pageNo=${pageNo}&pageSize=${pageSize}&contactType=${contactType}`,
        method: "GET",
      }),
    }),
    getMessageRead: builder.mutation({
      query: (data) => ({
        url: "/contact/read",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllContactsQuery, useGetMessageReadMutation } =
  ContactsApi;
