import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaHome, FaBuilding, FaTree } from 'react-icons/fa';

const STATS = [
  { value: '12,500+', label: 'Properties Listed' },
  { value: '8,200+', label: 'Happy Clients' },
  { value: '950+', label: 'Expert Agents' },
  { value: '99%', label: 'Satisfaction Rate' },
];

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('buy');
  const [count, setCount] = useState(0);

  // Animate numbers on mount
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => (c >= 12 ? c : c + 1));
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?location=${encodeURIComponent(searchQuery)}&listingType=${activeType === 'buy' ? 'sale' : 'rent'}`);
  };

  return (
    <div className="relative overflow-hidden" style={{ minHeight: '88vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #1e1b4b 100%)' }}>

      {/* Decorative blobs */}
      <div className="hero-particle" style={{ width: 400, height: 400, top: '-10%', right: '5%', background: 'radial-gradient(circle, #2563eb, transparent)' }} />
      <div className="hero-particle" style={{ width: 300, height: 300, bottom: '10%', left: '-5%', background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
      <div className="hero-particle" style={{ width: 200, height: 200, top: '40%', left: '55%', background: 'radial-gradient(circle, #f59e0b, transparent)' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center py-24 lg:py-32">

        {/* Label */}
        <div className="animate-fade-in glass rounded-full px-5 py-2 mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
          <span className="text-sm text-white/80 font-medium">Trusted by 8,000+ families across the region</span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in delay-100 text-center font-extrabold text-white leading-tight mb-6"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
          Find Your Perfect{' '}
          <span className="relative">
            <span className="gradient-text">Dream Home</span>
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" preserveAspectRatio="none" style={{ height: '6px' }}>
              <path d="M0,5 C50,0 150,0 200,5" stroke="url(#underlineGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
              <defs>
                <linearGradient id="underlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        <p className="animate-fade-in delay-200 text-center text-white/70 mb-10 max-w-2xl"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>
          Explore thousands of curated properties — from cozy apartments to luxurious villas. Your next chapter starts here.
        </p>

        {/* Toggle: Buy / Rent */}
        <div className="animate-fade-in delay-200 flex gap-2 glass rounded-xl p-1 mb-6">
          {['buy', 'rent'].map(t => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-8 py-2.5 rounded-lg font-semibold text-sm capitalize transition-all duration-200 ${
                activeType === t
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {t === 'buy' ? '🏠 Buy' : '🔑 Rent'}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <form
          onSubmit={handleSearch}
          className="animate-fade-in delay-300 w-full max-w-2xl"
        >
          <div className="flex items-center gap-3 glass rounded-2xl p-2 shadow-2xl border border-white/20 focus-within:border-blue-400 transition-all duration-300">
            <div className="flex items-center gap-2 flex-1 px-3">
              <FaMapMarkerAlt className="text-blue-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by city, area, or address..."
                className="flex-1 bg-transparent text-white placeholder-white/40 text-sm outline-none py-2"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 flex-shrink-0"
            >
              <FaSearch />
              Search
            </button>
          </div>
        </form>

        {/* Quick type pills */}
        <div className="animate-fade-in delay-400 flex flex-wrap gap-3 mt-5 justify-center">
          {[
            { icon: FaHome, label: 'House' },
            { icon: FaBuilding, label: 'Apartment' },
            { icon: FaBuilding, label: 'Condo' },
            { icon: FaTree, label: 'Villa' },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => navigate(`/?type=${label.toLowerCase()}`)}
              className="flex items-center gap-2 glass hover:bg-white/20 text-white/80 hover:text-white text-xs font-medium px-4 py-2 rounded-full transition-all duration-200"
            >
              <Icon size={12} />
              {label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="animate-fade-in delay-500 grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 w-full max-w-3xl">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{value}</div>
              <div className="text-xs text-white/50 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ height: '80px', width: '100%' }}>
          <path
            d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,100 L0,100 Z"
            fill="#f8fafc"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
