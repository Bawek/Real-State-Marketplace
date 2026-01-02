import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery,
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.sender) queryParams.append('sender', params.sender);
        if (params.receiver) queryParams.append('receiver', params.receiver);
        
        return `/message?${queryParams.toString()}`;
      },
      providesTags: ['Message'],
    }),
    getMessageById: builder.query({
      query: (id) => `/message/${id}`,
      providesTags: (result, error, id) => [{ type: 'Message', id }],
    }),
    sendMessage: builder.mutation({
      query: (messageData) => ({
        url: '/message',
        method: 'POST',
        body: messageData,
      }),
      invalidatesTags: ['Message'],
    }),
    updateMessage: builder.mutation({
      query: ({ id, ...messageData }) => ({
        url: `/message/${id}`,
        method: 'PUT',
        body: messageData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Message', id }],
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/message/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Message'],
    }),
    getConversation: builder.query({
      query: ({ userId, otherUserId }) => `/message/conversation/${userId}/${otherUserId}`,
      providesTags: ['Message'],
    }),
    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/message/${id}/read`,
        method: 'PUT',
      }),
      invalidatesTags: ['Message'],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useGetMessageByIdQuery,
  useSendMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
  useGetConversationQuery,
  useMarkAsReadMutation,
} = messageApi;