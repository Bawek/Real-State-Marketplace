import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { mockAppointments } from '../utils/mockData';

// Check if backend is available
const isBackendAvailable = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/appointment');
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Mock base query for when backend is not available
const mockBaseQuery = async (args) => {
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network delay
  
  if (args.url === '/appointment' || args.url.startsWith('/appointment?')) {
    return {
      data: {
        appointments: mockAppointments,
        currentPage: 1,
        totalPages: 1,
        totalAppointments: mockAppointments.length
      }
    };
  }
  
  if (args.url.startsWith('/appointment/user/')) {
    const userId = args.url.split('/appointment/user/')[1];
    const userAppointments = mockAppointments.filter(apt => 
      apt.propertyId && apt.propertyId._id // Mock user appointments
    );
    
    return {
      data: {
        appointments: userAppointments,
        currentPage: 1,
        totalPages: 1,
        totalAppointments: userAppointments.length
      }
    };
  }
  
  if (args.url.startsWith('/appointment/') && args.method === 'GET') {
    const id = args.url.split('/')[2];
    const appointment = mockAppointments.find(a => a._id === id);
    
    if (appointment) {
      return { data: appointment };
    } else {
      return { error: { status: 404, data: { message: 'Appointment not found' } } };
    }
  }
  
  if (args.url === '/appointment' && args.method === 'POST') {
    return {
      data: {
        _id: 'new' + Date.now(),
        ...args.body,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    };
  }
  
  if (args.url.startsWith('/appointment/') && args.method === 'PUT') {
    const id = args.url.split('/')[2];
    return {
      data: {
        _id: id,
        ...args.body,
        updatedAt: new Date().toISOString()
      }
    };
  }
  
  if (args.url.startsWith('/appointment/') && args.method === 'DELETE') {
    return { data: { message: 'Appointment deleted successfully' } };
  }
  
  if (args.url.includes('/confirm') || args.url.includes('/cancel')) {
    const id = args.url.split('/')[2];
    return {
      data: {
        _id: id,
        status: args.url.includes('/confirm') ? 'confirmed' : 'cancelled',
        updatedAt: new Date().toISOString()
      }
    };
  }
  
  return { error: { status: 404, data: { message: 'Endpoint not found' } } };
};

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
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
  tagTypes: ['Appointment'],
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.userId) queryParams.append('userId', params.userId);
        if (params.propertyId) queryParams.append('propertyId', params.propertyId);
        if (params.status) queryParams.append('status', params.status);
        if (params.date) queryParams.append('date', params.date);
        
        return `/appointment?${queryParams.toString()}`;
      },
      providesTags: ['Appointment'],
    }),
    getUserAppointments: builder.query({
      query: (userId) => `/appointment/user/${userId}`,
      providesTags: ['Appointment'],
    }),
    getAppointmentById: builder.query({
      query: (id) => `/appointment/${id}`,
      providesTags: (result, error, id) => [{ type: 'Appointment', id }],
    }),
    createAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: '/appointment',
        method: 'POST',
        body: appointmentData,
      }),
      invalidatesTags: ['Appointment'],
    }),
    updateAppointment: builder.mutation({
      query: ({ id, ...appointmentData }) => ({
        url: `/appointment/${id}`,
        method: 'PUT',
        body: appointmentData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Appointment', id }],
    }),
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `/appointment/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Appointment'],
    }),
    confirmAppointment: builder.mutation({
      query: (id) => ({
        url: `/appointment/${id}/confirm`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Appointment', id }],
    }),
    cancelAppointment: builder.mutation({
      query: (id) => ({
        url: `/appointment/${id}/cancel`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Appointment', id }],
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useGetUserAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
  useConfirmAppointmentMutation,
  useCancelAppointmentMutation,
} = appointmentApi;