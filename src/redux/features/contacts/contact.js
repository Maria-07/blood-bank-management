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
    getEmergencyContacts: builder.query({
      query: ({ pageNo, pageSize }) => ({
        url: `/user/getEmergencyContactList?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
    makeEmergencyContact: builder.mutation({
      query: (data) => ({
        url: "/user/makeEmergencyContact",
        method: "POST",
        body: data,
      }),
    }),
    deleteEmergencyContact: builder.mutation({
      query: (data) => ({
        url: "/user/removeFromEmergencyContact",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useGetMessageReadMutation,
  useGetEmergencyContactsQuery,
  useMakeEmergencyContactMutation,
  useDeleteEmergencyContactMutation,
} = ContactsApi;
