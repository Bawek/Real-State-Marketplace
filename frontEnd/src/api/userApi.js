import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => {
        const formData = new FormData();
        Object.keys(userData).forEach(key => {
          if (key === 'photo' && userData[key] instanceof File) {
            formData.append(key, userData[key]);
          } else {
            formData.append(key, userData[key]);
          }
        });
        
        return {
          url: '/user/register',
          method: 'POST',
          body: formData,
          headers: {}, // Let browser set Content-Type for FormData
        };
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/user/logout',
        method: 'POST',
      }),
    }),
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: '/user/change-password',
        method: 'PUT',
        body: passwordData,
      }),
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: '/user/update-profile',
        method: 'PUT',
        body: profileData,
      }),
    }),
    getAllUsers: builder.query({
      query: () => '/user/get-all-users',
      providesTags: ['User'],
    }),
    getUserById: builder.query({
      query: (id) => `/user/get-single-user${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    updateUserRole: builder.mutation({
      query: ({ id, ...roleData }) => ({
        url: `/user/update-role${id}`,
        method: 'PUT',
        body: roleData,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/remove${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = userApi;