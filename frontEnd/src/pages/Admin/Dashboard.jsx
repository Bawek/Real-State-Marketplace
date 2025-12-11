import React, { useState } from "react";
import { FaBlog, FaComment, FaUserShield } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import {   useCommentOnVideoMutation, useRecommendedVideosQuery} from "../../redux/features/blogs/blogsApi";

import Chart from './Chart';
import Blogs from './../../components/Blogs';
import { useGetAllUsersQuery } from "../../redux/features/auth/authApi";

const Dashboard = () => {
  const {user}  = useSelector((state) => state.auth);

  // State for filtering blogs
  const [query, setQuery] = useState({ search: "", category: "" });

  // API Queries
  const { data: blogs, isLoading: blogsLoading } =   useRecommendedVideosQuery(query);
  const { data: users, isLoading: usersLoading ,error:userError} = useGetAllUsersQuery();
  const { data: comments, isLoading: commentsLoading ,error:commentError} = useCommentOnVideoMutation();

  if (userError) {
    console.log(userError,commentError);
  }
  // Calculate counts
  const blogCount = blogs?.length || 0;
  const userCount = users?.users.length || 0;
  const commentCount = comments?.data.length || 0;
  const admincount=users?.users.filter((item)=>item.role==="admin").length ||0
  // Combine loading states
  const isLoading = blogsLoading || usersLoading || commentsLoading;

  return (
    <div className="flex flex-col gap-5">
      {/* Loading Indicator */}
      {isLoading && (
        <div className="text-center p-4">
          <p>Loading data, please wait...</p>
        </div>
      )}
    
      {/* Welcome Section */}
      <div className="w-full bg-indigo-100 p-4 rounded-md shadow-md">
        <h1 className="text-xl font-bold">Hi {user.name},</h1>
        <h2 className="text-lg">Welcome to the Admin Page!</h2>
        <p>Here you can manage your posts, users, and other administrative tasks.</p>
      </div>

      {/* Icons Section */}
      <div className="w-full bg-indigo-100 p-4 flex flex-col sm:flex-row flex-wrap gap-1 justify-between rounded-md shadow-md">
        <div className="bg-indigo-500 flex-grow sm:flex-grow-0 py-4 px-6 text-center rounded shadow">
          <FiUser size={36} className="text-indigo-800 mx-auto mb-2" />
          <p className="text-white text-lg font-semibold">{userCount} Users</p>
        </div>
        <div className="bg-purple-600 flex-grow sm:flex-grow-0 py-4 px-6 text-center rounded shadow">
          <FaBlog size={36} className="text-purple-200 mx-auto mb-2" />
          <p className="text-white text-lg font-semibold">{blogCount} Blogs</p>
        </div>
        <div className="bg-orange-500 flex-grow sm:flex-grow-0 py-4 px-6 text-center rounded shadow">
          <FaUserShield size={36} className="text-orange-200 mx-auto mb-2" />
          <p className="text-white text-lg font-semibold">{admincount} Admins</p>
        </div>
        <div className="bg-green-400 flex-grow sm:flex-grow-0 py-4 px-6 text-center rounded shadow">
          <FaComment size={36} className="text-green-800 mx-auto mb-2" />
          <p className="text-white text-lg font-semibold">{commentCount} Comments</p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="w-full bg-indigo-100 p-4 rounded-md shadow-md">
        <h1 className="text-xl font-bold">Blog Charts</h1>
<div>
{console.log(blogs)
  
}
<Chart blogs={blogs}/>


</div>
     </div>
    </div>
  );
};

export default Dashboard;
