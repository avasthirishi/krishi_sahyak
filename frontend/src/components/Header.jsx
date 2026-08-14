// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import logo from "../assets/kishan_sahayak_logo.png"; // Place your Kisan Sahayak logo here

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu overlay
  const [servicesOpen, setServicesOpen] = useState(false); // For desktop services dropdown
  const [profileOpen, setProfileOpen] = useState(false); // For desktop profile dropdown
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authAPI.isAuthenticated();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        const userData = authAPI.getUser();
        setUser(userData);
      } else {
        setUser(null);
      }
    };
    
    checkAuth();
    
    // Listen for storage changes (when profile is updated)
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [location.pathname]);

  // Get user display name
  const getUserName = () => {
    if (!user) return '';
    return user.profile?.fullName || user.fullName || user.email?.split('@')[0] || 'User';
  };

  // Get user initials for avatar
  const getUserInitial = () => {
    const name = getUserName();
    return name.charAt(0).toUpperCase();
  };

  // Close mobile menu and services dropdown when route changes
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // Handle logout
  const handleLogout = () => {
    authAPI.logout();
    setIsAuthenticated(false);
    setUser(null);
    setProfileOpen(false);
    setMenuOpen(false);
    navigate('/login');
  };

  // Helper function to close all menus on link click
  const handleLinkClick = () => {
    setMenuOpen(false);
    setServicesOpen(false);
    setProfileOpen(false);
  };

  // Items for the Services dropdown
  const servicesItems = [
    { to: "/research", label: "Research" },
    { to: "/resources", label: "Resources" },
    { to: "/weather", label: "Weather" },
    { to: "/crops", label: "Crops" },
    {to:"/mandilist", label: "mandiList"},
    {to:"/innovative-ideas", label :"innovative ideas",}
  ];

  const Logo = (
    <div className="flex items-center gap-2">
      <img src={logo} alt="Kisan Sahayak Logo" className=" w-13 object-contain" />
      <div className="leading-tight">
        <span className="text-yellow-400 font-extrabold text-2xl drop-shadow-md">Kisan</span>
        <div className="text-green-200 font-bold text-lg -mt-2">Sahayak</div>
      </div>
    </div>
  );

  // Dropdown component for desktop (Services)
  const Dropdown = ({ items, open, onClose }) =>
    open ? (
      <div
        className="absolute left-0 mt-1 bg-green-800 rounded-md shadow-lg py-2 z-40 min-w-[140px]"
        onMouseLeave={onClose}
      >
        {items.map((item) => (
          <Link
            to={item.to}
            key={item.to}
            className="block px-4 py-2 text-white hover:text-yellow-300 hover:bg-green-900 transition-colors"
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
      </div>
    ) : null;

  return (
    <header className="w-full z-50 sticky top-0 shadow-xl">
      {/* TOP BAR */}
      <div className="bg-gradient-to-r from-emerald-800 via-green-700 to-lime-700 text-white text-sm flex justify-between items-center px-4 py-2">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="14" rx="2" strokeLinejoin="round" />
            <path d="M3 7l9 6 9-6" strokeLinejoin="round" />
          </svg>
          <a href="mailto:info@kisaansahayak.com" className="hover:underline">
            info@kisaansahayak.com
          </a>
        </div>
        <div className="hidden md:flex gap-3 items-center">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-300 to-green-400 flex items-center justify-center text-green-900 font-bold text-sm shadow-md">
                  {getUserInitial()}
                </div>
                <span className="text-yellow-300 font-medium">Welcome, {getUserName()}</span>
              </div>
              <span className="text-green-400">|</span>
              <Link to="/profile" className="hover:text-yellow-300 flex items-center gap-1 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </Link>
              <span className="text-green-400">|</span>
              <button onClick={handleLogout} className="hover:text-yellow-300 flex items-center gap-1 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-300">Login</Link>
              <span>|</span>
              <Link to="/signup" className="hover:text-yellow-300">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="flex items-center justify-between px-4 py-3 md:py-2 relative bg-gradient-to-r from-green-950 via-green-900 to-green-950 border-b border-green-700/60">
        <Link to="/" className="flex items-center gap-2">{Logo}</Link>

        {/* Mobile menu toggle button */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? (
            <svg className="w-8 h-8 transform rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
            <svg className="w-8 h-8 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-white text-[1rem] font-medium relative">
          <Link to="/" className={`py-2 px-1 hover:text-yellow-300 ${location.pathname === "/" ? "text-yellow-400 font-bold" : ""}`}>Home</Link>
          <Link to="/news" className={`py-2 px-1 hover:text-yellow-300 ${location.pathname === "/news" ? "text-yellow-400 font-bold" : ""}`}>News</Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
              <button className="flex items-center py-2 px-1 hover:text-yellow-300">
              Services <span className="ml-1">&#9662;</span>
            </button>
            <Dropdown
              open={servicesOpen}
              onClose={() => setServicesOpen(false)}
              items={servicesItems}
            />
          </div>

          <Link to="/business-ideas" className={`py-2 px-1 hover:text-yellow-300 ${location.pathname === "/business-ideas" ? "text-yellow-400 font-bold" : ""}`}>Farmers</Link>
          {/* Moved About Us here */}
          <Link to="/about" className={`py-2 px-1 hover:text-yellow-300 ${location.pathname === "/about" ? "text-yellow-400 font-bold" : ""}`}>About Us</Link>
          <Link to="/contact" className={`py-2 px-1 hover:text-yellow-300 ${location.pathname === "/contact" ? "text-yellow-400 font-bold" : ""}`}>Contact Us</Link>
        </nav>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-gradient-to-br from-green-950 via-green-900 to-green-800 z-40 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-white text-3xl focus:outline-none"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation"
          >
            <svg className="w-8 h-8 transform rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <nav className="flex flex-col items-center text-white text-xl font-medium space-y-6 py-8">
          <Link to="/" className="block py-2 px-4 hover:text-yellow-300 transition-colors" onClick={handleLinkClick}>Home</Link>
          <Link to="/news" className="block py-2 px-4 hover:text-yellow-300 transition-colors" onClick={handleLinkClick}>News</Link>

          {/* Flattened Services for mobile */}
          <React.Fragment>
            <span className="text-yellow-400 font-bold text-lg mt-4 mb-2">Services</span>
            {servicesItems.map((item) => (
              <Link
                to={item.to}
                key={item.to}
                className="block py-2 px-4 hover:text-yellow-300 transition-colors"
                onClick={handleLinkClick}
              >
                {item.label}
              </Link>
            ))}
          </React.Fragment>

          <Link to="/business-ideas" className="block py-2 px-4 hover:text-yellow-300 transition-colors" onClick={handleLinkClick}>Business Ideas</Link>
          {/* Moved About Us here for mobile */}
          <Link to="/about" className="block py-2 px-4 hover:text-yellow-300 transition-colors" onClick={handleLinkClick}>About Us</Link>
          <Link to="/contact" className="block py-2 px-4 hover:text-yellow-300 transition-colors" onClick={handleLinkClick}>Contact Us</Link>

          {/* Conditional Login/Register or Profile/Logout links in mobile nav */}
          {isAuthenticated ? (
            <>
              <div className="border-t border-green-600 w-full my-4"></div>
              <div className="flex flex-col items-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-green-400 flex items-center justify-center text-green-900 font-bold text-2xl shadow-lg">
                  {getUserInitial()}
                </div>
                <span className="text-yellow-300 text-lg font-semibold">Welcome, {getUserName()}</span>
              </div>
              <Link to="/profile" className="block py-3 px-6 bg-green-800 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2" onClick={handleLinkClick}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Profile
              </Link>
              <button 
                onClick={handleLogout} 
                className="block py-3 px-6 bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 w-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              <div className="border-t border-green-600 w-full my-4"></div>
              <Link to="/login" className="block py-2 px-4 bg-green-800 rounded-lg hover:bg-green-700 transition-colors" onClick={handleLinkClick}>Login</Link>
              <Link to="/signup" className="block py-2 px-4 bg-yellow-500 text-green-900 rounded-lg hover:bg-yellow-400 transition-colors" onClick={handleLinkClick}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
