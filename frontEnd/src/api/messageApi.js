import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { mockMessages } from '../utils/mockData';

// Check if backend is available
const isBackendAvailable = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/message');
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Mock base query for when backend is not available
const mockBaseQuery = async (args) => {
  await new Promise(resolve => setTimeout(resolve, 400)); // Simulate network delay
  
  if (args.url === '/message' || args.url.startsWith('/message?')) {
    return {
      data: {
        messages: mockMessages,
        currentPage: 1,
        totalPages: 1,
        totalMessages: mockMessages.length
      }
    };
  }
  
  if (args.url.includes('/conversation/')) {
    const conversationId = args.url.split('/conversation/')[1];
    const conversationMessages = mockMessages.filter(msg => 
      msg.sender._id === conversationId || msg.receiver === conversationId
    );
    
    return {
      data: {
        messages: conversationMessages,
        currentPage: 1,
        totalPages: 1,
        totalMessages: conversationMessages.length
      }
    };
  }
  
  if (args.url.startsWith('/message/') && args.method === 'GET') {
    const id = args.url.split('/')[2];
    const message = mockMessages.find(m => m._id === id);
    
    if (message) {
      return { data: message };
    } else {
      return { error: { status: 404, data: { message: 'Message not found' } } };
    }
  }
  
  if (args.url === '/message' && args.method === 'POST') {
    return {
      data: {
        _id: 'new' + Date.now(),
        ...args.body,
        timestamp: new Date().toISOString(),
        read: false
      }
    };
  }
  
  if (args.url.includes('/mark-read')) {
    return { data: { message: 'Message marked as read' } };
  }
  
  if (args.url.includes('/unread-count')) {
    const unreadCount = mockMessages.filter(m => !m.read).length;
    return { data: { unreadCount } };
  }
  
  return { error: { status: 404, data: { message: 'Endpoint not found' } } };
};

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: async (args, api, extraOptions) => {
    const backendAvailable = await isBackendAvailable();
    
    if (backendAvailable) {
      return fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        prepareHeaders: (headers, { getState }) => {
          const token = getState().auth?.user?.token;
          if (token) {
            headers.set('authorization', `Bearer ${token}`);
          }
          return headers;
        },
      })(args, api, extraOptions);
    } else {
      return mockBaseQuery(args);
    }
  },
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.sender) queryParams.append('sender', params.sender);
        if (params.receiver) queryParams.append('receiver', params.receiver);
        if (params.read !== undefined) queryParams.append('read', params.read);
        
        return `/message?${queryParams.toString()}`;
      },
      providesTags: ['Message'],
    }),
    getConversation: builder.query({
      query: (userId) => `/message/conversation/${userId}`,
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
    markAsRead: builder.mutation({
      query: (messageId) => ({
        url: `/message/${messageId}/mark-read`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, messageId) => [{ type: 'Message', id: messageId }],
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/message/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Message'],
    }),
    getUnreadCount: builder.query({
      query: () => '/message/unread-count',
      providesTags: ['Message'],
    }),
    getConversations: builder.query({
      query: () => '/message/conversations',
      providesTags: ['Message'],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useGetConversationQuery,
  useGetMessageByIdQuery,
  useSendMessageMutation,
  useMarkAsReadMutation,
  useDeleteMessageMutation,
  useGetUnreadCountQuery,
  useGetConversationsQuery,
} = messageApi;