import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch, FaTimes, FaFilter, FaChevronDown } from 'react-icons/fa';

const PropertyFilter = ({ onFilterChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    type: searchParams.get('type') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
    listingType: searchParams.get('listingType') || '',
  });

  const propertyTypes = [
    { value: '', label: 'All Types' },
    { value: 'house', label: '🏠 House' },
    { value: 'apartment', label: '🏢 Apartment' },
    { value: 'condo', label: '🏙️ Condo' },
    { value: 'townhouse', label: '🏘️ Townhouse' },
    { value: 'villa', label: '🌴 Villa' },
    { value: 'land', label: '🌾 Land' },
  ];

  const bedroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' },
  ];

  const bathroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    setSearchParams(params);
    onFilterChange(filters);
  };

  const handleReset = () => {
    const reset = { location: '', type: '', minPrice: '', maxPrice: '', bedrooms: '', bathrooms: '', listingType: '' };
    setFilters(reset);
    setSearchParams({});
    onFilterChange(reset);
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== '').length;

  const inputClass = "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white";
  const labelClass = "block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide";

  return (
    <div className="bg-white rounded-2xl mb-6 overflow-hidden animate-fade-in" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9' }}>
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <FaFilter className="text-blue-600 text-sm" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Filter Properties</h2>
            {activeFilterCount > 0 && (
              <p className="text-xs text-blue-600 font-medium">{activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              <FaTimes className="text-xs" />
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {isExpanded ? 'Less' : 'More Filters'}
            <FaChevronDown className={`text-xs transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      <form onSubmit={handleFilterSubmit} className="p-5">
        {/* Listing type toggle */}
        <div className="flex gap-2 mb-5">
          {[
            { value: '', label: 'All' },
            { value: 'sale', label: '🏠 Buy' },
            { value: 'rent', label: '🔑 Rent' },
          ].map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setFilters(prev => ({ ...prev, listingType: opt.value }))}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                filters.listingType === opt.value
                  ? 'text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={filters.listingType === opt.value ? { background: 'linear-gradient(135deg, #2563eb, #4f46e5)' } : {}}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Main row: Location + Type + Search */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="sm:col-span-1">
            <label className={labelClass}>Location</label>
            <div className="relative">
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleInputChange}
                placeholder="City, area, address..."
                className={inputClass + " pl-9"}
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Property Type</label>
            <select name="type" value={filters.type} onChange={handleInputChange} className={inputClass}>
              {propertyTypes.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}
            >
              <FaSearch />
              Search Properties
            </button>
          </div>
        </div>

        {/* Expandable advanced filters */}
        <div className={`grid grid-cols-1 sm:grid-cols-4 gap-4 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div>
            <label className={labelClass}>Min Price ($)</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleInputChange}
              placeholder="e.g. 50,000"
              min="0"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Max Price ($)</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleInputChange}
              placeholder="e.g. 500,000"
              min="0"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Bedrooms</label>
            <select name="bedrooms" value={filters.bedrooms} onChange={handleInputChange} className={inputClass}>
              {bedroomOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Bathrooms</label>
            <select name="bathrooms" value={filters.bathrooms} onChange={handleInputChange} className={inputClass}>
              {bathroomOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null;
              const labels = {
                location: `📍 ${value}`,
                type: `🏠 ${value}`,
                minPrice: `💰 Min $${Number(value).toLocaleString()}`,
                maxPrice: `💰 Max $${Number(value).toLocaleString()}`,
                bedrooms: `🛏️ ${value}+ beds`,
                bathrooms: `🚿 ${value}+ baths`,
                listingType: value === 'sale' ? '🏷️ For Sale' : '🔑 For Rent',
              };
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    const newFilters = { ...filters, [key]: '' };
                    setFilters(newFilters);
                    onFilterChange(newFilters);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium hover:bg-red-50 hover:text-red-600 transition-colors group"
                >
                  {labels[key]}
                  <FaTimes className="text-xs opacity-60 group-hover:opacity-100" />
                </button>
              );
            })}
          </div>
        )}
      </form>
    </div>
  );
};

export default PropertyFilter;
