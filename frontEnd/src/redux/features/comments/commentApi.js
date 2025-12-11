import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const commentApi = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/comment", // Ensure the base URL is correct
    credentials: "include", // Use cookies for auth if needed
  }),
  tagTypes: ["comments"], // Use tags for cache management
  endpoints: (builder) => ({
    // Post a new comment
    postComment: builder.mutation({
      query: (commentData) => ({
        url: "/comments", // Updated to match backend route for posting comments
        method: "POST",
        body: commentData, // Pass the comment data to be posted
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: "comments", id: postId }],
    }),
    // Get all comments
    getComment: builder.query({
      query: (postId) => ({
        url: `/comments?postId=${postId}`, // Updated to match backend route for getting comments
        method: "GET",
      }),
      providesTags: (result, error, { postId }) => [
        { type: "comments", id: postId }, // Provides tags for cache invalidation
      ],
    }),
  }),
});

export const { usePostCommentMutation, useGetCommentQuery } = commentApi;

export default commentApi;
