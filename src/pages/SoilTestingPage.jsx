import React, { useState } from 'react';

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  landSize: '',
  soilType: '',
  currentCrops: '',
  queryType: '',
  problemDescription: '',
};

const SoilTestingForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace URL below with your backend endpoint if needed; here it's only a simulation.
      // await fetch('/api/submit-query', { method: "POST", body: JSON.stringify(formData) });
      setSubmissionStatus('Query submitted successfully! Our researchers will contact you soon.');
      setFormData(initialFormState);
    } catch (err) {
      setSubmissionStatus('Submission failed. Please try again.');
    }
  };

  return (
    <section 
      id="researcher_suggestion_form"
      className="p-4 sm:p-6 rounded-lg shadow-md border border-blue-100 bg-blue-50 mb-8 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-3 sm:mb-4 text-center">
        Submit Data for Soil Testing
      </h2>
      <p className="text-gray-600 mb-4 sm:mb-6 text-center text-sm sm:text-base">
        Provide details about your farm, soil, and current challenges to get tailored advice on crop selection, fertilizers, and pest/disease management.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-1">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            required
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-1">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-1">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            maxLength="10"
            title="Please enter a 10-digit phone number"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            required
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="landSize" className="block text-gray-700 text-sm font-bold mb-1">Land Size (in Acres, optional):</label>
          <input
            type="number"
            id="landSize"
            name="landSize"
            value={formData.landSize}
            onChange={handleChange}
            min="0"
            step="0.1"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="soilType" className="block text-gray-700 text-sm font-bold mb-1">Soil Type:</label>
          <input
            type="text"
            id="soilType"
            name="soilType"
            value={formData.soilType}
            onChange={handleChange}
            placeholder="e.g., Alluvial, Black, Red, Loamy"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label htmlFor="currentCrops" className="block text-gray-700 text-sm font-bold mb-1">Current/Previous Crops Grown (comma-separated, optional):</label>
          <input
            type="text"
            id="currentCrops"
            name="currentCrops"
            value={formData.currentCrops}
            onChange={handleChange}
            placeholder="e.g., Wheat, Rice, Cotton"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="queryType" className="block text-gray-700 text-sm font-bold mb-1">Type of Suggestion Needed:</label>
          <select
            id="queryType"
            name="queryType"
            value={formData.queryType}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select a type...</option>
            <option value="crop_recommendation">Crop Recommendation for my Soil</option>
            <option value="fertilizer_suggestion">Fertilizer Suggestion</option>
            <option value="pest_disease_medicine">Pest/Disease & Medicine Suggestion</option>
            <option value="irrigation_advice">Irrigation Advice</option>
            <option value="general_query">General Farming Query</option>
          </select>
        </div>
        <div>
          <label htmlFor="problemDescription" className="block text-gray-700 text-sm font-bold mb-1">Detailed Query/Problem Description:</label>
          <textarea
            id="problemDescription"
            name="problemDescription"
            value={formData.problemDescription}
            onChange={handleChange}
            rows="5"
            placeholder="Describe your soil, any specific issues with current crops, or what you're trying to achieve."
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>
        <button 
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 w-full"
        >
          Submit Query to Researcher
        </button>
        {submissionStatus && (
          <p className={`text-center text-sm mt-2 ${submissionStatus.includes('fail') ? 'text-red-500' : 'text-green-600'}`}>
            {submissionStatus}
          </p>
        )}
      </form>
    </section>
  );
};

export default SoilTestingForm;
