// src/pages/AboutPage.jsx
import React from 'react';
export default function AboutPage() {
  const currentYear = new Date().getFullYear();
  // Using toLocaleString for Indian time zone and specific format
  const currentTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata' // Explicitly set Indian Standard Time
  });
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata'
  });

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">About Krishi Sahayak</h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-3xl mx-auto">
        "Krishi Sahayak" (कृषि सहायक) translates to "Agriculture Helper" or "Farm Assistant". Our mission is to empower farmers in India with accessible, accurate, and actionable information, leveraging technology to foster sustainable and profitable agricultural practices.
      </p>

      <div className="max-w-4xl mx-auto text-center md:text-left">
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Our Vision</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          We envision a future where every Indian farmer, from smallholders to large-scale cultivators, has the knowledge and tools to make informed decisions. By bridging the information gap, we aim to help them minimize crop losses due to unpredictable weather or pests, optimize resource use, adopt modern techniques, and explore new markets and business opportunities, ultimately leading to enhanced livelihoods and food security for the nation.
        </p>

        <h2 className="text-3xl font-semibold text-gray-700 mb-4 mt-8">What We Offer</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2 leading-relaxed">
          <li><strong>Agricultural Research:</strong> A growing repository of research papers from leading Indian and international agricultural scientists, simplified for practical application.</li>
          <li><strong>Learning & Training Resources:</strong> Comprehensive courses on various farming types (poultry, dairy, fruit, vegetable, grains, fish farming, etc.), providing practical knowledge from experts.</li>
          <li><strong>Personalized Farm Suggestions:</strong> A unique feature allowing farmers to submit their soil and crop data to receive tailored advice from researchers on optimal crop choices, fertilizers, and pest management.</li>
          <li><strong>Weather Insights:</strong> Detailed historical weather data for the past 15 days and accurate forecasts for the upcoming 15 days, enabling proactive planning for sowing, irrigation, and harvesting.</li>
          <li><strong>Innovative Business Ideas:</strong> Inspiration from successful 'royal models' of farmers who have diversified and earned significant profits, along with new, viable business opportunities like exotic crop cultivation and value-added products.</li>
          <li><strong>Latest Agricultural News:</strong> Timely updates on government policies, subsidies, flood relief schemes, market price fluctuations, and other crucial agricultural developments.</li>
          <li><strong>Crop Encyclopedia:</strong> Detailed information on various crops, including their cultivation requirements, common diseases, and best practices.</li>
        </ul>

        <h2 className="text-3xl font-semibold text-gray-700 mb-4 mt-8">Our Commitment</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          We are committed to continuously expanding and refining Krishi Sahayak based on user feedback, the latest agricultural innovations, and evolving farmer needs. Our team works diligently to ensure the information provided is accurate, relevant, and easy to understand. We believe in the power of knowledge to transform lives and uplift the agricultural community.
        </p>
      </div>
    </div>
  );
}