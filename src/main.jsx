import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Ensure this path is correct relative to main.jsx
import './style.css'; // Ensure this path is correct relative to main.jsx
import { BrowserRouter } from 'react-router-dom';
// This is the entry point of your React application.
// It renders the root App component into the HTML element with the ID 'root'.
ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <React.StrictMode>
    {/* The main App component of your application */}
    
    <App />
  </React.StrictMode>,
  </BrowserRouter>
);
