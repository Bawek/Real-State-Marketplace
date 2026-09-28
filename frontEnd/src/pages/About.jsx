import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaUsers, FaHandshake, FaStar, FaArrowRight, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const TEAM = [
  { name: 'Sarah Mitchell', role: 'CEO & Founder', emoji: '👩‍💼', bio: '15+ years of real estate expertise, passionate about connecting people with their dream homes.' },
  { name: 'James Okafor', role: 'Head of Operations', emoji: '👨‍💼', bio: 'Streamlines every property transaction to ensure a seamless experience for buyers and sellers.' },
  { name: 'Lena Berger', role: 'Lead Agent', emoji: '👩‍🏫', bio: 'Award-winning agent with deep knowledge of local markets and negotiation excellence.' },
  { name: 'David Yilmaz', role: 'Tech Lead', emoji: '👨‍💻', bio: 'Builds the platform that powers thousands of property searches every day.' },
];

const MILESTONES = [
  { year: '2016', event: 'EstateHub founded with a mission to democratize property search.' },
  { year: '2018', event: 'Expanded to 5 major cities, serving 1,000+ clients.' },
  { year: '2021', event: 'Launched mobile platform and reached 5,000 listed properties.' },
  { year: '2024', event: '12,500+ properties, 8,200+ happy clients, and growing.' },
];

const STATS = [
  { value: '12,500+', label: 'Properties Listed', icon: FaBuilding, color: 'from-blue-500 to-blue-600' },
  { value: '8,200+', label: 'Happy Clients', icon: FaUsers, color: 'from-emerald-500 to-emerald-600' },
  { value: '950+', label: 'Expert Agents', icon: FaHandshake, color: 'from-purple-500 to-purple-600' },
  { value: '4.9★', label: 'Average Rating', icon: FaStar, color: 'from-amber-500 to-amber-600' },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      {/* Hero Banner */}
      <div className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1e1b4b 100%)' }}>
        <div className="hero-particle" style={{ width: 350, height: 350, top: '-10%', right: '0%', background: 'radial-gradient(circle, #2563eb, transparent)' }} />
        <div className="hero-particle" style={{ width: 250, height: 250, bottom: '-5%', left: '-5%', background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-5 backdrop-blur-sm border border-white/20">
            🏡 Our Story
          </span>
          <h1 className="text-5xl font-extrabold text-white mb-5 leading-tight">
            Building{' '}
            <span className="gradient-text">Dream Homes,</span>
            <br />One Family at a Time
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            EstateHub was founded with a simple belief: everyone deserves a place to call home.
            We combine local expertise with modern technology to make property ownership accessible to all.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: '50px', width: '100%' }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f8fafc" />
          </svg>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(({ value, label, icon: Icon, color }, idx) => (
            <div key={label} className="bg-white rounded-2xl p-5 text-center card-hover animate-fade-in" style={{ animationDelay: `${idx * 100}ms`, border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-3`}>
                <Icon className="text-white text-xl" />
              </div>
              <div className="text-2xl font-extrabold text-gray-900 mb-1">{value}</div>
              <div className="text-xs text-gray-500 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-left">
            <p className="section-label mb-3">Our Mission</p>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-5 leading-tight">
              We Don't Just List Properties —<br />
              <span className="gradient-text">We Find You a Home</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-5">
              At EstateHub, we believe the process of finding your next property should be exciting, not overwhelming.
              Our platform connects you with thousands of verified listings, backed by trusted agents and transparent pricing.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Whether you're a first-time buyer, seasoned investor, or looking to rent — we have the tools, expertise, and heart to guide you every step of the way.
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
            >
              Browse Properties
              <FaArrowRight />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 animate-fade-in-right">
            {[
              { emoji: '🔍', title: 'Smart Search', desc: 'Advanced filters to find exactly what you need.' },
              { emoji: '✅', title: 'Verified Listings', desc: 'Every property is manually reviewed for accuracy.' },
              { emoji: '💬', title: '24/7 Support', desc: 'Our team is always here to help you.' },
              { emoji: '🔒', title: 'Secure Transactions', desc: 'Your data and payments are always protected.' },
            ].map((item, idx) => (
              <div key={item.title} className="bg-white p-5 rounded-2xl card-hover animate-fade-in" style={{ animationDelay: `${idx * 100}ms`, border: '1px solid #f1f5f9' }}>
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20" style={{ background: 'linear-gradient(to bottom, #f8fafc, white)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Our Journey</p>
            <h2 className="text-3xl font-extrabold text-gray-900">Milestones That Define Us</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600" />
            <div className="space-y-8">
              {MILESTONES.map(({ year, event }, idx) => (
                <div key={year} className="flex gap-6 animate-fade-in-left" style={{ animationDelay: `${idx * 150}ms` }}>
                  <div className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center text-white font-extrabold text-xs z-10"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
                    {year}
                  </div>
                  <div className="bg-white rounded-2xl p-4 flex-1" style={{ border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                    <p className="text-gray-700 font-medium text-sm">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-label mb-2">Meet the Team</p>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">The People Behind EstateHub</h2>
          <p className="text-gray-500 max-w-lg mx-auto">Dedicated professionals united by a passion for real estate and a commitment to exceptional service.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map(({ name, role, emoji, bio }, idx) => (
            <div key={name} className="bg-white rounded-2xl p-6 text-center card-hover animate-fade-in" style={{ animationDelay: `${idx * 100}ms`, border: '1px solid #f1f5f9' }}>
              <div className="text-5xl mb-4">{emoji}</div>
              <h3 className="font-bold text-gray-900 mb-1">{name}</h3>
              <p className="text-xs font-semibold text-blue-600 mb-3 uppercase tracking-wider">{role}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 mx-4 sm:mx-6 lg:mx-8 mb-10">
        <div className="max-w-4xl mx-auto rounded-3xl p-10 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e3a5f, #1e1b4b)' }}>
          <div className="hero-particle" style={{ width: 200, height: 200, top: '-20%', right: '-5%', background: 'radial-gradient(circle, #2563eb, transparent)' }} />
          <h2 className="text-3xl font-extrabold text-white mb-4 relative z-10">Ready to Find Your Dream Home?</h2>
          <p className="text-white/70 mb-8 relative z-10">Join thousands of satisfied clients who found their perfect property through EstateHub.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 rounded-xl bg-white text-blue-700 font-semibold hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            >
              Browse Properties
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-3 rounded-xl border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-all duration-200"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;