import React, { useState } from "react";
import Search from "./Search";
import { NavLink } from "react-router-dom";
import img from "../assets/antonio-araujo-dzWY-8meuO0-unsplash.jpg";
import { useRecommendedVideosQuery } from "../redux/features/blogs/blogsApi";

const Blogs = () => {
  const [search, setSearch] = useState("");

  // Fetch blogs with search and category as query parameters
  const { data: blogs = [], error, isLoading } = useRecommendedVideosQuery()
  console.log(blogs);

  // Handle search input change
  // const HandleSearchChange = (e) => setSearch(e.target.value);
console.log(blogs);
  // Handle "Apply" button click
 

  return (
    <div className="mt-8">
    

      {/* Loading and Error Handling */}

      <div/>
      {isLoading && (
        <div className="text-center text-gray-500">
          <p>Loading blogs...</p>
        </div>
      )}
      {error && (
        <div className="text-center text-red-500">
        console.log(error);
        </div>
      )}

      {/* Blog List (YouTube-like Card Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {!isLoading && blogs.length === 0 && (
          <div className="text-center col-span-4 text-gray-500">
            No blogs match your search. Try a different query.
          </div>
        )}
        {blogs.map((item) => {
          const coverImageUrl =
            Array.isArray(item.coverImg) && item.coverImg.length > 0
              ? `http://localhost:3000/uploads/${item.coverImg[0]}`
              : img;

          return (
            <NavLink
              to={`/blogs/${item._id}`}
              key={item._id}
              className="block bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="relative">
                <img
                  src={coverImageUrl}
                  alt={item.title || "Blog cover"}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-md">
                  {item.category || "Category"}
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 line-clamp-2">{item.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-3">{item.description}</p>
                <p className="text-blue-500 mt-2 font-medium">Read More...</p>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
