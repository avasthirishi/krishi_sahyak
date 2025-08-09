
// src/pages/CropDetailPage.jsx
import React from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { cropData } from '../data/cropData';

export default function CropDetailPage() {
  const { cropId } = useParams();
  const navigate = useNavigate();

  const crop = cropData.find(c => String(c.id) === cropId);

  if (!crop) {
    return (
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Crop not found!</h2>
        <button
          onClick={() => navigate('/crops')}
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
        >
          Back to Crop List
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <button
        onClick={() => navigate('/crops')}
        className="mb-6 bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700"
      >
        ← Back to Crop List
      </button>

      {/* Moved crop image to the very top */}
      {crop.image && (
        <div className="mb-8 flex justify-center items-center p-4 bg-green-50 rounded-lg shadow-inner">
          <img src={crop.image} alt={crop.name} className="max-h-[500px] w-full object-contain rounded-lg" />
        </div>
      )}

      {/* Rest of the description and details */}
      <h1 className="text-4xl font-bold text-green-800 mb-4 text-center">{crop.name}</h1>
      <p className="text-xl text-gray-600 italic mb-8 text-center">{crop.scientificName}</p>

      {/* Changed to a single column layout as the image is now at the top */}
      <div className="grid grid-cols-1 gap-8">
        <div>
          <h2 className="text-3xl font-semibold text-green-700 mb-3">Overview</h2>
          <p className="text-gray-800 leading-relaxed mb-6">{crop.fullDescription}</p>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-green-100 mb-6">
            <h3 className="text-2xl font-semibold text-green-600 mb-3">Key Characteristics</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {crop.climate && <li><strong>Climate:</strong> {crop.climate}</li>}
              {crop.soil && <li><strong>Soil:</strong> {crop.soil}</li>}
              {crop.sowingTime && <li><strong>Sowing Time:</strong> {crop.sowingTime}</li>}
              {crop.harvestingTime && <li><strong>Harvesting Time:</strong> {crop.harvestingTime}</li>}
              {crop.waterRequirements && <li><strong>Water Requirements:</strong> {crop.waterRequirements}</li>}
              {crop.commonPests && <li><strong>Common Pests:</strong> {crop.commonPests}</li>}
              {crop.commonDiseases && <li><strong>Common Diseases:</strong> {crop.commonDiseases}</li>}
              {crop.yield && <li><strong>Typical Yield:</strong> {crop.yield}</li>}
            </ul>
          </div>

          {crop.cultivationPractices?.length > 0 && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-green-100 mb-6">
              <h3 className="text-2xl font-semibold text-green-600 mb-3">Cultivation Practices</h3>
              <ul className="list-decimal list-outside text-gray-700 space-y-3 pl-5">
                {crop.cultivationPractices.map((practice, index) => (
                  <li key={index}>{practice}</li>
                ))}
              </ul>
            </div>
          )}

          {crop.fertilizerManagement && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-green-100 mb-6">
              <h3 className="text-2xl font-semibold text-green-600 mb-3">Fertilizer Management</h3>
              <p className="text-gray-700 leading-relaxed">{crop.fertilizerManagement}</p>
            </div>
          )}

          {crop.marketInfo && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-green-100 mb-6">
              <h3 className="text-2xl font-semibold text-green-600 mb-3">Market Information</h3>
              <p className="text-gray-700 leading-relaxed">{crop.marketInfo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
