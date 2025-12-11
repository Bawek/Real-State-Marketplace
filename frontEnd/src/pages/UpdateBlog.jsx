import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProfileMutation } from "../redux/features/auth/authApi";
import { useFetchVideoByIdQuery } from "../redux/features/blogs/blogsApi";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for blog (video) data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState(""); // Store the video URL
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [thumbnail,setThumbnail]=useState()
  const [imagePreview, setImagePreview] = useState(""); // Thumbnail preview

  // API hooks
  const { data: blog, isError: fetchError, isLoading: fetchLoading } =useFetchVideoByIdQuery()
  const [updateBlog, { isLoading, isError }] = useUpdateProfileMutation();

  // Populate form with existing blog (video) data
  useEffect(() => {
    if (blog?.data) {
      const { title, description, content, category, rating, videoUrl, thumbnail } = blog.data;
      setTitle(title || "");
      setDescription(description || "");
      setContent(content || "");
      setCategory(category || "");
      setVideoUrl(videoUrl || ""); // Set existing video URL
      if (thumbnail?.[0]) {
        setImagePreview(`http://localhost:3000/uploads/${thumbnail[0]}`);
      }
    }
  }, [blog]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("rating", rating.toString());
    formData.append("videoUrl", videoUrl); // Include video URL in the form data
    if (thumbnail?.[0]) {
      formData.append("file", thumbnail[0]); // Handle thumbnail upload
    }

    try {
      const result = await updateBlog({ id, formData }).unwrap();
      console.log("Blog updated:", result);
      alert("Blog updated successfully");
      navigate(`/blogs/${id}`); // Redirect after successful update
    } catch (error) {
      setError(error.data?.message || "Error updating blog");
      console.error("Update blog error:", error);
    }
  };

  // Handle image (thumbnail) selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setThumbnail([file]);
    }
  };

  return (
    <div className="mx-auto bg-blue-400 p-10 w-full max-w-lg">
      <h1 className="text-2xl font-bold">Update Video Post</h1>

      {/* Error Handling for Fetching Blog */}
      {fetchError && <div className="text-red-500">Error fetching blog data</div>}
      {fetchLoading && <div className="text-gray-500">Loading blog data...</div>}

      {/* Update Form */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-5 py-3"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-5 py-3"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="px-5 py-3"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-5 py-3"
        />
        <input
          type="number"
          placeholder="Rating (0-5)"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="px-5 py-3"
          min="0"
          max="5"
        />

        {/* Video URL */}
        <input
          type="url"
          placeholder="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="px-5 py-3"
        />

        {/* Thumbnail Image Selection */}
        <div className="flex items-center gap-2">
          <label htmlFor="thumbnail" className="cursor-pointer">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Thumbnail Preview"
                className="w-32 h-32 object-cover border rounded"
              />
            ) : (
              <span className="text-green-700">Select Thumbnail Image</span>
            )}
          </label>
          <input
            type="file"
            id="thumbnail"
            onChange={handleImageSelect}
            name="file"
            className="hidden"
          />
        </div>

        {/* Display Error if Occurs */}
        {error && <div className="text-red-500">{error}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || fetchLoading}
          className="px-5 py-3 bg-green-700 text-white"
        >
          {isLoading ? "Updating..." : "Update Video Post"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
