import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import all necessary components and pages with explicit file extensions for better resolution.
// This is done to ensure the bundler explicitly looks for files with the .jsx extension.
import Header from './components/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import ResearchPage from './pages/ResearchPage.jsx';
import ResourcePage from './pages/ResourcePage.jsx';
import WeatherPage from './pages/WeatherPage.jsx';
import BusinessIdeasPage from './pages/BusinessIdeasPage.jsx';
import NewsPage from './pages/NewsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import CropListPage from './pages/CropListPage.jsx';
import CropDetailPage from './pages/CropDetailPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import InnovativeIdeas from "./pages/InnovativeIdeas.jsx";
import Footer from './components/Footer.jsx';
import MandiListPage from './pages/mandiListPage.jsx';
import SoilTestingForm from './pages/SoilTestingPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import CommunityPage from './pages/CommunityPage.jsx';
import CropCalendarPage from './pages/CropCalendarPage.jsx';

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/resources" element={<ResourcePage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/business-ideas" element={<BusinessIdeasPage />} />
          <Route path="/innovative-ideas" element={<InnovativeIdeas />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/crops" element={<CropListPage />} />
          <Route path="/mandilist" element={<MandiListPage />} />
          <Route path="/crops/:cropId" element={<CropDetailPage />} />
          <Route path="/soil" element={<SoilTestingForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/crop-calendar" element={<CropCalendarPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<h1 className="text-center text-2xl font-bold py-24">404: Page Not Found</h1>} />
          <Route path="/footer" element={<Footer />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

