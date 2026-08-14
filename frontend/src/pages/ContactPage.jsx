import React from 'react';
export default function ContactPage() {
  return (
    <div className="bg-[#f6fff6]">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Contact Us</h1>
        <p className="text-gray-600 mb-6">Our experts are available to assist you 24/7.</p>

        {/* Contact Info Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Mail Address */}
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-bold mb-2">📍 Mail Address</h2>
            <p>
              312, 3rd Floor, Manju Sinha Park, Behind Gravity Mall,<br />
              PC Colony, Patna, Madhya Bihar (India) 800020 INDIA
            </p>
          </div>

          {/* Business Phone */}
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-bold mb-2">📞 Business Phone</h2>
            <p>Mobile: +91-1122334455</p>
            <p>WhatsApp: +91-1122334455</p>
          </div>

          {/* Email Address */}
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-bold mb-2">📧 Email Address</h2>
            <p><strong>Registered Company Name:</strong> RA24 Agri Connect PVT. LTD.</p>
            <p><strong>Product:</strong> Kisaan Helpline</p>
            <p>Email: info@kisaansahayak.com</p>
          </div>
        </div>

        {/* Map + Form */}
        <div className="grid md:grid-cols-2 gap-6 bg-white p-6 shadow rounded">
          {/* Google Maps Embed */}
          <div className="h-80">
            <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114131.13040768967!2d85.04584232304927!3d25.607045541330717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed582ce542e00f%3A0x6612f7d7e7bda271!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1690216232071!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Form */}
          <form className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Please feel free to contact us:</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Name" className="border p-2 w-full rounded" required />
              <input type="email" placeholder="Email Address" className="border p-2 w-full rounded" required />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Mobile No" className="border p-2 w-full rounded" required />
              <input type="text" placeholder="Subject" className="border p-2 w-full rounded" />
            </div>
            <textarea placeholder="Write a Message" className="border p-2 w-full rounded h-28" required />
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Send a Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
