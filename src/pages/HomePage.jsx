// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import kishanSahayakLogo from '../assets/kishan_sahayak_logo.png';
import magazineLogo from '../assets/magazine_logo.png';
import eventLogo from '../assets/event_logo.png';
import mandiBhavHomeLogo from '../assets/mandi_bhav_home_logo.png';
import soilTesting from '../assets/soil_testing.png';
import HeroSection from '../assets/hero_main.png';
import aromaticPlants from '../assets/Aromatic_Plants_Icon.png';
import cropsHomePage from '../assets/Crops_homePage.png';
import expertIcon from '../assets/Expert_icon.png';
import indianSpices from '../assets/IndianSpices.png';
import internshipIcon from '../assets/Internship_home_Icon.png';
import researchLogo from '../assets/magazine_logo.png';
import mandiIcon from '../assets/Mandi_icons.png';
import organicFarming from '../assets/organic_farming.png';
import soilTestingIcon from '../assets/soil_testing.png';
import trainingProgram from '../assets/traning_program.png';
import weatherIcon from '../assets/weather.png';
import indianMillets from '../assets/Indian_Millets.png';
import newsIcon from "../assets/latest_news.png";
export default function HomePage() {
  const navigate = useNavigate();

  const heroFeatures = [
    { title: "Agriculture Research", navigateTo: "/research", imageUrl: magazineLogo },
    { title: "Agriculture Resources", navigateTo: "/resources", imageUrl: eventLogo },
    { title: "Weather Forecast", navigateTo: "/weather", imageUrl: weatherIcon },
    { title: "Crop Details", navigateTo: "/crops", imageUrl: cropsHomePage },
  ];

  const services = [
    { name: "Indian Crop", navigateTo: "/crops", iconUrl: cropsHomePage },
    { name: "Training Program", navigateTo: "/resources", iconUrl: trainingProgram },
    { name: "Indian Spices", navigateTo: "/crops", iconUrl: indianSpices },
    { name: "Expert Farmer", navigateTo: "/business-ideas", iconUrl: expertIcon },
    { name: "Organic Farming", navigateTo: "/resources", iconUrl: organicFarming },
    { name: "Weather", navigateTo: "/weather", iconUrl: weatherIcon },
    { name: "Innovative Ideas", navigateTo: "/innovative-ideas", iconUrl: internshipIcon },
    { name: "Latest News", navigateTo: "/news", iconUrl: newsIcon },
    { name: "Indian Millets", navigateTo: "/crops", iconUrl: indianMillets },
    { name: "Soil Testing", navigateTo: "/soil", iconUrl: soilTestingIcon },
    { name: "Mandi List", navigateTo: "/mandilist", iconUrl: mandiIcon },
    { name: "Research Paper", navigateTo: "/research", iconUrl: researchLogo },
  ];

  const latestNews = {
    image: "https://images.unsplash.com/photo-1434118489318-42a0e62c6235?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFpbnklMjBhbGVydCUyMGZvciUyMGZhcm1lcnN8ZW58MHx8MHx8fDA%3D",
    category: 'Agriculture',
    headline: 'देशभर में भारी बारिश का अलर्ट: किसान भाई सतर्क रहें, अगले 7 दिनों तक कई राज्यों में तेज़ बारिश और आंधी-तूफान की संभावना',
    snippet: `देश के अलग-अलग हिस्सों में अगले 7 दिनों तक बारिश का दौर तेज़ रहने वाला है। मौसम विभाग के मुताबिक, 23 जुलाई से 28 जुलाई तक कई राज्यों में मूसलधार बारिश, तेज हवाएं, और कहीं-कहीं बिजली के साथ आंधी भी आ सकती है। इसलिए किसान भाइयों को सलाह दी जाती है कि वो फसल की सुरक्षा के लिए जरूरी कदम उठाएं।....`,
    navigateTo: '/news'
  };

  const newsThumbnails = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1690109295675-236a8ae10fd5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFhbnxlbnwwfHwwfHx8MA%3D%3D",
      category: 'Agriculture',
      headline: "बिहार में पान उत्पादन पर जोर, सरकार ने शुरू होगी ये योजना",
      snippet: "30 जुलाई 2025, भोपाल: बिहार में पान उत्पादन पर जोर, सरकार ने शुरू होगी ये योजना – बिहार में पान उत्पादन को बढ़ावा दिया जा रहा है और इसके  लिए वहां की सरकार ने पान विकास योजना को शुरू करने...",
    },
    {
      id: 2,
      image: "https://www.kisaanhelpline.com/public/uploads/news/1753772590.jpg",
      category: 'Agriculture',
      headline: "ऊटी लहसुन बीज की कीमत आसमान पर, मंडी में लहसुन के दाम ज़मीन पर – ऊटी लहसुन ने बिगाड़ा गणित",
      snippet: "ऊटी लहसुन (Ooty Garlic) को 1991 में तमिलनाडु कृषि विश्वविद्यालय (TNAU) ने GI टैग दिया था...",
    },
    {
      id: 3,
      image: "https://www.kisaanhelpline.com/public/uploads/news/1753337537.jpg",
      category: 'Agriculture',
      headline: "किसानों के लिए रामबाण उपाय: अब नीलगाय और छुट्टा जानवर नहीं करेंगे फसल बर्बाद, घर पर बनाएं ये असरदार घोल",
      snippet: "फसलों की सुरक्षा का देशी और असरदार उपाय, जो किसानों की मेहनत को बचाएगा&nbsp;खेत...",
    },
    {
      id: 4,
      image: "https://www.kisaanhelpline.com/public/uploads/news/1753081998.jpg",
      category: 'Agriculture',
      headline: "रासायनिक नहीं, अब अपनाइए नीम से बना देसी समाधान, फसल भी बचेगी और खर्च भी घटेगा",
      snippet: "खेती करने वाले किसान भाइयों के लिए एक बड़ी राहत की खबर है। आज के समय में रासायन...",
    }
  ];

  const upcomingEventsData = [
    {
      image: "https://www.kisaanhelpline.com/public/uploads/events/1753271754.jpg",
      title: "PDFA International Dairy & Agri Expo 2026",
      startDate: "07 Feb 2026",
      endDate: "09 Feb 2026",
      city: "Jagraon, Ludhiana",
      navigateTo: "https://www.kisaanhelpline.com/19th-pdfa-international-dairy-agri-expo-2026"
    },
    {
      image: "https://www.kisaanhelpline.com/public/uploads/events/1753270857.jpg",
      title: "India International Horti Expo 2026",
      startDate: "19 Mar 2026",
      endDate: "21 Mar 2026",
      city: "Greater Noida, Delhi-NCR",
      navigateTo: "https://indiainternationalhortiexpo.com/"
    },
    {
      image: "https://www.kisaanhelpline.com/public/uploads/events/1753270381.jpg",
      title: "Krushiparv 2025",
      startDate: "26 Dec 2025",
      endDate: "29 Dec 2025",
      city: "Ahilya Nagar",
      navigateTo: "https://krushiparv.org/"
    },
    {
      image: "https://www.kisaanhelpline.com/public/uploads/events/1753269474.jpg",
      title: "India Agri Expo 2026",
      startDate: "30 Jan 2026",
      endDate: "01 Feb 2026",
      city: "Sahnewal, Ludhiana",
      navigateTo: "https://indiaagriexpo.com/"
    },
      {
      image: "https://static.wixstatic.com/media/f94dac_2e257749c45942cb953bc257ae70c4fd~mv2.jpg/v1/fill/w_146,h_146,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/UFI_AppEvIntRGB-1024x1024.jpg",
      title: "Agri Agro Grand Expo 2026",
      startDate: "08 Jan 2026",
      endDate: "11 Jan 2026",
      city: "Agra",
      navigateTo: "https://en.agroexpo.com.tr/?gad_source=1&gad_campaignid=22800099770&gbraid=0AAAAAD99_BxDrnXxzDwzlbxRIFM_JGou7&gclid=CjwKCAjwy7HEBhBJEiwA5hQNov9vyWBEP5kzk26i9_oVJVy6Gd6wY_dKeMqTQPO6s-590Rsx3ew-bxoCvHgQAvD_BwE"
    },
    {
      image:"https://www.amias.us/wp-content/uploads/2023/01/logo-International-Agribusiness-Council-IAC.png",
      title: "AMIAS 2024",
      startDate: "08 Aug 2025",
      endDate: "11 Sept 2025",
      city: "Delhi",
      navigateTo: "https://www.amias.us/"
    },
    {
      image: "https://www.krishidarshanexpo.com/media/Newbanner.png",
      title:"KRISHI DARSHAN EXPO",
      startDate:"15 Fab 2025",
      endDate:"21 Fab 2025",
      city:"Rajasthan,Uttar Pradesh, Punjab",
      navigateTo: "https://www.krishidarshanexpo.com/"
    },
    {
      image: "https://img.tradeindia.com/new_website1/tradeshowslandingpage/worldfoodindia/2025/logo.png",
      title : "BIOFACH INDIA 2025",
      startDate:"30 Aug 2025",
      endDate: "5 Sept 2025",
      city: "Greater Noida",
      navigateTo: "https://biofach-india.com/visit-details"
    }
  ];

  const partnersData = [
    "https://www.kisaanhelpline.com/public/images/image 54.png",
    "https://www.kisaanhelpline.com/public/images/image 55.png",
    "https://www.kisaanhelpline.com/public/images/image 56.png",
    "https://www.kisaanhelpline.com/public/images/image 57.png",
    "https://www.kisaanhelpline.com/public/images/image 58.png",
  ];

  const globalAgriFeatures = [
    { title: "1. Agriculture Network", description: "Bringing businesses together. Connecting agriculture, people, businesses and organizations." },
    { title: "2. Agriculture B2B Community", description: "One of the world's most active agribusiness communities. We expand a vibrant and sustainable online agriculture community." },
    { title: "3. Leading Platform", description: "Multiple communication channels including e-magazines, online trade shows, social media & partner outlets." },
    { title: "4. Influencer Marketing", description: "A global network of agriculture influencers generates business synergy that helps agriculture businesses grow and expand." },
    { title: "5. Agriculture Events", description: "Developing successful strategies to access domestic and global agriculture markets, organized by our leaders and partners" },
  ];

  // --- RENDER ---
  return (
    <>
      {/* --- Hero Section with Video --- */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-center items-center text-white text-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-10"
        >
          <source src="/videos/krishisahayak4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/20 z-20"></div>
        <div className="relative z-30 flex flex-col items-center p-4">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-2 sm:mb-4 drop-shadow-lg">
            India's First Farmer Community Network
          </h1>
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-5 max-w-2xl drop-shadow-md">
            EXPRESS YOURSELF AND CONNECT WITH GLOBAL FARMING LOVERS
          </p>
          <img
            src="https://www.kisaanhelpline.com/public/images/hero_main.png"
            alt="Farmer Community Icon"
            className="w-24 sm:w-36 md:w-44 h-auto relative object-cover shadow-lg mb-8"
            onError={e => { e.target.onerror = null; e.target.src = kishanSahayakLogo; }}
          />
        </div>
      </section>

      {/* --- Feature Cards --- */}
      <section className="relative -mt-12 sm:-mt-20 z-40 px-2">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-7 justify-around flex-wrap">
          {heroFeatures.map((feature, idx) => (
            <div
              key={idx}
              onClick={() => navigate(feature.navigateTo)}
              tabIndex={0}
              className="w-full h-32 sm:h-44 md:h-48 p-3 pb-2 shadow-md shadow-green-300 rounded-xl bg-white flex flex-col justify-center items-center text-center cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300 outline-none"
              onKeyDown={e => (e.key === 'Enter' && navigate(feature.navigateTo))}
              aria-label={feature.title}
            >
              <img
                className="object-contain w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 p-2"
                src={feature.imageUrl}
                title={feature.title}
                alt={feature.title}
                onError={e => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/cccccc/000000?text=${encodeURIComponent(feature.title)}`; }}
              />
              <h4 className="mt-2 text-xs sm:text-sm md:text-base font-bold">{feature.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* --- Our Services --- */}
      <section className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10 my-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 mb-8 text-center">Our Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              onClick={() => navigate(service.navigateTo)}
              tabIndex={0}
              className="bg-green-50 p-3 sm:p-5 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer hover:bg-green-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 outline-none"
              onKeyDown={e => (e.key === 'Enter' && navigate(service.navigateTo))}
              aria-label={service.name}
            >
              <div className="bg-white p-2 sm:p-4 rounded-full shadow-inner mb-3">
                <img
                  src={service.iconUrl}
                  alt={service.name}
                  className="w-8 h-8 sm:w-12 sm:h-12"
                  onError={e => { e.target.onerror = null; e.target.src = `https://placehold.co/48x48/cccccc/000000?text=Icon`; }}
                />
              </div>
              <h3 className="text-xs sm:text-base font-semibold text-green-700">{service.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* --- Latest News --- */}
      <section className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10 my-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 mb-8 text-center">Latest News</h2>
        {/* Main News Article */}
        <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="w-full lg:w-2/5 h-48 sm:h-64 overflow-hidden">
            <img
              src={latestNews.image}
              alt={latestNews.headline}
              className="w-full h-full object-cover"
              onError={e => { e.target.onerror = null; e.target.src = `https://placehold.co/800x600/cccccc/000000?text=News+Image`; }}
            />
          </div>
          <div className="w-full lg:w-3/5 p-4 sm:p-6 flex flex-col justify-between">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2">{latestNews.headline}</h3>
            <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
              {latestNews.category}
            </span>
            <p className="text-gray-700 text-xs sm:text-base mb-2">{latestNews.snippet}</p>
            <button
              onClick={() => navigate(latestNews.navigateTo)}
              className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700 w-max"
            >
              VIEW MORE &rarr;
            </button>
          </div>
        </div>

        {/* News Thumbnails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-5">
          {newsThumbnails.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg flex flex-col h-full border border-green-100 hover:shadow-xl transition-all cursor-pointer"
              onClick={() => navigate('/news')}
              tabIndex={0}
              aria-label={item.headline}
              onKeyDown={e => (e.key === 'Enter' && navigate('/news'))}
            >
              <div className="w-full h-28 sm:h-32 overflow-hidden">
                <img
                  src={item.image}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={e => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/dddddd/333333?text=Thumb`; }}
                />
              </div>
              <div className="p-3 flex flex-col flex-grow">
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full mb-2 w-max">
                  {item.category}
                </span>
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 truncate">{item.headline}</h4>
                <p className="text-xs text-gray-600 mb-2 line-clamp-3">{item.snippet}</p>
                <button
                  className="mt-auto bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-700 w-max self-end"
                >
                  और पढ़ें →
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-7">
          <button
            className="bg-green-700 text-white px-8 py-2 rounded-full font-semibold text-md md:text-lg hover:bg-green-800 transition"
            onClick={() => navigate('/news')}
          >
            सभी समाचार देखें
          </button>
        </div>
      </section>

      {/* --- Upcoming Events --- */}
      <section className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10 my-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 mb-8 text-center">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {upcomingEventsData.map((event, idx) => (
            <div
              key={idx}
              onClick={() => window.open(event.navigateTo, '_blank')}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border border-green-100 flex flex-col"
              tabIndex={0}
              aria-label={event.title}
              onKeyDown={e => (e.key === 'Enter' && window.open(event.navigateTo, '_blank'))}
            >
              <div className="w-full h-32 sm:h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  onError={e => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/cccccc/000000?text=Event+Image`; }}
                />
              </div>
              <div className="p-3 flex-grow flex flex-col items-center text-center">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1 md:mb-2 line-clamp-2">{event.title}</h3>
                <p className="text-xs md:text-sm text-gray-600">Start: {event.startDate}</p>
                <p className="text-xs md:text-sm text-gray-600">End: {event.endDate}</p>
                <p className="text-xs md:text-sm text-gray-600 mb-3">City: {event.city}</p>
                <button
                  onClick={e => { e.stopPropagation(); window.open(event.navigateTo, '_blank'); }}
                  className="mt-auto bg-green-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-green-700 transition-colors duration-300 text-xs md:text-base"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-8">
          <button
            onClick={() => window.open("https://www.kisaanhelpline.com/agriculture-events", '_blank')}
            className="bg-green-700 text-white px-5 py-2 sm:px-8 sm:py-3 rounded-full text-lg font-semibold hover:bg-green-800 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Read More Events &rarr;
          </button>
        </div>
      </section>

      {/* --- Global Agriculture B2B Trade Marketplace --- */}
      <section className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10 my-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 mb-8 text-center">
          GLOBAL AGRICULTURE B2B TRADE MARKETPLACE
        </h2>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 flex justify-center items-center mb-6 lg:mb-0">
            <img
              src="https://www.kisaanhelpline.com/public/images/mobileApp.png"
              alt="Global Agriculture B2B Trade Marketplace"
              className="w-[90vw] max-w-xs sm:max-w-sm md:max-w-md object-contain rounded-lg shadow-xl bg-white"
              onError={e => { e.target.onerror = null; e.target.src = `https://placehold.co/350x350/4CAF50/FFF?text=B2B+App`; }}
            />
          </div>
          <div className="lg:w-1/2">
            {globalAgriFeatures.map((feature, idx) => (
              <div key={idx} className="mb-3 md:mb-6">
                <h5 className="p-1 text-base sm:text-lg text-black font-bold">{feature.title}</h5>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center mt-8">
          <button
            onClick={() => window.open("", '_blank')}
            className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Register &rarr;
          </button>
        </div>
      </section>

      {/* --- What We Do / About App Section --- */}
      <section className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10 my-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 mb-8 text-center">Empowering Farmers with Technology</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-2 md:mb-4">What We Do</h3>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-2 md:mb-4 leading-relaxed">
              Krishi Sahayak is a digital platform dedicated to improving the lives of farmers in India through technology and community for sustainable agriculture. We are an emerging startup in the agriculture sector, committed to increasing the efficiency and sustainability of agricultural operations since 2014.
            </p>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4 leading-relaxed">
              We connect progressive farmers and common people of the rural class across the country, helping them integrate more than ever and giving them the right information at the right time – from sowing crops, field preparation, rearing, and crop protection to harvesting.
            </p>
            <button
              onClick={() => navigate('/about')}
              className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-green-700 transition-colors duration-300"
            >
              READ MORE &rarr;
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src="https://www.kisaanhelpline.com/public/images/hero_main.png"
              alt="Krishi Sahayak App Screenshots"
              className="w-36 sm:w-56 md:w-full max-w-sm rounded-lg shadow-xl"
              onError={e => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/4CAF50/FFF?text=App+Screenshots`; }}
            />
          </div>
        </div>
        <div className="mt-10 pt-5 border-t border-gray-200">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-3 md:mb-4 text-center">
            About Our Kisan Helpline App
          </h3>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4 text-center max-w-3xl mx-auto leading-relaxed">
            Our Kisan Helpline App is a useful application designed to help farmers with many important information and services related to agriculture. The main features and benefits include:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base md:text-lg space-y-3 max-w-3xl mx-auto">
            <li><strong>Mandi Bhav:</strong> Check the latest market prices of various mandis to get the right price for your produce.</li>
            <li><strong>Weather Information:</strong> Get information about weather forecasts and current conditions.</li>
            <li><strong>Advice and Solutions:</strong> A special section to get free advice and solutions from agricultural experts.</li>
            <li><strong>Agriculture News:</strong> An excellent source for the latest news and updates related to agriculture.</li>
            <li><strong>Crops and Farming:</strong> Information about various crops, growing methods, and use of fertilizers and pesticides.</li>
            <li><strong>Soil Testing:</strong> Get information to check the health and nutrient status of your soil.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
