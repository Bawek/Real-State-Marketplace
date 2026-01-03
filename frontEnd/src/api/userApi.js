import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { mockUser } from '../utils/mockData';

// Check if backend is available
const isBackendAvailable = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/user');
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Mock base query for when backend is not available
const mockBaseQuery = async (args) => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
  
  if (args.url === '/login' && args.method === 'POST') {
    const { email, password } = args.body;
    
    // Simple mock authentication
    if (email === 'test@example.com' && password === 'password') {
      return {
        data: {
          user: mockUser,
          message: 'Login successful'
        }
      };
    } else {
      return {
        error: {
          status: 401,
          data: { message: 'Invalid credentials' }
        }
      };
    }
  }
  
  if (args.url === '/register' && args.method === 'POST') {
    return {
      data: {
        user: { ...mockUser, ...args.body, _id: 'newuser123' },
        message: 'Registration successful'
      }
    };
  }
  
  if (args.url === '/logout' && args.method === 'POST') {
    return {
      data: { message: 'Logout successful' }
    };
  }
  
  if (args.url === '/profile' && args.method === 'GET') {
    return {
      data: mockUser
    };
  }
  
  if (args.url.startsWith('/profile') && args.method === 'PUT') {
    return {
      data: { ...mockUser, ...args.body }
    };
  }
  
  return { error: { status: 404, data: { message: 'Endpoint not found' } } };
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: async (args, api, extraOptions) => {
    const backendAvailable = await isBackendAvailable();
    
    if (backendAvailable) {
      return fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/user',
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
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    getProfile: builder.query({
      query: () => '/profile',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: '/profile',
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: '/change-password',
        method: 'POST',
        body: passwordData,
      }),
    }),
    getUsers: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.role) queryParams.append('role', params.role);
        if (params.search) queryParams.append('search', params.search);
        
        return `?${queryParams.toString()}`;
      },
      providesTags: ['User'],
    }),
    getUserById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
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
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;