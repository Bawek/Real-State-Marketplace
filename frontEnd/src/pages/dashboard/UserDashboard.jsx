import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/auth/authSlice';
import { useGetPropertiesQuery } from '../../api/propertyApi';
import { useGetUserAppointmentsQuery } from '../../api/appointmentApi';
import { useGetMessagesQuery } from '../../api/messageApi';
import PropertyCard from '../../components/property/PropertyCard';
import { FaBuilding, FaCalendarAlt, FaEnvelope, FaEye, FaPlus, FaArrowRight, FaHome, FaChartLine, FaBell, FaCog } from 'react-icons/fa';

const StatCard = ({ value, label, icon: Icon, gradient, change }) => (
  <div
    className="bg-white rounded-2xl p-6 card-hover animate-fade-in relative overflow-hidden"
    style={{ border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}
  >
    <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${gradient} opacity-10 translate-x-6 -translate-y-6`} />
    <div className="flex items-start justify-between mb-4">
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
        <Icon className="text-white text-lg" />
      </div>
      {change !== undefined && (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${change >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </span>
      )}
    </div>
    <div className="text-3xl font-extrabold text-gray-900 mb-1">{value}</div>
    <div className="text-sm text-gray-500 font-medium">{label}</div>
  </div>
);

const QuickAction = ({ icon: Icon, label, to, gradient, onClick }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={onClick || (() => navigate(to))}
      className="flex flex-col items-center p-5 rounded-2xl border border-gray-100 bg-white hover:border-blue-200 transition-all duration-200 hover:-translate-y-1 group"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 group-hover:shadow-lg transition-all duration-200`}>
        <Icon className="text-white text-lg" />
      </div>
      <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">{label}</span>
    </button>
  );
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [activeTab, setActiveTab] = useState('overview');

  const { data: userProperties, isLoading: propertiesLoading } = useGetPropertiesQuery({ userId: user?._id });
  const { data: appointments, isLoading: appointmentsLoading } = useGetUserAppointmentsQuery(user?._id);
  const { data: messages, isLoading: messagesLoading } = useGetMessagesQuery({ receiver: user?._id });

  const stats = {
    totalProperties: userProperties?.properties?.length || 0,
    activeAppointments: appointments?.appointments?.filter(a => a.status === 'confirmed')?.length || 0,
    unreadMessages: messages?.messages?.filter(m => !m.read)?.length || 0,
    totalViews: userProperties?.properties?.reduce((acc, p) => acc + (p.views || 0), 0) || 0,
  };

  const recentProperties = userProperties?.properties?.slice(0, 4) || [];
  const upcomingAppointments = appointments?.appointments?.filter(a =>
    new Date(a.date) > new Date() && a.status === 'confirmed'
  ).slice(0, 4) || [];

  const isLoading = propertiesLoading || appointmentsLoading || messagesLoading;

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`;
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      {/* Header */}
      <div className="relative overflow-hidden py-10" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1e1b4b 100%)' }}>
        <div className="hero-particle" style={{ width: 200, height: 200, top: '-30%', right: '5%', background: 'radial-gradient(circle, #2563eb, transparent)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-extrabold shadow-xl">
                {user?.name?.[0]?.toUpperCase() || user?.username?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <p className="text-white/60 text-sm mb-0.5">Welcome back 👋</p>
                <h1 className="text-2xl font-extrabold text-white">{user?.name || user?.username}</h1>
                <p className="text-white/40 text-xs mt-0.5">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/properties/create')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
            >
              <FaPlus />
              List New Property
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ height: '35px', width: '100%' }}>
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#f8fafc" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-2xl p-1.5 mb-8 w-fit shadow-sm border border-gray-100">
          {['overview', 'properties', 'appointments'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all duration-200 ${
                activeTab === tab
                  ? 'text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              style={activeTab === tab ? { background: 'linear-gradient(135deg, #2563eb, #4f46e5)' } : {}}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard value={isLoading ? '—' : stats.totalProperties} label="My Properties" icon={FaBuilding} gradient="from-blue-500 to-blue-600" change={12} />
          <StatCard value={isLoading ? '—' : stats.activeAppointments} label="Appointments" icon={FaCalendarAlt} gradient="from-emerald-500 to-emerald-600" />
          <StatCard value={isLoading ? '—' : stats.unreadMessages} label="Unread Messages" icon={FaEnvelope} gradient="from-amber-500 to-amber-600" />
          <StatCard value={isLoading ? '—' : stats.totalViews.toLocaleString()} label="Total Views" icon={FaEye} gradient="from-purple-500 to-purple-600" change={8} />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 mb-8" style={{ border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <QuickAction icon={FaPlus} label="Add Property" to="/properties/create" gradient="from-blue-500 to-blue-600" />
            <QuickAction icon={FaEnvelope} label="Messages" to="/messages" gradient="from-amber-500 to-amber-600" />
            <QuickAction icon={FaCalendarAlt} label="Appointments" to="/appointments" gradient="from-emerald-500 to-emerald-600" />
            <QuickAction icon={FaCog} label="Settings" to="/profile" gradient="from-purple-500 to-purple-600" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Properties */}
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <h3 className="font-bold text-gray-900">My Recent Properties</h3>
              <button onClick={() => navigate('/')} className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
                View all <FaArrowRight className="text-xs" />
              </button>
            </div>

            {isLoading ? (
              <div className="p-6 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="skeleton w-16 h-16 rounded-xl flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="skeleton h-4 rounded-lg" />
                      <div className="skeleton h-3 rounded-lg w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentProperties.length > 0 ? (
              <div className="divide-y divide-gray-50">
                {recentProperties.map(property => (
                  <div key={property._id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate(`/property/${property._id}`)}>
                    <img
                      src={property.images?.[0] || `https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&q=80`}
                      alt={property.title}
                      className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                      onError={e => { e.target.src = `https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&q=80`; }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm truncate">{property.title}</h4>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        📍 {property.location?.city || property.location || 'N/A'}
                      </p>
                      <p className="text-sm font-bold text-blue-600 mt-1">{formatPrice(property.price)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`badge text-xs ${property.status === 'available' ? 'badge-green' : 'badge-amber'}`}>
                        {property.status}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <FaEye className="text-xs" /> {property.views || 0}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                <div className="text-5xl mb-4">🏘️</div>
                <h4 className="font-bold text-gray-800 mb-2">No properties yet</h4>
                <p className="text-gray-500 text-sm mb-5">Start listing your properties and reach thousands of buyers.</p>
                <button
                  onClick={() => navigate('/properties/create')}
                  className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}
                >
                  List Your First Property
                </button>
              </div>
            )}
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <h3 className="font-bold text-gray-900">Upcoming Appointments</h3>
              <button onClick={() => navigate('/appointments')} className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
                View all <FaArrowRight className="text-xs" />
              </button>
            </div>

            {isLoading ? (
              <div className="p-6 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="skeleton h-20 rounded-xl" />
                ))}
              </div>
            ) : upcomingAppointments.length > 0 ? (
              <div className="divide-y divide-gray-50">
                {upcomingAppointments.map(appt => (
                  <div key={appt._id} className="px-6 py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">{appt.propertyId?.title || 'Property Viewing'}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">
                            📅 {new Date(appt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            {appt.time && ` at ${appt.time}`}
                          </p>
                          {appt.agentId?.name && (
                            <p className="text-xs text-gray-400 mt-0.5">with {appt.agentId.name}</p>
                          )}
                        </div>
                      </div>
                      <span className="badge badge-green text-xs flex-shrink-0">Confirmed</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                <div className="text-5xl mb-4">📅</div>
                <h4 className="font-bold text-gray-800 mb-2">No upcoming appointments</h4>
                <p className="text-gray-500 text-sm">Browse properties and schedule viewings.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
