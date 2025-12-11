import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { NavLink, useParams } from "react-router-dom";
import { useFetchVideoByIdQuery } from "../../redux/features/blogs/blogsApi";

export const ManageItem = () => {
  const [query, setQuery] = useState({ search: "", category: "" });
  const { data: blogs, isLoading, isError, error,refetch} = useFetchVideoByIdQuery(query);


 
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error occurred: {error?.message || "Something went wrong."}</div>}
      {!isLoading && blogs?.length === 0 && <div>No blogs found.</div>}

      <div>
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">All Blogs</div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search Blogs"
              value={query.search}
              onChange={(e) => setQuery({ ...query, search: e.target.value })}
              className="border rounded px-2 py-1"
            />
            <select
              onChange={(e) => setQuery({ ...query, category: e.target.value })}
              className="border rounded px-2 py-1"
            >
              <option value="">Select All</option>
              <option value="technology">Technology</option>
              <option value="music">Music</option>
              <option value="architecture">Architecture</option>
            </select>
          </div>
        </div>

        <div>
          <table className="w-full bg-indigo-100 table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="capitalize bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">No</th>
                <th className="border border-gray-300 px-4 py-2">Blog Name</th>
                <th className="border border-gray-300 px-4 py-2">Published Date</th>
                <th className="border border-gray-300 px-4 py-2">Edit</th>
                <th className="border border-gray-300 px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {blogs?.map((blog, index) => (
                <tr key={blog._id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{blog.title}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <NavLink to={`${blog._id}`}
                      className="flex gap-1 items-center justify-center hover:shadow-md cursor-pointer"
                     
                    >
                      <FaEdit /> Edit
                    </NavLink>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
