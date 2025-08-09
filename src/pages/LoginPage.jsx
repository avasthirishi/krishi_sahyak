// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import './AuthPages.css'; // Reusing the same CSS for consistent styling

function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Attempting to log in...');

    // Basic validation
    if (!formData.email || !formData.password) {
      setMessage('Login Failed: Please enter both email and password.');
      return;
    }

    // Simulate an async operation (e.g., API call to authenticate user)
    try {
      console.log('Attempting login with:', formData);
      // In a real application, you would send this data to a backend for actual authentication
      // Example using fetch:
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      //
      // if (response.ok) {
      //   // handle success, maybe get a token
      // } else {
      //   // handle error
      // }

      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      // For demo, we just simulate success if email is 'demo@example.com'
      if (formData.email === 'demo@example.com' && formData.password === 'password123') {
        setMessage('Demo Login Successful! Welcome.');
        onLogin({ email: formData.email }); // Call the demo login function from App.jsx
      } else {
        setMessage('Demo Login Failed: Invalid credentials. Use demo@example.com / password123.');
      }
      
      // Clear the form after submission attempt
      setFormData({
        email: '',
        password: ''
      });

    } catch (error) {
      console.error('Login error:', error);
      setMessage(`Login Failed: ${error.message || 'An unexpected error occurred.'}`);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to Krishi Sahayak</h2>
      <p>This is a demo. Use <strong>demo@example.com</strong> and <strong>password123</strong> to log in.</p>
      <form onSubmit={handleSubmit} className="auth-form">
        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="auth-button">Login</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
     
    </div>
  );
}

export default LoginPage;
