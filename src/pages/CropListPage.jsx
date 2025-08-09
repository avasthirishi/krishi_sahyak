import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cropData } from '../data/cropData.js'; // Assuming cropData is exported from this file

export default function CropListPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Explore Our Crop Database</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
        Browse through our extensive list of crops to find detailed information on cultivation, climate, soil, common diseases, and best practices.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cropData.map(crop => (
          <div
            key={crop.id}
            onClick={() => navigate(`/crops/${crop.id}`)} // ✅ Fixed path
            className="bg-gray-50 rounded-lg shadow-md overflow-hidden cursor-pointer
                       hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200
                       flex flex-col"
          >
            {/* Crop Image */}
            <div className="w-full h-48 overflow-hidden">
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/400x300/cccccc/000000?text=${crop.name.replace(/\s/g, '+')}`;
                  console.error(`Failed to load image for ${crop.name}: ${crop.image}`);
                }}
              />
            </div>

            {/* Card Content */}
            <div className="p-4 flex-grow flex flex-col">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">{crop.name}</h2>
              <p className="text-gray-700 text-sm mb-3 line-clamp-3">{crop.briefDescription}</p>
              <div className="mt-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevents parent card's onClick from firing
                    navigate(`/crops/${crop.id}`);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cropData.length === 0 && (
        <p className="text-center text-gray-600 mt-8">No crop data available. Please add data to `src/data/cropData.js`.</p>
      )}
    </div>
  );
}
