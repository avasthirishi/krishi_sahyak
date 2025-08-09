import React from 'react'; 
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-8 mt-12">
      <div className="container mx-auto px-6 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              Dedicated to providing valuable agricultural research, courses, and resources to empower farmers and researchers for a sustainable future.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li><Link to="/" className="hover:text-green-300 transition-colors">Home</Link></li>
              <li><Link to="/resources" className="hover:text-green-300 transition-colors">Resources & Expert Support</Link></li>
              <li><Link to="/resources" className="hover:text-green-300 transition-colors">Courses & Training</Link></li>
              <li><Link to="/research" className="hover:text-green-300 transition-colors">Researcher Suggestions</Link></li>
              <li><Link to="/contact" className="hover:text-green-300 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">
              Greater Noida, Uttar Pradesh, India<br />
              Email: info@agriresearchhub.com<br />
              Phone: +91 12345 67890
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <a href="#" aria-label="Facebook" className="text-white hover:text-green-300 transition-colors">
                <i className="fab fa-facebook-f text-lg"></i>
              </a>
              <a href="#" aria-label="Twitter" className="text-white hover:text-green-300 transition-colors">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-white hover:text-green-300 transition-colors">
                <i className="fab fa-linkedin-in text-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-6 text-sm">
          <p>&copy; {new Date().getFullYear()} Agri Research Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
