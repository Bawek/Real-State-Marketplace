import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars, FaTimes, FaHome, FaUserCircle, FaBuilding,
  FaEnvelope, FaCalendarAlt, FaCog, FaSignOutAlt, FaChevronDown,
  FaBell, FaPlus,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectIsAuthenticated } from "../redux/features/auth/authSlice";
import { useLogoutMutation } from "../api/userApi";
import { addNotification } from "../redux/features/ui/uiSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [logoutMutation] = useLogoutMutation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Detect scroll for sticky nav styling
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(addNotification({ type: 'success', title: 'Logged Out', message: 'You have been successfully logged out.' }));
      navigate("/login");
    } catch {
      dispatch(addNotification({ type: 'error', title: 'Logout Failed', message: 'Failed to logout. Please try again.' }));
    }
  };

  const navItems = [
    { to: "/", icon: FaHome, label: "Home", exact: true },
    { to: "/about", icon: FaBuilding, label: "About" },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 w-72 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
              <FaBuilding className="text-white text-sm" />
            </div>
            <span className="text-lg font-bold text-gray-900">EstateHub</span>
          </NavLink>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <item.icon className="text-base" />
              {item.label}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <>
              <div className="pt-3 pb-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4">Account</p>
              </div>
              <NavLink to="/dashboard" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}>
                <FaUserCircle />
                Dashboard
              </NavLink>
              <NavLink to="/properties/create" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}>
                <FaPlus />
                List Property
              </NavLink>
              <NavLink to="/profile" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}>
                <FaCog />
                Profile Settings
              </NavLink>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <FaSignOutAlt />
                Sign Out
              </button>
            </>
          ) : (
            <div className="pt-4 space-y-2">
              <NavLink to="/login" className="block w-full text-center px-4 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors">
                Sign In
              </NavLink>
              <NavLink to="/register" className="block w-full text-center px-4 py-3 rounded-xl font-semibold text-sm text-white transition-colors"
                style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
                Get Started
              </NavLink>
            </div>
          )}
        </nav>

        {/* User info at bottom */}
        {isAuthenticated && user && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-50">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.[0]?.toUpperCase() || user?.username?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || user?.username}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Top Navigation Bar */}
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled || !isHomePage
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Left: hamburger + logo */}
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label="Open menu"
              >
                <FaBars className={isScrolled || !isHomePage ? "text-gray-700" : "text-white"} />
              </button>

              <NavLink to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110" style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
                  <FaBuilding className="text-white text-sm" />
                </div>
                <span className={`text-xl font-extrabold transition-colors ${isScrolled || !isHomePage ? "text-gray-900" : "text-white"}`}>
                  Estate<span className="text-blue-500">Hub</span>
                </span>
              </NavLink>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? isScrolled || !isHomePage ? "bg-blue-50 text-blue-600" : "bg-white/20 text-white"
                        : isScrolled || !isHomePage
                          ? "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                    }`
                  }
                >
                  <item.icon className="text-xs" />
                  {item.label}
                </NavLink>
              ))}

              {isAuthenticated && (
                <>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? isScrolled || !isHomePage ? "bg-blue-50 text-blue-600" : "bg-white/20 text-white"
                          : isScrolled || !isHomePage ? "text-gray-600 hover:text-gray-900 hover:bg-gray-50" : "text-white/80 hover:text-white hover:bg-white/10"
                      }`
                    }
                  >
                    <FaUserCircle className="text-xs" />
                    Dashboard
                  </NavLink>
                </>
              )}
            </nav>

            {/* Right: CTA + User Menu */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  {/* List Property Button */}
                  <button
                    onClick={() => navigate('/properties/create')}
                    className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
                  >
                    <FaPlus className="text-xs" />
                    List Property
                  </button>

                  {/* User Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                        isScrolled || !isHomePage
                          ? "hover:bg-gray-100"
                          : "hover:bg-white/10"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                        {user?.name?.[0]?.toUpperCase() || user?.username?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <span className={`hidden md:block text-sm font-medium transition-colors ${isScrolled || !isHomePage ? "text-gray-700" : "text-white"}`}>
                        {user?.name?.split(' ')[0] || user?.username}
                      </span>
                      <FaChevronDown className={`text-xs transition-all duration-200 ${isDropdownOpen ? "rotate-180" : ""} ${isScrolled || !isHomePage ? "text-gray-500" : "text-white/70"}`} />
                    </button>

                    {/* Dropdown */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 animate-scale-in overflow-hidden">
                        <div className="p-3 border-b border-gray-50">
                          <p className="text-sm font-semibold text-gray-900">{user?.name || user?.username}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                        <div className="p-1.5">
                          {[
                            { to: '/dashboard', icon: FaUserCircle, label: 'Dashboard' },
                            { to: '/properties/create', icon: FaPlus, label: 'List Property' },
                            { to: '/profile', icon: FaCog, label: 'Profile Settings' },
                          ].map(({ to, icon: Icon, label }) => (
                            <NavLink
                              key={to}
                              to={to}
                              onClick={() => setIsDropdownOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <Icon className="text-gray-400" />
                              {label}
                            </NavLink>
                          ))}
                          <div className="my-1 border-t border-gray-100" />
                          <button
                            onClick={() => { handleLogout(); setIsDropdownOpen(false); }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <FaSignOutAlt />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <NavLink
                    to="/login"
                    className={`hidden sm:block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isScrolled || !isHomePage
                        ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
                  >
                    Get Started
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
