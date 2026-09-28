import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetPropertiesQuery } from '../api/propertyApi';
import Hero from '../components/common/Hero';
import PropertyFilter from '../components/property/PropertyFilter';
import PropertyCard from '../components/property/PropertyCard';
import Pagination from '../components/common/Pagination';
import { FaThLarge, FaList, FaSortAmountDown } from 'react-icons/fa';

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #f1f5f9' }}>
    <div className="skeleton" style={{ height: '220px' }} />
    <div className="p-4 space-y-3">
      <div className="skeleton h-5 rounded-xl w-1/2" />
      <div className="skeleton h-4 rounded-xl" />
      <div className="skeleton h-4 rounded-xl w-3/4" />
      <div className="skeleton h-4 rounded-xl w-1/3" />
      <div className="skeleton h-10 rounded-xl mt-2" />
    </div>
  </div>
);

const SORT_OPTIONS = [
  { value: 'createdAt:desc', label: 'Newest First' },
  { value: 'createdAt:asc', label: 'Oldest First' },
  { value: 'price:asc', label: 'Price: Low to High' },
  { value: 'price:desc', label: 'Price: High to Low' },
];

const Home = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('createdAt:desc');
  const [filters, setFilters] = useState({
    page: parseInt(searchParams.get('page')) || 1,
    limit: 12,
    location: searchParams.get('location') || '',
    type: searchParams.get('type') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
    listingType: searchParams.get('listingType') || '',
  });

  const [sortField, sortOrder] = sortBy.split(':');
  const queryFilters = { ...filters, sortBy: sortField, sortOrder };

  const { data: propertiesData, isLoading, error, isFetching } = useGetPropertiesQuery(queryFilters);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const properties = propertiesData?.properties || [];
  const currentPage = propertiesData?.currentPage || 1;
  const totalPages = propertiesData?.totalPages || 1;
  const totalProperties = propertiesData?.totalProperties || 0;

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter */}
        <PropertyFilter onFilterChange={handleFilterChange} />

        {/* Results header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              {totalProperties > 0
                ? <>Available Properties <span className="text-blue-600">({totalProperties})</span></>
                : 'Properties'
              }
            </h2>
            {!isLoading && !error && totalProperties > 0 && (
              <p className="text-sm text-gray-500 mt-0.5">
                Showing {((currentPage - 1) * filters.limit) + 1}–{Math.min(currentPage * filters.limit, totalProperties)} of {totalProperties} results
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="flex items-center gap-2">
              <FaSortAmountDown className="text-gray-400 text-sm" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* View toggle */}
            <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <FaThLarge className="text-sm" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <FaList className="text-sm" />
              </button>
            </div>

            {/* Loading indicator */}
            {isFetching && !isLoading && (
              <div className="flex items-center gap-2 text-blue-600 text-sm">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Updating...
              </div>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-5 mb-6 animate-fade-in">
            <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <span className="text-red-500 font-bold">!</span>
            </div>
            <div>
              <h3 className="font-semibold text-red-800 mb-1">Failed to load properties</h3>
              <p className="text-sm text-red-600">{error.message || 'Please try again later.'}</p>
            </div>
          </div>
        )}

        {/* Skeleton loading */}
        {isLoading && (
          <div className={`grid gap-6 mb-8 ${viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && properties.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-4xl">🏘️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No properties found</h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              Try adjusting your search filters or browsing all available properties.
            </p>
          </div>
        )}

        {/* Properties Grid / List */}
        {!isLoading && !error && properties.length > 0 && (
          <div className={`grid gap-6 mb-8 ${viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {properties.map((property, idx) => (
              <div key={property._id} className="animate-fade-in" style={{ animationDelay: `${idx * 60}ms` }}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !error && totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        )}
      </div>

      {/* Why choose us section */}
      {!isLoading && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="section-label mb-2">Why EstateHub</p>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
                The Smarter Way to Find Property
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                We combine cutting-edge technology with local expertise to help you find, buy, sell, or rent properties with confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { emoji: '🔍', title: 'Smart Search', desc: 'Advanced filters help you pinpoint exactly what you\'re looking for — by location, type, price, and more.' },
                { emoji: '🤝', title: 'Trusted Agents', desc: 'Every listing is backed by verified, experienced agents who are ready to guide you through every step.' },
                { emoji: '⚡', title: 'Instant Notifications', desc: 'Get real-time alerts when new properties matching your criteria are listed. Never miss a deal.' },
              ].map((item, idx) => (
                <div
                  key={item.title}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 card-hover animate-fade-in"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
