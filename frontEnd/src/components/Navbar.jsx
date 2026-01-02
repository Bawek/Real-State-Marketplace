
import React, { useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUserCircle,
  FaUpload,
  FaSearch,
  FaBell,
  FaYoutube,
  FaVideo,
  FaListAlt,
  FaThumbsUp,
  FaCommentDots,
  FaTv,
  FaPlayCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/features/auth/authSlice";
import { useLogOutUserMutation } from "../redux/features/auth/authApi";
import Home from "../pages/Home";
import About from "../pages/About";
import Policy from "../pages/Policy";
import AddBlogForm from "../pages/AddBlogForm";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ContactUs from "../pages/ContactUs";
import SinglePage from "../pages/SinglePage";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../pages/Admin/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";
import { ManageItem } from "../pages/Admin/ManageItem";
import User from "../pages/Admin/User";
import UpdateBlog from "../pages/UpdateBlog";

const Navbar = () => {
  const [logOutUser] = useLogOutUserMutation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar toggle
  const { user } = useSelector((state) => state.auth); // Fetch user from auth slice
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Loading state for logout

  // Handle user logout
  const handleLogout = async () => {
    try {
      const response = await logOutUser().unwrap();
      dispatch(logOut());
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to log out.");
    }
  };

  return (
    <div className="flex m-0 min-w-full min-h-screen">
      {/* Left Sidebar */}
      <div
        className={` text-white w-64 min-h-screen fixed md:static ${
          isSidebarOpen ? "block" : "hidden md:block "
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <NavLink to="/" className="flex items-center space-x-2 text-2xl">
            <FaBars className="text-3xl text-red-600" />
          </NavLink>
          <button
            className="text-white md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>
        <nav className="px-4">
          <ul>
            <li>
              <NavLink
                to="/"
                className="flex items-center p-3 hover:bg-gray-700 rounded-md"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaHome className="mr-3" />
                <p
                  className={`          isSidebarOpen ? "block" : "hidden  "
`}
                >Home</p>{" "}
                
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/privacy"
                className="flex items-center p-3 hover:bg-gray-700 rounded-md"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaListAlt
                  className="mr-3"
                  onClick={() => setIsSidebarOpen(false)}
                />
                Privacy
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/trending"
                className="flex items-center p-3 hover:bg-gray-700 rounded-md"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaTv className="mr-3" />
                Trending
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/subscriptions"
                className="flex items-center p-3 hover:bg-gray-700 rounded-md"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaPlayCircle className="mr-3" />
                Subscriptions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/library"
                className="flex items-center p-3 hover:bg-gray-700 rounded-md"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaListAlt className="mr-3" />
                Library
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/history"
                className="flex items-center p-3 hover:bg-gray-700 rounded-md"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaThumbsUp className="mr-3" />
                History
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/yourvideos"
                className="flex items-center p-3 hover:bg-gray-700 rounded-md"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaVideo className="mr-3" />
                Your Videos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/comments"
                className="flex items-center p-3 hover:bg-gray-700 rounded-md"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaCommentDots className="mr-3" />
                Comments
              </NavLink>
            </li>
            <li>
              {user ? (
                user.role === "user" ? (
                  <button
                    className="w-full text-left p-3 hover:bg-gray-700 rounded-md"
                    onClick={handleLogout}
                  >
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                ) : (
                  <button
                    className="w-full text-left p-3 hover:bg-gray-700 rounded-md"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </button>
                )
              ) : (
                <NavLink
                  to="/login"
                  className="w-full text-left p-3 hover:bg-gray-700 rounded-md"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Navbar */}
      <div className="min-w-[calc(100vw-16rem)] shadow-lg flex-1 max-h-20min-h-screen">
        <nav className=" shadow-2xl  flex-1 min-h-20">
          <div className="container mx-auto flex justify-between items-center py-3 px-6">
            {/* Logo Section (YouTube-like) */}
            <div className="flex items-center space-x-2">
              <FaBars
                className="text-2xl text-gray-700 md:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              />
              <NavLink to="/" className="flex items-center space-x-2 text-2xl">
                <FaYoutube className="text-3xl text-red-600" />
                <span className="text-2xl font-bold">YouTube</span>
              </NavLink>
            </div>

            {/* Search bar (YouTube-like search box) */}
            <div className="hidden md:flex flex-1 mx-4">
              <input
                type="text"
                placeholder="Search"
                className="w-full py-2 px-4 border border-gray-300 rounded-l-full"
              />
              <button className="px-4 py-2 bg-gray-200 rounded-r-full text-gray-700 hover:bg-gray-300">
                <FaSearch />
              </button>
            </div>

            {/* Navbar Icons (Desktop) */}
            <div className="hidden md:flex space-x-6 text-lg font-medium">
              {/* Notification Bell */}
              <FaBell className="text-xl cursor-pointer hover:text-blue-600" />

              {/* Upload Button */}
              <NavLink to="/upload" className="text-xl hover:text-blue-600">
                <FaUpload />
              </NavLink>

              {/* User Profile Icon */}
              {user ? (
                <FaUserCircle className="text-2xl cursor-pointer text-gray-700" />
              ) : (
                <NavLink
                  to="/login"
                  className="text-lg text-gray-700 hover:text-blue-600"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </nav>
        <div className=" shadow-black max-w-[cal(100vw-16rem)] min-h-[cal(100vh - 5rem)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/upload" element={<AddBlogForm />} />
            <Route path="/blogs/:id" element={<SinglePage />} />

            {/* Admin Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="addnewpost" element={<AddBlogForm />} />
              <Route path="manageitem" element={<ManageItem />} />
              <Route path="manageuser" element={<User />} />
              <Route path="manageitem/:id" element={<UpdateBlog />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
