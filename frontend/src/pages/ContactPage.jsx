import React, { useState } from 'react';

const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white placeholder-gray-400 transition';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="text-center mb-10 animate-fade-in">
        <span className="inline-block px-4 py-1.5 bg-green-100 text-green-800 text-sm font-semibold rounded-full mb-4">📬 Get in Touch</span>
        <h1 className="section-heading text-green-900 mb-2">Contact Us</h1>
        <p className="text-gray-600">Our experts are available to assist you 24/7.</p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: '📍', title: 'Address', lines: ['312, 3rd Floor, Manju Sinha Park,', 'PC Colony, Patna, Bihar 800020'] },
          { icon: '📞', title: 'Phone', lines: ['Mobile: +91-1122334455', 'WhatsApp: +91-1122334455'] },
          { icon: '📧', title: 'Email', lines: ['info@kisaansahayak.com', 'RA24 Agri Connect PVT. LTD.'] },
        ].map(c => (
          <div key={c.title} className="glass-card p-5 card-lift animate-slide-up text-center sm:text-left">
            <div className="text-3xl mb-2">{c.icon}</div>
            <h3 className="font-bold text-gray-800 mb-1">{c.title}</h3>
            {c.lines.map(l => <p key={l} className="text-sm text-gray-600">{l}</p>)}
          </div>
        ))}
      </div>

      {/* Map + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 glass-card p-5 sm:p-8 animate-slide-up">
        {/* Map */}
        <div className="rounded-xl overflow-hidden h-64 sm:h-80 lg:h-full min-h-[280px]">
          <iframe
            title="Patna Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114131.13040768967!2d85.04584232304927!3d25.607045541330717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed582ce542e00f%3A0x6612f7d7e7bda271!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1690216232071!5m2!1sen!2sin"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Send us a Message</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Your Name" className={inputCls} required />
            <input type="email" placeholder="Email Address" className={inputCls} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="tel" placeholder="Mobile No" className={inputCls} />
            <input type="text" placeholder="Subject" className={inputCls} />
          </div>
          <textarea placeholder="Write your message…" className={`${inputCls} h-32 resize-none`} required />
          <button type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-green-700 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-800 hover:to-emerald-700 transition-all shadow-md">
            Send Message →
          </button>
          {sent && <p className="text-green-600 text-sm font-medium animate-fade-in">✓ Message sent! We'll get back to you soon.</p>}
        </form>
      </div>
    </div>
  );
}
