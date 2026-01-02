import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';

export const roleApi = createApi({
  reducerPath: 'roleApi',
  baseQuery,
  tagTypes: ['Role'],
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => '/role',
      providesTags: ['Role'],
    }),
    getRoleById: builder.query({
      query: (id) => `/role/${id}`,
      providesTags: (result, error, id) => [{ type: 'Role', id }],
    }),
    createRole: builder.mutation({
      query: (roleData) => ({
        url: '/role',
        method: 'POST',
        body: roleData,
      }),
      invalidatesTags: ['Role'],
    }),
    updateRole: builder.mutation({
      query: ({ id, ...roleData }) => ({
        url: `/role/${id}`,
        method: 'PUT',
        body: roleData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Role', id }],
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/role/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Role'],
    }),
    assignRole: builder.mutation({
      query: ({ userId, roleId }) => ({
        url: '/role/assign',
        method: 'POST',
        body: { userId, roleId },
      }),
      invalidatesTags: ['Role', 'User'],
    }),
    removeRole: builder.mutation({
      query: ({ userId, roleId }) => ({
        url: '/role/remove',
        method: 'POST',
        body: { userId, roleId },
      }),
      invalidatesTags: ['Role', 'User'],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useAssignRoleMutation,
  useRemoveRoleMutation,
} = roleApi;