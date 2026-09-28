import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const CONTACT_INFO = [
  { icon: FaMapMarkerAlt, title: 'Office Address', detail: '123 Real Estate Ave, Addis Ababa, Ethiopia', color: 'from-blue-500 to-blue-600' },
  { icon: FaPhone, title: 'Phone Number', detail: '+251 911 123 456', color: 'from-emerald-500 to-emerald-600' },
  { icon: FaEnvelope, title: 'Email Us', detail: 'info@estatehub.com', color: 'from-purple-500 to-purple-600' },
  { icon: FaClock, title: 'Working Hours', detail: 'Mon–Sat: 9AM – 6PM', color: 'from-amber-500 to-amber-600' },
];

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200));
    setIsLoading(false);
    setSubmitted(true);
  };

  const inputClass = "w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      {/* Hero */}
      <div className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1e1b4b 100%)' }}>
        <div className="hero-particle" style={{ width: 300, height: 300, top: '-10%', right: '5%', background: 'radial-gradient(circle, #2563eb, transparent)' }} />
        <div className="hero-particle" style={{ width: 200, height: 200, bottom: '0%', left: '-5%', background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4 backdrop-blur-sm border border-white/20">
            💬 Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            We'd Love to{' '}
            <span className="gradient-text">Hear From You</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Whether you have a question about a listing, want to schedule a viewing, or just want to say hello — we're here.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" preserveAspectRatio="none" style={{ height: '40px', width: '100%' }}>
            <path d="M0,25 C360,50 1080,0 1440,25 L1440,50 L0,50 Z" fill="#f8fafc" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {CONTACT_INFO.map(({ icon: Icon, title, detail, color }, idx) => (
            <div key={title} className="bg-white rounded-2xl p-5 text-center card-hover animate-fade-in" style={{ animationDelay: `${idx * 80}ms`, border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-3`}>
                <Icon className="text-white text-lg" />
              </div>
              <h3 className="font-bold text-gray-800 text-sm mb-1">{title}</h3>
              <p className="text-gray-500 text-xs">{detail}</p>
            </div>
          ))}
        </div>

        {/* Form + Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-8 animate-fade-in-left" style={{ border: '1px solid #f1f5f9', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Send us a Message</h2>
              <p className="text-gray-500 text-sm">Fill in the form and we'll get back to you within 24 hours.</p>
            </div>

            {submitted ? (
              <div className="text-center py-12 animate-scale-in">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm mb-6">Thanks for reaching out. Our team will get back to you shortly.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                  className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+251 911 ..." className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Subject *</label>
                    <select name="subject" value={form.subject} onChange={handleChange} required className={inputClass}>
                      <option value="">Select a subject</option>
                      <option>Property Inquiry</option>
                      <option>Schedule Viewing</option>
                      <option>List My Property</option>
                      <option>Technical Support</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className={inputClass + " resize-none"}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-sm" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info Side */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in-right">
            {/* Office Card */}
            <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <h3 className="font-bold text-gray-900 mb-4">🏢 Visit Our Office</h3>
              <div className="rounded-xl overflow-hidden mb-4" style={{ height: '180px', background: 'linear-gradient(135deg, #dbeafe, #ede9fe)' }}>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <FaMapMarkerAlt className="text-blue-500 text-3xl mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">123 Real Estate Ave</p>
                    <p className="text-xs text-gray-500">Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500">We welcome walk-ins Mon–Sat from 9AM to 6PM. Appointments are preferred for property consultations.</p>
            </div>

            {/* Social */}
            <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <h3 className="font-bold text-gray-900 mb-4">🌐 Follow Us</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: FaFacebook, label: 'Facebook', color: 'bg-blue-600' },
                  { icon: FaTwitter, label: 'Twitter / X', color: 'bg-sky-500' },
                  { icon: FaInstagram, label: 'Instagram', color: 'bg-pink-600' },
                  { icon: FaLinkedin, label: 'LinkedIn', color: 'bg-blue-700' },
                ].map(({ icon: Icon, label, color }) => (
                  <button key={label} className={`${color} text-white flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5`}>
                    <Icon />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;