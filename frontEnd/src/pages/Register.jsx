import React, { useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // State to show feedback messages
  const [register, { isLoading }] = useRegisterUserMutation();

  // Basic form validation
  const validateForm = () => {
    if (!name || !email || !password) {
      setMessage("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email.");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Prevent form submission if validation fails

    const data = { name, email, password };

    try {
      const res = await register(data).unwrap();
      console.log('Registration successful:', res);
      setMessage('Registration successful! Please login.');
      setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
    } catch (error) {
      setMessage('Registration failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div>
    <div className="mx-auto shadow-2xl mt-10  p-10 w-full max-w-sm flex flex-col gap-10">
        <h1 className="text-2xl font-bold">Register Page</h1>
        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <input
            type="text"
            className="px-5 py-3 w-full max-w-sm"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state
            aria-label="Name"
          />
          <input
            type="email"
            className="px-5 py-3 w-full max-w-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            aria-label="Email"
          />
          <input
            type="password"
            className="px-5 py-3 w-full max-w-sm border border-green-800"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            aria-label="Password"
          />
          <button
            disabled={isLoading}
            type="submit"
            className="px-5 py-3 w-full max-w-sm border border-green-800 bg-green-700 text-white hover:cursor-pointer"
          >
            {isLoading ? (
              <span>Registering...</span>
            ) : (
              'Register'
            )}
          </button>
          <p>
            Already have an account?{' '}
            <NavLink
              className="hover:bg-slate-200 hover:cursor-pointer"
              to={`/login`}
            >
              Login here
            </NavLink>
          </p>
        </form>
        {message && (
          <p className={`mt-4 ${message.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
