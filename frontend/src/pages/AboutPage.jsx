// src/pages/AboutPage.jsx
import React from 'react';

const STATS = [
  { value: '10M+', label: 'Farmers Reached' },
  { value: '700+', label: 'KVK Centres' },
  { value: '50+', label: 'Crop Varieties' },
  { value: '6', label: 'User Roles' },
];

const FEATURES = [
  { icon: '🌾', title: 'Crop Encyclopedia', desc: 'Detailed info on 50+ crops — climate, soil, pests, fertilizers, and market prices.' },
  { icon: '🔬', title: 'Research Papers', desc: 'Curated agricultural research from ICAR, IARI, and top universities — simplified for farmers.' },
  { icon: '📚', title: 'Courses & Training', desc: 'Government-backed training programs, certifications, and skill development resources.' },
  { icon: '🌦️', title: 'Weather Alerts', desc: 'Real-time weather forecasts and push notifications to protect your crops.' },
  { icon: '🏪', title: 'Mandi Prices', desc: 'Live market rates across mandis in India to help you sell at the best price.' },
  { icon: '👨‍🌾', title: 'Community', desc: 'Connect with farmers, researchers, mandi owners, and lab experts across India.' },
];

const TEAM = [
  { name: 'Dr. Ravi Kumar', role: 'Agricultural Scientist', avatar: '👨‍🔬' },
  { name: 'Priya Sharma', role: 'Full Stack Developer', avatar: '👩‍💻' },
  { name: 'Mohan Singh', role: 'Farmer Relations Lead', avatar: '👨‍🌾' },
  { name: 'Anjali Patel', role: 'Content & Research', avatar: '👩‍💼' },
];

export default function AboutPage() {
  return (
    <div className="page-container">
      {/* Hero */}
      <div className="text-center py-10 md:py-16 animate-fade-in">
        <span className="inline-block px-4 py-1.5 bg-green-100 text-green-800 text-sm font-semibold rounded-full mb-4">🌿 About Krishi Sahayak</span>
        <h1 className="section-heading text-green-900 mb-4">Empowering India's <span className="text-gradient">130 Million Farmers</span></h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          "कृषि सहायक" — Agriculture Helper. We bridge the information gap between modern agricultural science and the everyday farmer using technology, data, and community.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {STATS.map(s => (
          <div key={s.label} className="glass-card p-5 text-center card-lift animate-slide-up">
            <p className="text-3xl sm:text-4xl font-extrabold text-gradient mb-1">{s.value}</p>
            <p className="text-sm text-gray-600 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Vision */}
      <div className="glass-card p-6 sm:p-10 mb-12 animate-slide-up">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="text-6xl md:text-8xl">🌱</div>
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-3">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              A future where every Indian farmer — from smallholders to large-scale cultivators — has the knowledge and tools to make informed decisions. By bridging the information gap, we help minimize crop losses, optimize resource use, adopt modern techniques, and explore new markets — ultimately enhancing livelihoods and ensuring food security for the nation.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">What We Offer</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {FEATURES.map(f => (
          <div key={f.title} className="glass-card p-5 flex gap-4 card-lift animate-fade-in">
            <span className="text-3xl flex-shrink-0">{f.icon}</span>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Team */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Meet the Team</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
        {TEAM.map(t => (
          <div key={t.name} className="glass-card p-5 text-center card-lift animate-slide-up">
            <div className="text-5xl mb-3">{t.avatar}</div>
            <p className="font-bold text-gray-800 text-sm">{t.name}</p>
            <p className="text-xs text-green-700 mt-1">{t.role}</p>
          </div>
        ))}
      </div>

      {/* Commitment */}
      <div className="bg-gradient-to-br from-green-800 to-emerald-700 text-white rounded-2xl p-6 sm:p-10 text-center animate-slide-up">
        <h2 className="text-2xl font-bold mb-3">Our Commitment</h2>
        <p className="max-w-2xl mx-auto text-green-100 leading-relaxed">
          We continuously expand and refine Krishi Sahayak based on user feedback, the latest agricultural innovations, and evolving farmer needs. We believe in the power of knowledge to transform lives and uplift the agricultural community of India.
        </p>
        <p className="mt-4 text-yellow-300 font-semibold">🤝 Jai Jawan, Jai Kisan, Jai Vigyan</p>
      </div>
    </div>
  );
}
