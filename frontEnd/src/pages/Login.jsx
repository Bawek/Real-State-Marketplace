import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }
  
    const data = { email, password };
  
    try {
      const res = await loginUser(data).unwrap();
      const { user } = res; // Extract the user object
      console.log("Login successful, user:", user); // Debugging log
      dispatch(setUser(user)); // Pass the user object directly
      navigate("/");
    } catch (error) {
      setError(error?.data?.message || "Something went wrong!");
      console.error("Login Error:", error);
    }
  };
  
  return (
    <div className="mx-auto shadow-2xl mt-10  p-10 w-full max-w-sm flex flex-col gap-10">
      <h1 className="text-2xl font-bold">Login Page</h1>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <input
          type="email"
          className="px-5 py-3 w-full max-w-sm border border-gray-300 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(""); // Clear error
          }}
        />
        <input
          type="password"
          className="px-5 py-3 w-full max-w-sm border border-gray-300 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(""); // Clear error
          }}
        />
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <input
          disabled={isLoading}
          type="submit"
          className="px-5 py-3 w-full max-w-sm border border-green-800 bg-green-700 text-white rounded hover:cursor-pointer"
          value={isLoading ? "Logging in..." : "Login"}
        />
        <p className="text-center mt-4">          Don not have an account?{" "}

          <NavLink
            className="text-blue-800 underline hover:cursor-pointer"
            to="/register"
          >
            Register here
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
