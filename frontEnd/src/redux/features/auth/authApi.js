import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/user", // Update with the correct base URL for your API
    credentials: "include", // Use cookies for auth if needed (e.g., for token-based auth)
  }),
  tagTypes: ["User", "Auth"],
  endpoints: (builder) => ({
    // Register a new user
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),

    // Login a user
    loginUser: builder.mutation({
      query: (loginData) => ({
        url: "/login",
        method: "POST",
        body: loginData,
      }),
    }),

    // Logout a user
    logOutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    // Change user password
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/change-password",
        method: "PUT",
        body: passwordData,
      }),
    }),

    // Update user profile
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "/update-profile",
        method: "PUT",
        body: profileData,
      }),
    }),

    // Get all users (admin-only)
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),

    // Delete a user (admin-only)
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "DELETE",
      }),
    }),

    // Update user (admin-only)
    updateUser: builder.mutation({
      query: (userUpdateData) => ({
        url: `/user/${userUpdateData.id}`,
        method: "PUT",
        body: userUpdateData,
      }),
    }),

    // Admin-only route to create a new user
    createUserAdmin: builder.mutation({
      query: (userData) => ({
        url: "/admin/create-user",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogOutUserMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useCreateUserAdminMutation,
} = authApi;

export default authApi;
