import React, { useState } from "react";
import { usePostVideoMutation } from "../redux/features/blogs/blogsApi";

const VideoUploadForm = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [postVideo] = usePostVideoMutation();

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    const videoUrl = URL.createObjectURL(file);
    setVideoPreview(videoUrl);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnailFile(file);
    const thumbnailUrl = URL.createObjectURL(file);
    setThumbnailPreview(thumbnailUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!videoFile || !thumbnailFile || !videoTitle || !description) {
      setError("Please provide all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("img", thumbnailFile);
    formData.append("title", videoTitle);
    formData.append("description", description);

    try {
      setLoading(true);
      const response = await postVideo(formData).unwrap();
      if (response) {
        alert("Video uploaded successfully!");
        setVideoFile(null);
        setThumbnailFile(null);
        setVideoTitle("");
        setDescription("");
        setVideoPreview(null);
        setThumbnailPreview(null);
      }
      else console.log(error);
      setError(error)
   
    } catch (error) {
      setError(error?.data?.message || "Error uploading video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen shadow-md">
      <div className=" p-8 rounded-lg shadow-2xl w-full max-w-xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Upload Video
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700">Video Title:</label>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter video title"
            />
          </div>

          <div>
            <label className="block text-gray-700">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter video description"
            />
          </div>

          <div>
            <label className="block text-gray-700">Video File:</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {videoPreview && (
              <div className="mt-2">
                <video width="100%" height="100%" controls>
                  <source src={videoPreview} />
                </video>
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Thumbnail File:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {thumbnailPreview && (
              <div className="mt-2">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center">
              <span>Loading...</span>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Upload Video
            </button>
          )}

          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default VideoUploadForm;
