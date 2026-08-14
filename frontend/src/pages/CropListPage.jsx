import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cropAPI } from '../services/api';

export default function CropListPage() {
  const navigate = useNavigate();
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      setLoading(true);
      const data = await cropAPI.getAll({ limit: 100 });
      setCrops(data.crops);
      setError(null);
    } catch (err) {
      console.error('Error fetching crops:', err);
      setError('Failed to load crops. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 my-8 text-center">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading crops...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 my-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button 
            onClick={fetchCrops}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Explore Our Crop Database</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
        Browse through our extensive list of {crops.length} crops to find detailed information on cultivation, climate, soil, common diseases, and best practices.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {crops.map(crop => (
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
                src={crop.imageUrl || `https://placehold.co/400x300/cccccc/000000?text=${crop.name.replace(/\s/g, '+')}`}
                alt={crop.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/400x300/cccccc/000000?text=${crop.name.replace(/\s/g, '+')}`;
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

      {crops.length === 0 && !loading && (
        <p className="text-center text-gray-600 mt-8">No crops found in the database</p>
      )}
    </div>
  );
}
