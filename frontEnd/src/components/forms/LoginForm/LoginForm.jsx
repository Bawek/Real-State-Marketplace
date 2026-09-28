import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLoginMutation } from '../../../api/userApi';
import { setUser, setLoading, setError } from '../../../redux/features/auth/authSlice';
import { addNotification } from '../../../redux/features/ui/uiSlice';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { FaBuilding, FaEye, FaEyeSlash } from 'react-icons/fa';

const BENEFITS = [
  { emoji: '🔍', text: 'Search thousands of verified properties' },
  { emoji: '❤️', text: 'Save your favorite listings' },
  { emoji: '📅', text: 'Schedule viewings instantly' },
  { emoji: '💬', text: 'Message agents directly' },
];

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 6) errors.password = 'Must be at least 6 characters';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const result = await login(formData).unwrap();
      dispatch(setUser(result.user));
      dispatch(addNotification({ type: 'success', title: 'Welcome back!', message: `Hello, ${result.user.name || result.user.username}!` }));
      navigate(result.user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    } catch (err) {
      dispatch(setError(err.data?.message || 'Login failed'));
      dispatch(addNotification({ type: 'error', title: 'Login Failed', message: err.data?.message || 'Invalid email or password' }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const inputClass = "w-full px-4 py-3 text-sm border rounded-xl focus:outline-none transition-all duration-200 bg-gray-50 hover:bg-white";
  const inputStyle = (hasError) => ({
    borderColor: hasError ? '#ef4444' : '#e5e7eb',
    boxShadow: hasError ? '0 0 0 2px rgba(239,68,68,0.1)' : undefined,
  });

  return (
    <div className="min-h-screen flex" style={{ background: '#f8fafc' }}>
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between w-5/12 relative p-10 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1e1b4b 100%)' }}>
        <div className="hero-particle" style={{ width: 300, height: 300, top: '-10%', right: '-10%', background: 'radial-gradient(circle, #2563eb, transparent)' }} />
        <div className="hero-particle" style={{ width: 200, height: 200, bottom: '10%', left: '-5%', background: 'radial-gradient(circle, #7c3aed, transparent)' }} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
            <FaBuilding className="text-white text-sm" />
          </div>
          <span className="text-2xl font-extrabold text-white">Estate<span className="text-blue-400">Hub</span></span>
        </div>

        {/* Hero content */}
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Welcome Back<br />
            <span className="gradient-text">To Your Home</span>
          </h2>
          <p className="text-white/60 text-sm mb-8 leading-relaxed">
            Sign in to access your saved properties, manage your listings, and connect with trusted agents.
          </p>
          <div className="space-y-3">
            {BENEFITS.map(({ emoji, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="text-xl">{emoji}</span>
                <span className="text-white/70 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stat */}
        <div className="relative z-10 flex gap-8">
          {[{ v: '12K+', l: 'Properties' }, { v: '8K+', l: 'Happy Clients' }].map(({ v, l }) => (
            <div key={l}>
              <div className="text-2xl font-extrabold text-white">{v}</div>
              <div className="text-white/40 text-xs">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
              <FaBuilding className="text-white text-xs" />
            </div>
            <span className="text-xl font-extrabold text-gray-900">Estate<span className="text-blue-600">Hub</span></span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-500 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-700">Create one free</Link>
            </p>
          </div>

          {/* Error */}
          {(error || formErrors.general) && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5 flex items-start gap-3 animate-scale-in">
              <span className="text-red-500 text-lg">⚠️</span>
              <p className="text-sm text-red-700">{error || formErrors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className={inputClass}
                style={inputStyle(formErrors.email)}
              />
              {formErrors.email && <p className="text-xs text-red-500 mt-1.5">{formErrors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className={inputClass + " pr-12"}
                  style={inputStyle(formErrors.password)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formErrors.password && <p className="text-xs text-red-500 mt-1.5">{formErrors.password}</p>}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || isLoading}
              className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}
            >
              {loading || isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-blue-500 hover:underline">Terms</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
