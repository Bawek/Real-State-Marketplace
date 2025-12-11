import React from "react";
import { useParams } from "react-router-dom";
import RelatedBlogs from "../components/RelatedBlogs";
import Comment from "../components/Comment";
import { useFetchVideoByIdQuery } from "../redux/features/blogs/blogsApi";

const SinglePage = () => {
  const { id } = useParams();
  const { data: video, isLoading, error } = useFetchVideoByIdQuery(id);
  console.log(video);

  // Safely destructure `data` and `comments` from `video`
  const { data = {}, comments = [] } = video || {};

  // Destructure fields from `data`
  const {
    title = "Untitled Video",
    description = "No description available.",
    createdAt,
    content, // This will no longer be used for video content (we use video URL instead)
    author = "Anonymous",
    coverImg = [],
    videoUrl = "", // The URL of the video
  } = data;

  // Fallback for cover image
  const coverImageUrl =
    Array.isArray(coverImg) && coverImg.length > 0
      ? `http://localhost:3000/uploads/${coverImg[0]}`
      : "https://via.placeholder.com/800x600?text=No+Image+Available";

  return (
    <div className="container mx-auto p-6">
      {/* Loading and Error States */}
      {isLoading && <div className="text-center text-blue-500">Loading...</div>}
      {error && (
        <div className="text-center text-red-500">
          Error occurred: {error?.message || "Something went wrong!"}
        </div>
      )}

      {/* Video Content */}
      {!isLoading && video && (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Video Main Content */}
          <div className="w-full lg:w-2/3 p-2 bg-white shadow-2xl">
            <h1 className="text-4xl font-bold mt-6">{title}</h1>
            <p className="text-gray-500 italic mt-2">
              {createdAt ? new Date(createdAt).toLocaleDateString() : "Unknown date"}
            </p>
            {/* Embed Video */}
            <div className="relative pt-9/16 h-0 overflow-hidden rounded-lg bg-black mt-4">
              {videoUrl && (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={videoUrl}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
            <p className="mt-4 text-gray-700">By: {author}</p>
            <div className="text-gray-800 mt-4">{description}</div>

            {/* Comments Section */}
            <div className="mt-6">
              <h2 className="text-2xl font-semibold">Comments:</h2>
              {comments.length > 0 ? (
                <ul className="mt-2 list-disc list-inside shadow-2xl p-3">
                  {comments.map((comment) => (
                    <li
                      key={comment._id || comment.user?.name || comment.text}
                      className="text-gray-700 flex flex-col shadow-lg shadow-gray-200"
                    >
                      <div className="p-4 shadow-md">
                        <i className="fa fa-user fa-4x" aria-hidden="true"></i>
                        <strong>{comment.user?.name || "Anonymous"}</strong>:{" "}
                        <strong>{comment.user?.email || "Anonymous"}</strong>
                      </div>
                      <div className="border border-blue-500 p-5">
                        {comment.comment || "No comment text provided."}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 mt-2">No comments yet.</p>
              )}
            </div>

            {/* Comment Input */}
            <Comment />
          </div>

          {/* Sidebar or Related Videos */}
          <div className="w-full lg:w-1/3 bg-gray-100 p-4 rounded-lg shadow-lg">
            <RelatedBlogs />
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePage;
