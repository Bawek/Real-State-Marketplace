import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const videoApi = createApi({
  reducerPath: "videoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/video", 
    credentials: "include", // For including cookies, such as user authentication
  }),
  endpoints: (builder) => ({
    postVideo: builder.mutation({
      query: (videoData) => ({
        url: "videos",  // Adjust the API endpoint for video upload
        method: "POST",
        body: videoData,     // Send the video data (including video file and other details)
      }),
    }),
    fetchVideoById: builder.query({
      query: (id) => `videos/${id}`, // Fetch a single video by its ID
    }),
    likeVideo: builder.mutation({
      query: (id) => ({
        url: `videos/like/${id}`,  // Endpoint for liking a video
        method: "PATCH",
      }),
    }),
    dislikeVideo: builder.mutation({
      query: (id) => ({
        url: `videos/dislike/${id}`, // Endpoint for disliking a video
        method: "PATCH",
      }),
    }),
    commentOnVideo: builder.mutation({
      query: ({ videoId, commentData }) => ({
        url: `videos/comment/${videoId}`, // Add a comment to a specific video
        method: "POST",
        body: commentData,  // Comment data
      }),
    }),
    subscribeToChannel: builder.mutation({
      query: (channelId) => ({
        url: `videos/subscribe`, // Subscribe to a channel (creator)
        method: "POST",
        body: { channelId },  // Send the channelId (creator's userId)
      }),
    }),
    unsubscribeFromChannel: builder.mutation({
      query: (channelId) => ({
        url: `videos/unsubscribe`, // Unsubscribe from a channel (creator)
        method: "POST",
        body: { channelId },  // Send the channelId (creator's userId)
      }),
    }),
    fetchVideosFromSubscribedChannels: builder.query({
      query: () => "videos/subscribed", // Get videos from subscribed channels
    }),
    recommendedVideos: builder.query({
      query: () => "videos/recommended", // Fetch recommended videos based on user's interests
    }),
    mostViewedVideos: builder.query({
      query: () => "videos/most-viewed", // Fetch the most viewed videos
    }),
  }),
});

export const {
  usePostVideoMutation,
  useFetchVideoByIdQuery,
  useLikeVideoMutation,
  useDislikeVideoMutation,
  useCommentOnVideoMutation,
  useSubscribeToChannelMutation,
  useUnsubscribeFromChannelMutation,
  useFetchVideosFromSubscribedChannelsQuery,
  useRecommendedVideosQuery,
  useMostViewedVideosQuery,
} = videoApi;
