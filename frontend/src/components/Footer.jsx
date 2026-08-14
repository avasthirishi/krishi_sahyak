import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gradient-to-r from-green-950 via-green-900 to-green-950 text-white pt-12 pb-6 mt-14 border-t border-green-700/60">
    <div className="page-container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold text-yellow-400 mb-3">🌿 Krishi Sahayak</h3>
          <p className="text-sm text-green-100/80 leading-relaxed mb-4">
            Empowering India's farmers with knowledge, technology, and community. Jai Kisan!
          </p>
          <div className="flex gap-3">
            {[
              { label: 'Facebook', href: '#', svg: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
              { label: 'Twitter', href: '#', svg: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
              { label: 'YouTube', href: '#', svg: 'M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
            ].map(s => (
              <a key={s.label} href={s.href} aria-label={s.label} className="w-9 h-9 rounded-full bg-green-700 hover:bg-green-600 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.svg} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-base font-semibold text-lime-300 mb-3">Services</h3>
          <ul className="space-y-2 text-sm text-green-100/80">
            {[
              ['/crops', '🌾 Crop Database'],
              ['/weather', '🌦️ Weather Forecast'],
              ['/mandilist', '🏪 Mandi Prices'],
              ['/resources', '📚 Courses & Training'],
              ['/soil', '🧪 Soil Testing'],
              ['/news', '📰 Agriculture News'],
            ].map(([to, label]) => (
              <li key={to}><Link to={to} className="hover:text-yellow-300 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="text-base font-semibold text-lime-300 mb-3">Community</h3>
          <ul className="space-y-2 text-sm text-green-100/80">
            {[
              ['/community', '👨‍🌾 Farmer Forum'],
              ['/research', '🔬 Research Papers'],
              ['/innovative-ideas', '💡 Innovative Ideas'],
              ['/business-ideas', '💼 Business Ideas'],
              ['/about', 'ℹ️ About Us'],
              ['/contact', '📬 Contact Us'],
            ].map(([to, label]) => (
              <li key={to}><Link to={to} className="hover:text-yellow-300 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-base font-semibold text-lime-300 mb-3">Contact</h3>
          <div className="space-y-2 text-sm text-green-100/80">
            <p>📍 PC Colony, Patna, Bihar 800020</p>
            <p>📞 +91-1122334455</p>
            <p>📧 info@kisaansahayak.com</p>
            <p className="mt-3 font-medium text-green-200">☎️ Kisan Helpline</p>
            <p className="text-yellow-400 font-bold text-lg">1800-180-1551</p>
            <p className="text-xs text-green-300">Toll-free · 24×7</p>
          </div>
        </div>
      </div>

      <div className="border-t border-green-700 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-green-100/70">
        <p>© {new Date().getFullYear()} Krishi Sahayak · RA24 Agri Connect PVT. LTD.</p>
        <div className="flex gap-4">
          <Link to="/about" className="hover:text-yellow-300 transition-colors">Privacy</Link>
          <Link to="/about" className="hover:text-yellow-300 transition-colors">Terms</Link>
          <Link to="/contact" className="hover:text-yellow-300 transition-colors">Support</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

