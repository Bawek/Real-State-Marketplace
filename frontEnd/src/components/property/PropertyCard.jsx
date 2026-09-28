import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaHeart, FaRegHeart, FaEye, FaStar } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  const formatPrice = (price) => {
    if (!price) return 'Price on Request';
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
  };

  const handleCardClick = () => navigate(`/property/${property._id}`);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(prev => !prev);
  };

  const typeName = property.type?.name || property.type || 'Property';
  const locationStr = property.location?.city
    ? [property.location.address, property.location.city, property.location.zone].filter(Boolean).join(', ')
    : property.location || '';

  const listingBadge = property.listingType === 'rent' ? 'For Rent' : 'For Sale';
  const listingColor = property.listingType === 'rent' ? 'badge-purple' : 'badge-blue';

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden cursor-pointer card-hover animate-fade-in group"
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9' }}
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative img-zoom" style={{ height: '220px' }}>
        <img
          src={!imgError && property.images?.[0] ? property.images[0] : `https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80`}
          alt={property.title}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 overlay-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className={`badge ${listingColor} shadow-sm`}>{listingBadge}</span>
          {property.featured && (
            <span className="badge" style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', color: 'white' }}>
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Type badge top right */}
        <span className="absolute top-3 right-3 badge" style={{ background: 'rgba(255,255,255,0.92)', color: '#374151' }}>
          {typeName}
        </span>

        {/* Like button */}
        <button
          onClick={handleLike}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
        >
          {liked
            ? <FaHeart className="text-red-500 text-base" />
            : <FaRegHeart className="text-gray-500 text-base" />
          }
        </button>

        {/* Views */}
        {property.views > 0 && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white/90 text-xs font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
            <FaEye className="text-xs" />
            {property.views}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Price */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="text-xl font-extrabold text-blue-600">{formatPrice(property.price)}</span>
            {property.listingType === 'rent' && <span className="text-xs text-gray-500 ml-1">/mo</span>}
          </div>
          {property.rating > 0 && (
            <div className="flex items-center gap-1 text-amber-500">
              <FaStar className="text-xs" />
              <span className="text-xs font-semibold text-gray-700">{property.rating?.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200" style={{ fontSize: '1rem' }}>
          {property.title}
        </h3>

        {/* Location */}
        {locationStr && (
          <div className="flex items-center text-gray-500 text-xs mb-3">
            <FaMapMarkerAlt className="mr-1.5 text-blue-400 flex-shrink-0" />
            <span className="truncate">{locationStr}</span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-100 my-3" />

        {/* Property specs */}
        <div className="flex items-center justify-between text-gray-600 text-xs mb-3">
          {property.bedrooms !== undefined && (
            <div className="flex items-center gap-1.5">
              <FaBed className="text-gray-400" />
              <span className="font-medium">{property.bedrooms}<span className="hidden sm:inline"> bd</span></span>
            </div>
          )}
          {property.bathrooms !== undefined && (
            <div className="flex items-center gap-1.5">
              <FaBath className="text-gray-400" />
              <span className="font-medium">{property.bathrooms}<span className="hidden sm:inline"> ba</span></span>
            </div>
          )}
          {property.area > 0 && (
            <div className="flex items-center gap-1.5">
              <FaRulerCombined className="text-gray-400" />
              <span className="font-medium">{property.area.toLocaleString()}<span className="hidden sm:inline"> sqft</span></span>
            </div>
          )}
          {/* Fill if missing specs */}
          {!property.bedrooms && !property.bathrooms && !property.area && (
            <span className="text-gray-400 text-xs italic">No specs provided</span>
          )}
        </div>

        {/* View Details */}
        <button
          onClick={(e) => { e.stopPropagation(); handleCardClick(); }}
          className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0"
          style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
