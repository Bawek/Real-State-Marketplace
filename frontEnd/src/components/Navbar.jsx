
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUserCircle,
  FaBuilding,
  FaEnvelope,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUser, selectIsAuthenticated } from "../redux/features/auth/authSlice";
import { useLogoutMutation } from "../api/userApi";
import { addNotification } from "../redux/features/ui/uiSlice";

const Navbar = () => {
  const [logoutMutation] = useLogoutMutation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      addNotification({
        type: 'success',
        title: 'Logged Out',
        message: 'You have been successfully logged out.',
      });
      navigate("/login");
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Logout Failed',
        message: 'Failed to logout. Please try again.',
      });
    }
  };

  const navItems = [
    { to: "/", icon: FaHome, label: "Home" },
    { to: "/properties", icon: FaBuilding, label: "Properties" },
    { to: "/messages", icon: FaEnvelope, label: "Messages" },
    { to: "/appointments", icon: FaCalendarAlt, label: "Appointments" },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:h-auto
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">Real Estate</h2>
          <button
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes className="text-gray-600" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="mr-3" />
                  {item.label}
                </NavLink>
              </li>
            ))}

            {isAuthenticated && (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <FaUserCircle className="mr-3" />
                    Dashboard
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <FaCog className="mr-3" />
                    Profile
                  </NavLink>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center p-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaSignOutAlt className="mr-3" />
                    Logout
                  </button>
                </li>
              </>
            )}

            {!isAuthenticated && (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FaUserCircle className="mr-3" />
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile menu button */}
            <button
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FaBars className="text-gray-600" />
            </button>

            {/* Logo */}
            <NavLink to="/" className="flex items-center">
              <FaBuilding className="text-2xl text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">EstateHub</span>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <item.icon className="mr-2" />
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                    <FaUserCircle className="text-xl" />
                    <span className="hidden md:block text-sm font-medium">
                      {user?.name?.split(' ')[0]}
                    </span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <NavLink
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </NavLink>
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Sign In
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
