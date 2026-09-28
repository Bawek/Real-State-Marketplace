import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPropertyByIdQuery } from '../../api/propertyApi';
import {
  FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaHeart, FaRegHeart,
  FaShare, FaPhone, FaEnvelope, FaCalendarAlt, FaArrowLeft, FaChevronLeft,
  FaChevronRight, FaCheckCircle, FaBuilding, FaEye, FaCar
} from 'react-icons/fa';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: property, isLoading, error } = useGetPropertyByIdQuery(id);
  const [activeImage, setActiveImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [showContactForm, setShowContactForm] = useState(false);

  const formatPrice = (price) => {
    if (!price) return 'Price on Request';
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
  };

  const locationStr = property?.location?.city
    ? [property.location.address, property.location.city, property.location.zone].filter(Boolean).join(', ')
    : property?.location || '';

  const images = property?.images?.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80'];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f8fafc' }}>
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
            <svg className="animate-spin h-8 w-8 text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f8fafc' }}>
        <div className="text-center animate-scale-in">
          <div className="text-6xl mb-4">🏚️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Property Not Found</h2>
          <p className="text-gray-500 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate('/')} className="px-6 py-3 rounded-xl text-white font-semibold" style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}>
            Browse All Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors"
        >
          <FaArrowLeft className="text-xs" />
          Back to Properties
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Images + Details */}
          <div className="lg:col-span-2 space-y-6">

            {/* Image Gallery */}
            <div className="bg-white rounded-3xl overflow-hidden animate-fade-in" style={{ border: '1px solid #f1f5f9', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
              {/* Main Image */}
              <div className="relative" style={{ height: '420px' }}>
                <img
                  src={images[activeImage]}
                  alt={property.title}
                  className="w-full h-full object-cover transition-all duration-500"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80'; }}
                />
                <div className="absolute inset-0 overlay-gradient" />

                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button onClick={() => setActiveImage(i => (i - 1 + images.length) % images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                      <FaChevronLeft className="text-gray-700" />
                    </button>
                    <button onClick={() => setActiveImage(i => (i + 1) % images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                      <FaChevronRight className="text-gray-700" />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className={`badge ${property.listingType === 'rent' ? 'badge-purple' : 'badge-blue'}`}>
                    {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
                  </span>
                  {property.featured && (
                    <span className="badge" style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', color: 'white' }}>⭐ Featured</span>
                  )}
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={() => setLiked(l => !l)}
                    className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white shadow-lg transition-all hover:scale-110">
                    {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-600" />}
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white shadow-lg transition-all hover:scale-110">
                    <FaShare className="text-gray-600" />
                  </button>
                </div>

                {/* Image counter */}
                <div className="absolute bottom-4 right-4 glass text-white text-xs font-medium px-3 py-1 rounded-full">
                  {activeImage + 1} / {images.length}
                </div>

                {/* Views */}
                {property.views > 0 && (
                  <div className="absolute bottom-4 left-4 glass text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <FaEye /> {property.views} views
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {images.slice(0, 6).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200 ${activeImage === i ? 'ring-2 ring-blue-500 ring-offset-2 scale-95' : 'opacity-60 hover:opacity-100'}`}
                      style={{ width: '80px', height: '60px' }}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-3xl p-6 animate-fade-in" style={{ border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              {/* Title & Price */}
              <div className="flex items-start justify-between mb-4 gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-extrabold text-gray-900 mb-2">{property.title}</h1>
                  {locationStr && (
                    <p className="flex items-center gap-2 text-gray-500 text-sm">
                      <FaMapMarkerAlt className="text-blue-500" />
                      {locationStr}
                    </p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-3xl font-extrabold text-blue-600">{formatPrice(property.price)}</div>
                  {property.listingType === 'rent' && <span className="text-gray-400 text-sm">/month</span>}
                </div>
              </div>

              {/* Specs Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-y border-gray-100 mb-5">
                {[
                  { icon: FaBed, value: property.bedrooms || 0, label: 'Bedrooms', show: true },
                  { icon: FaBath, value: property.bathrooms || 0, label: 'Bathrooms', show: true },
                  { icon: FaRulerCombined, value: property.area ? `${property.area.toLocaleString()} sqft` : 'N/A', label: 'Area', show: true },
                  { icon: FaCar, value: property.parkingSpaces || 0, label: 'Parking', show: property.parkingSpaces !== undefined },
                ].filter(s => s.show).map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex flex-col items-center text-center p-3 rounded-2xl bg-gray-50">
                    <Icon className="text-blue-500 text-xl mb-2" />
                    <div className="font-extrabold text-gray-900">{value}</div>
                    <div className="text-xs text-gray-500">{label}</div>
                  </div>
                ))}
              </div>

              {/* Additional info */}
              <div className="flex flex-wrap gap-2 mb-5">
                {property.type?.name && <span className="badge badge-blue">{property.type.name}</span>}
                {property.status && <span className={`badge ${property.status === 'available' ? 'badge-green' : 'badge-amber'}`}>{property.status}</span>}
                {property.yearBuilt && <span className="badge badge-purple">Built {property.yearBuilt}</span>}
                {property.isFurnished && <span className="badge badge-amber">🛋️ Furnished</span>}
                {property.floors > 1 && <span className="badge" style={{ background: '#f1f5f9', color: '#475569' }}>{property.floors} Floors</span>}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">About This Property</h3>
                <p className="text-gray-600 leading-relaxed">{property.description || 'No description available.'}</p>
              </div>

              {/* Features */}
              {property.features?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Features & Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {property.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Contact Card */}
          <div className="space-y-4">
            {/* Agent / Contact Card */}
            <div className="bg-white rounded-3xl p-6 sticky top-20 animate-fade-in-right" style={{ border: '1px solid #f1f5f9', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
              <h3 className="text-lg font-bold text-gray-900 mb-5">Contact Agent</h3>

              {/* Agent Info */}
              <div className="flex items-center gap-3 mb-5 p-3 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {property.ownerId?.username?.[0]?.toUpperCase() || '?'}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{property.ownerId?.username || 'Agent'}</p>
                  <p className="text-xs text-gray-500">{property.ownerId?.email || 'contact@estatehub.com'}</p>
                  <p className="text-xs text-emerald-600 font-medium mt-0.5">✓ Verified Agent</p>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}>
                  <FaPhone />
                  Call Agent
                </button>
                <button
                  onClick={() => setShowContactForm(!showContactForm)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-all">
                  <FaEnvelope />
                  Send Message
                </button>
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all">
                  <FaCalendarAlt />
                  Schedule Tour
                </button>
              </div>

              {/* Contact Form */}
              {showContactForm && (
                <div className="border-t border-gray-100 pt-5 animate-fade-in space-y-3">
                  <input type="text" placeholder="Your Name" value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 bg-gray-50" />
                  <input type="email" placeholder="Your Email" value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 bg-gray-50" />
                  <textarea rows={3} placeholder={`I'm interested in ${property.title}...`} value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 bg-gray-50 resize-none" />
                  <button className="w-full py-2.5 rounded-xl text-white text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}>
                    Send Message
                  </button>
                </div>
              )}

              {/* Quick info */}
              <div className="mt-5 pt-5 border-t border-gray-100">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Property ID</span>
                  <span className="font-mono font-medium text-gray-700">#{property._id?.slice(-6).toUpperCase()}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Listed</span>
                  <span className="font-medium text-gray-700">{new Date(property.createdAt).toLocaleDateString()}</span>
                </div>
                {property.views > 0 && (
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Views</span>
                    <span className="font-medium text-gray-700">{property.views}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
