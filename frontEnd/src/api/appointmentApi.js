import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  baseQuery,
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
        method: 'PUT',
      }),
      invalidatesTags: ['Appointment'],
    }),
    cancelAppointment: builder.mutation({
      query: (id) => ({
        url: `/appointment/${id}/cancel`,
        method: 'PUT',
      }),
      invalidatesTags: ['Appointment'],
    }),
    getUserAppointments: builder.query({
      query: (userId) => `/appointment/user/${userId}`,
      providesTags: ['Appointment'],
    }),
    getPropertyAppointments: builder.query({
      query: (propertyId) => `/appointment/property/${propertyId}`,
      providesTags: ['Appointment'],
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
  useConfirmAppointmentMutation,
  useCancelAppointmentMutation,
  useGetUserAppointmentsQuery,
  useGetPropertyAppointmentsQuery,
} = appointmentApi;