import React, { useState } from 'react';

function SignupPage({ onSignup }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    zipCode: '',
    password: '',
    howHear: '',
    affiliation: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'radio' ? (checked ? value : prevState[name]) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Attempting to sign up...');

    if (!formData.email || !formData.password || formData.password.length < 6 || !formData.firstName || !formData.lastName || !formData.zipCode) {
      setMessage('Signup Failed: Please fill all required fields and ensure password is at least 6 characters.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Signup successful!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          zipCode: '',
          password: '',
          howHear: '',
          affiliation: ''
        });
        onSignup && onSignup(formData.email);
      } else {
        setMessage(data.error || 'Signup failed.');
      }
    } catch {
      setMessage('Network or server error.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up for Krishi Sahayak</h2>
      <p className="text-center text-gray-600 mb-6">
        This is a demo. No actual user account will be created or stored, but it showcases the form functionality.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="firstName" className="block mb-1 font-semibold text-gray-700">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block mb-1 font-semibold text-gray-700">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-semibold text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="zipCode" className="block mb-1 font-semibold text-gray-700">Zip Code:</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-semibold text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="howHear" className="block mb-1 font-semibold text-gray-700">How did you hear about us?</label>
          <select
            id="howHear"
            name="howHear"
            value={formData.howHear}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Please Select...</option>
            <option value="online_ad">Online Ad</option>
            <option value="social_media">Social Media</option>
            <option value="friend">Friend/Colleague</option>
            <option value="event">Event/Workshop</option>
            <option value="search_engine">Search Engine</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Are you a?</label>
          <div className="flex flex-wrap gap-4">
            {[
              { value: 'agriculture_researcher', label: 'Agriculture Researcher' },
              { value: 'farmer', label: 'Farmer' },
              { value: 'partner', label: 'Partner' },
              { value: 'agri_media', label: 'Agri/Media' },
              { value: 'other', label: 'Other' },
            ].map(({ value, label }) => (
              <label key={value} className="inline-flex items-center space-x-2">
                <input
                  type="radio"
                  name="affiliation"
                  value={value}
                  checked={formData.affiliation === value}
                  onChange={handleChange}
                  className="form-radio text-green-600"
                />
                <span className="text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Sign Up
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-700 font-medium">{message}</p>}
    </div>
  );
}

export default SignupPage;
