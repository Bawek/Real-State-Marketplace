import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Mock roles data
const mockRoles = [
  { _id: '1', name: 'user', description: 'Regular user with basic permissions' },
  { _id: '2', name: 'agent', description: 'Real estate agent with property management permissions' },
  { _id: '3', name: 'landlord', description: 'Property owner with listing management permissions' },
  { _id: '4', name: 'admin', description: 'Administrator with full system access' }
];

// Check if backend is available
const isBackendAvailable = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/role');
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Mock base query for when backend is not available
const mockBaseQuery = async (args) => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
  
  if (args.url === '/role' || args.url.startsWith('/role?')) {
    return {
      data: {
        roles: mockRoles,
        currentPage: 1,
        totalPages: 1,
        totalRoles: mockRoles.length
      }
    };
  }
  
  if (args.url.startsWith('/role/') && args.method === 'GET') {
    const id = args.url.split('/')[2];
    const role = mockRoles.find(r => r._id === id);
    
    if (role) {
      return { data: role };
    } else {
      return { error: { status: 404, data: { message: 'Role not found' } } };
    }
  }
  
  if (args.url === '/role' && args.method === 'POST') {
    return {
      data: {
        _id: 'new' + Date.now(),
        ...args.body,
        createdAt: new Date().toISOString()
      }
    };
  }
  
  if (args.url.startsWith('/role/') && args.method === 'PUT') {
    const id = args.url.split('/')[2];
    return {
      data: {
        _id: id,
        ...args.body,
        updatedAt: new Date().toISOString()
      }
    };
  }
  
  if (args.url.startsWith('/role/') && args.method === 'DELETE') {
    return { data: { message: 'Role deleted successfully' } };
  }
  
  if (args.url.includes('/assign') || args.url.includes('/remove')) {
    return { data: { message: 'Role assignment updated successfully' } };
  }
  
  return { error: { status: 404, data: { message: 'Endpoint not found' } } };
};

export const roleApi = createApi({
  reducerPath: 'roleApi',
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