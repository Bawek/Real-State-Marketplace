import React from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' }} className="text-white">
      {/* Top gradient bar */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg, #2563eb, #7c3aed, #f59e0b)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-5 group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110" style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
                <FaBuilding className="text-white text-sm" />
              </div>
              <span className="text-2xl font-extrabold">Estate<span className="text-blue-400">Hub</span></span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Your trusted partner in finding the perfect property. We make real estate simple, transparent, and accessible for everyone.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaFacebook, href: '#', hoverColor: '#1877f2' },
                { icon: FaTwitter, href: '#', hoverColor: '#1da1f2' },
                { icon: FaInstagram, href: '#', hoverColor: '#e1306c' },
                { icon: FaLinkedin, href: '#', hoverColor: '#0a66c2' },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href + Icon.toString()}
                  href={href}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200 hover:-translate-y-1"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Browse Properties' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
                { to: '/properties/create', label: 'List Your Property' },
                { to: '/register', label: 'Create Account' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-white/50 hover:text-white text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    → {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-5">Property Types</h3>
            <ul className="space-y-3">
              {['Houses', 'Apartments', 'Condos', 'Townhouses', 'Villas', 'Land'].map(type => (
                <li key={type}>
                  <Link to={`/?type=${type.toLowerCase()}`} className="text-white/50 hover:text-white text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    → {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-5">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaMapMarkerAlt className="text-blue-400 text-xs" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">123 Real Estate Ave</p>
                  <p className="text-white/50 text-xs">Addis Ababa, Ethiopia</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-emerald-400 text-xs" />
                </div>
                <span className="text-white/70 text-sm">+251 911 123 456</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-purple-400 text-xs" />
                </div>
                <span className="text-white/70 text-sm">info@estatehub.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-bold text-lg mb-1">Stay Updated 📬</h4>
              <p className="text-white/50 text-sm">Get the latest property listings and market insights.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-1 md:w-64 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
              />
              <button
                className="px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm flex items-center gap-1">
            © {new Date().getFullYear()} EstateHub. Made with <FaHeart className="text-red-400 text-xs" /> for property seekers.
          </p>
          <div className="flex gap-6">
            {[
              { to: '/privacy', label: 'Privacy Policy' },
              { to: '/terms', label: 'Terms of Service' },
              { to: '/policy', label: 'Cookie Policy' },
            ].map(({ to, label }) => (
              <Link key={to} to={to} className="text-white/40 hover:text-white/70 text-xs transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;