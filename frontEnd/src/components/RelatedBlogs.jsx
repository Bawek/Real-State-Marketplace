import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useRecommendedVideosQuery } from "../redux/features/blogs/blogsApi";

const RelatedBlogs = () => {
  const { id } = useParams();
  const { data: blogs, isLoading, isError } = useRecommendedVideosQuery()

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !blogs || blogs.length === 0) {
    return <p>No related blogs found.</p>;
  }

  return (
    <div className="flex flex-col gap-1">
      {blogs.map((item) => (
        <NavLink  key={item._id} className="flex flex-col sm:flex-row mb-4" to={`/blogs/${item._id}`}>
        <img
        src={
          Array.isArray(item.coverImg) && item.coverImg.length > 0
            && `http://localhost:3000/uploads/${item.coverImg[0]}`
            
        }
        alt={item.title}
        className="w-full max-w-10 rounded-full max-h-10 object-cover"
      />
         
          <div className="ml-4">
            <p className="font-bold text-lg">
              {item.title?.substring(0, 50)}{item.title?.length > 50 && "..."}
            </p>
            <p className="text-gray-600">
              {item.description?.substring(0, 50)}{item.description?.length > 50 && "..."}
            </p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default RelatedBlogs;
