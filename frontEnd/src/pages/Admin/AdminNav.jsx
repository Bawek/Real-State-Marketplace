import React from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogOutUserMutation } from "../../redux/features/auth/authApi";

const AdminNav = () => {
  const [logOutUser] = useLogOutUserMutation() // Mutation hook for logout
const dispatch = useDispatch(); // Redux dispatcher

const handleLogout = async () => {
  try {
    // Attempt to log out
    const res = await logOutUser().unwrap();

    if (res) {
      // Dispatch the logout action if the server responds successfully
      dispatch(logOutUser());
      alert('Logged out successfully');
      <Navigate to="/login"/>
    }
  } catch (error) {
    // Handle errors gracefully
    console.error('Failed to log out:', error);
  }
};


  
  return (
    <div>
      <div className="p-4 bg-white h-screen flex flex-col justify-between shadow-md">
        <div>
          <div>
            <i className="fa fa-user fa-4x"></i>
            Admin
          </div>

          <hr />
          <div className="flex flex-col gap-3 "><div>
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? "shadow-md hover:bg-blue-800" : "hover:bg-slate-500"
              }
            >
              Dashboard
            </NavLink>
          </div>
          <div>
            <NavLink
              to="addnewpost"
              className={({ isActive }) =>
                isActive ? "shadow-md hover:bg-blue-800" : "hover:bg-slate-500"
              }
            >
              Add new post
            </NavLink>
          </div>
          <div>
            <NavLink
              to="manageitem"
              className={({ isActive }) =>
                isActive ? "shadow-md hover:bg-blue-800" : "hover:bg-slate-500"
              }
            >
              Manage Item
            </NavLink>
          </div>
          <div>
            <NavLink
              to="manageuser"
              className={({ isActive }) =>
                isActive ? "shadow-md hover:bg-blue-800" : "hover:bg-slate-500"
              }
            >
User            </NavLink>
          </div>
        </div></div>
        <div>
          <button onClick={handleLogout} type="button" className="text-white bg-red-900 py-2 px-3">
            Logut
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
