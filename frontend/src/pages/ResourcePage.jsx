
import React, { useEffect, useState } from 'react';
// Removed: import './ResourcePage.css'; - All styling is now handled by Tailwind CSS.
import ResearcherSuggestionForm from './SoilTestingPage';
import { resourceAPI } from '../services/api';

function ResourcePage() {
  const [agriculturalCourses, setAgriculturalCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState('');

  // State for course detail modal
  const [showCourseDetailModal, setShowCourseDetailModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // New states for enrollment form
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [enrollmentFormData, setEnrollmentFormData] = useState({
    name: '',
    phone: '',
    email: '',
    govIdNo: '',
    govIdProof: null, // To store file object
    password: '',
  });
  const [enrollmentMessage, setEnrollmentMessage] = useState('');

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setCoursesLoading(true);
      const data = await resourceAPI.getAll({ status: 'published', limit: 100 });
      setAgriculturalCourses(data.resources || []);
      setCoursesError('');
    } catch (error) {
      console.error('Error fetching resources:', error);
      setCoursesError('Unable to load agricultural resources at the moment.');
    } finally {
      setCoursesLoading(false);
    }
  };

  const handleLearnMore = (course) => {
    setSelectedCourse(course);
    setShowCourseDetailModal(true);
    setShowEnrollmentForm(false); // Ensure enrollment form is hidden initially
    setEnrollmentMessage(''); // Clear any previous enrollment messages
  };

  const handleCloseModal = () => {
    setShowCourseDetailModal(false);
    setSelectedCourse(null);
    setShowEnrollmentForm(false);
    setEnrollmentFormData({ name: '', phone: '', email: '', govIdNo: '', govIdProof: null, password: '' });
    setEnrollmentMessage('');
  };

  // Handler for enrollment form changes
  const handleEnrollmentFormChange = (e) => {
    const { name, value, files } = e.target;
    setEnrollmentFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value // Handle file input specially
    }));
  };

  // Handler for enrollment form submission
  const handleEnrollmentSubmit = async (e) => {
    e.preventDefault();
    setEnrollmentMessage('Submitting enrollment application...');

    // Basic validation
    if (!enrollmentFormData.name || !enrollmentFormData.phone || !enrollmentFormData.email || !enrollmentFormData.govIdNo || !enrollmentFormData.password) {
      setEnrollmentMessage('Please fill all required fields for enrollment.');
      return;
    }
    if (enrollmentFormData.password.length < 6) {
        setEnrollmentMessage('Password must be at least 6 characters long.');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enrollmentFormData.email)) {
        setEnrollmentMessage('Please enter a valid email address.');
        return;
    }
    // Gov ID Proof file is optional for this demo, but can be made required
    // if (!enrollmentFormData.govIdProof) {
    //     setEnrollmentMessage('Please upload your Government ID Proof.');
    //     return;
    // }

    console.log('Enrollment data submitted:', {
      course: selectedCourse.title,
      ...enrollmentFormData,
      govIdProof: enrollmentFormData.govIdProof ? enrollmentFormData.govIdProof.name : 'No file', // Log file name
    });

    try {
      // Simulate API call for enrollment submission
      await new Promise(resolve => setTimeout(resolve, 2000));

      setEnrollmentMessage('Enrollment application submitted successfully! Our team will review it and contact you.');
      setEnrollmentFormData({ name: '', phone: '', email: '', govIdNo: '', govIdProof: null, password: '' }); // Clear form
      setTimeout(() => handleCloseModal(), 3000); // Close modal after successful submission
    } catch (error) {
      console.error('Enrollment submission failed:', error);
      setEnrollmentMessage(`Enrollment failed: ${error.message || 'An unexpected error occurred.'}`);
    }
  };

  return (
    <>
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">Farmer Resources & Expert Support</h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
          Access valuable agricultural courses and connect directly with researchers for personalized suggestions tailored to your farm.
        </p>

        {/* Agricultural Courses Section - Now full width at the top */}
        <section className="p-6 rounded-lg shadow-md border border-green-100 mb-12"> {/* courses-section */}
          <h2 className="text-3xl font-semibold text-green-700 mb-4 text-center">Agricultural Courses & Training</h2>
          <p className="text-gray-600 mb-6 text-center">
            Enhance your farming knowledge with our expert-designed courses.
          </p>
          {coursesLoading && (
            <div className="text-center py-8 text-gray-600">Loading resources...</div>
          )}

          {coursesError && !coursesLoading && (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{coursesError}</p>
              <button
                onClick={fetchResources}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          )}

          {!coursesLoading && !coursesError && agriculturalCourses.length === 0 && (
            <div className="text-center py-8 text-gray-600">
              No agricultural resources are available yet.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* course-list */}
            {agriculturalCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col"> {/* course-card */}
                {/* Course Image */}
                <img
                  src={course.imageUrl || 'https://placehold.co/300x200/cccccc/000000?text=Course'}
                  alt={course.title}
                  className="w-full h-65 object-cover rounded-t-lg mb-4"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/300x200/cccccc/000000?text=Course`; }}
                />
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{course.title}</h3>
                  <p className="text-xs uppercase tracking-wide text-green-700 mb-2">{course.category}</p>
                  <p className="text-gray-600 text-sm mb-3 flex-grow">{course.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-700 mb-4">
                    <span><strong>Fees:</strong> {course.fees || 'N/A'}</span>
                    <span><strong>Duration:</strong> {course.duration || 'N/A'}</span>
                  </div>
                  <button
                    onClick={() => handleLearnMore(course)}
                    className="mt-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 w-full text-center"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <div><ResearcherSuggestionForm/></div>
        {/* Other Useful Resources Section (existing) */}
        <section className="p-6 rounded-lg shadow-md border border-gray-100 bg-gray-50"> {/* other-resources-section */}
          <h2 className="text-3xl font-semibold text-gray-700 mb-4 text-center">Other Useful Resources</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Government Agricultural Schemes & Subsidies</li>
            <li>Market Price Information for Crops</li>
            <li>Pest and Disease Management Guides</li>
            <li>Weather Advisories & Forecasts</li>
            <li>Best Practices for Sustainable Farming</li>
            <li>Local Agricultural Extension Services Contacts</li>
          </ul>
          <p className="text-sm text-gray-600 mt-4 italic text-center"> {/* note */}
            For immediate assistance, please visit your nearest Agricultural Research Center.
          </p>
        </section>
      </div>

      {/* Course Detail Modal */}
      {showCourseDetailModal && selectedCourse && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 p-4"> {/* course-detail-modal-overlay */}
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-lg relative"> {/* course-detail-modal-content */}
            <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold" onClick={handleCloseModal}>&times;</button> {/* close-button */}

            {!showEnrollmentForm ? (
              // Course Details View
              <>
                <h3 className="text-2xl font-bold text-green-700 mb-4">{selectedCourse.title} Course Details</h3>
                <img
                  src={selectedCourse.imageUrl || 'https://placehold.co/400x200/cccccc/000000?text=Course+Detail'}
                  alt={selectedCourse.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x200/cccccc/000000?text=Course+Detail`; }}
                />
                <p className="text-gray-700 mb-3"><strong>Category:</strong> {selectedCourse.category}</p>
                <p className="text-gray-700 mb-3"><strong>Description:</strong> {selectedCourse.description}</p>
                <p className="text-gray-700 mb-3"><strong>Course Fees:</strong> {selectedCourse.fees || 'N/A'}</p>
                <p className="text-gray-700 mb-4"><strong>Duration:</strong> {selectedCourse.duration || 'N/A'}</p>
                <button
                  onClick={() => setShowEnrollmentForm(true)}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 w-full"
                >
                  Enroll Now
                </button>
              </>
            ) : (
              // Enrollment Form View
              <>
                <h3 className="text-2xl font-bold text-green-700 mb-4">Enroll in {selectedCourse.title} Course</h3>
                <form onSubmit={handleEnrollmentSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="enrollName" className="block text-gray-700 text-sm font-bold mb-2">
                      Full Name:
                    </label>
                    <input
                      type="text"
                      id="enrollName"
                      name="name"
                      value={enrollmentFormData.name}
                      onChange={handleEnrollmentFormChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="enrollPhone" className="block text-gray-700 text-sm font-bold mb-2">
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      id="enrollPhone"
                      name="phone"
                      value={enrollmentFormData.phone}
                      onChange={handleEnrollmentFormChange}
                      pattern="[0-9]{10}"
                      title="Please enter a 10-digit phone number"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="enrollEmail" className="block text-gray-700 text-sm font-bold mb-2">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="enrollEmail"
                      name="email"
                      value={enrollmentFormData.email}
                      onChange={handleEnrollmentFormChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="govIdNo" className="block text-gray-700 text-sm font-bold mb-2">
                      Government ID Number:
                    </label>
                    <input
                      type="text"
                      id="govIdNo"
                      name="govIdNo"
                      value={enrollmentFormData.govIdNo}
                      onChange={handleEnrollmentFormChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="govIdProof" className="block text-gray-700 text-sm font-bold mb-2">
                      Government ID Proof (Upload File):
                    </label>
                    <input
                      type="file"
                      id="govIdProof"
                      name="govIdProof"
                      onChange={handleEnrollmentFormChange}
                      className="block w-full text-sm text-gray-500
                                 file:mr-4 file:py-2 file:px-4
                                 file:rounded-md file:border-0
                                 file:text-sm file:font-semibold
                                 file:bg-green-50 file:text-green-700
                                 hover:file:bg-green-100"
                    />
                      {enrollmentFormData.govIdProof && (
                          <p className="text-xs text-gray-500 mt-1">File selected: {enrollmentFormData.govIdProof.name}</p>
                      )}
                  </div>
                  <div>
                    <label htmlFor="enrollPassword" className="block text-gray-700 text-sm font-bold mb-2">
                      Set Password (for enrollment account):
                    </label>
                    <input
                      type="password"
                      id="enrollPassword"
                      name="password"
                      value={enrollmentFormData.password}
                      onChange={handleEnrollmentFormChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                      minLength="6"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 w-full"
                    >
                      Submit Application
                    </button>
                  </div>
                  {enrollmentMessage && (
                    <p className={`text-center text-sm mt-3 ${enrollmentMessage.includes('failed') ? 'text-red-500' : 'text-green-600'}`}>
                      {enrollmentMessage}
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ResourcePage;
