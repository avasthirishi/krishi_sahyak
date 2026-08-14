import React, { useState, useEffect } from 'react';
import moment from 'moment';

export default function NewsPage() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgriculturalNews = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 700));

        const dummyNews = [
          {
            id: 1,
            title: "PM Kisan Yojana: 2 अगस्त को किसानों के खाते में आएंगे 2000 रुपये, जानें स्टेटस चेक करने का तरीका",
            source: "Ministry of Agriculture & Farmers Welfare, GoI",
            date: "2025-06-18T10:00:00Z",
            summary: "देशभर के करोड़ों किसानों को राहत देने वाली प्रधानमंत्री किसान सम्मान निधि योजना...",
            link: "https://www.kisaanhelpline.com/agriculture/pm-kisan-yojana-20th-kist-date-august-2025/4005",
            image: "https://www.kisaanhelpline.com/public/uploads/news/1753858751.jpg"
          },
          {
            id: 2,
            title: "ऊटी लहसुन बीज की कीमत आसमान पर, मंडी में लहसुन के दाम ज़मीन पर – ऊटी लहसुन ने बिगाड़ा गणित",
            source: "India Meteorological Department (IMD)",
            date: "2025-06-17T14:30:00Z",
            summary: "ऊटी लहसुन (Ooty Garlic) को 1991 में तमिलनाडु कृषि विश्वविद्यालय (TNAU) ने GI टैग दिया था...",
            link: "https://www.kisaanhelpline.com/crops/ooty-lahsun-beej-mahanga-mandi-bhav-sasta/4004",
            image: "https://www.kisaanhelpline.com/public/uploads/news/1753772590.jpg"
          },
          {
            id: 3,
            title: "पीला मोजेक रोग से उड़द, मूंग और सोयाबीन की फसलें खतरे में, किसान तुरंत अपनाएं ये असरदार उपाय",
            source: "National Disaster Management Authority (NDMA)",
            date: "2025-06-16T09:15:00Z",
            summary: "देश के अलग-अलग राज्यों में जून के महीने में ही खरीफ फसलों की बुवाई का काम पूरा...",
            link: "https://www.kisaanhelpline.com/agriculture/pila-mosaic-rog-soyabean-urad-mung-control-upay/4003",
            image: "https://www.kisaanhelpline.com/public/uploads/news/1753681512.jpg"
          },
          {
            id: 4,
            title: "किसान भाइयों के लिए खुशखबरी: कृषि यंत्रों पर 50% तक सब्सिडी, जानिए पूरी प्रक्रिया",
            source: "Food Corporation of India (FCI)",
            date: "2025-06-15T11:45:00Z",
            summary: "मध्यप्रदेश में हैप्पी सीडर, सुपर सीडर और स्मार्ट सीडर पर मिल रही सब्सिडी, 24...",
            link: "https://www.kisaanhelpline.com/agriculture/krishi-yantra-subsidy-madhya-pradesh-2025/4002",
            image: "https://www.kisaanhelpline.com/public/uploads/news/1753422769.jpg"
          },
          {
            id: 5,
            title: "किसानों के लिए रामबाण उपाय: अब नीलगाय और छुट्टा जानवर नहीं करेंगे फसल बर्बाद, घर पर बनाएं ये असरदार घोल",
            source: "Indian Council of Agricultural Research (ICAR)",
            date: "2025-06-14T16:00:00Z",
            summary: "फसलों की सुरक्षा का देशी और असरदार उपाय, जो किसानों की मेहनत को बचाएगा खेत...",
            link: "https://www.kisaanhelpline.com/agriculture/neelgai-se-fasal-bachane-ka-gharelu-upay/4001",
            image: "https://www.kisaanhelpline.com/public/uploads/news/1753337537.jpg"
          },
          {
            id: 6,
            title: "कृषि-स्टार्टअप को बढ़ावा: सरकार ने 'Agri-Startup Fund' की घोषणा की",
            source: "NITI Aayog",
            date: "2025-06-13T13:00:00Z",
            summary: "नीति आयोग, कृषि अनुसंधान और शिक्षा विभाग के सहयोग से...",
            link: "https://currentaffairs.adda247.com/government-to-launch-agri-fund-for-start-ups-rural-enterprises-agrisure/",
            image: "https://currentaffairs.adda247.com/wp-content/uploads/multisite/sites/5/2024/07/13111916/Agri-startup-fund-to-help-increase-yield-market-linkages-1.jpg"
          },
          {
            id: 7,
            title: "देशभर में भारी बारिश का अलर्ट: किसान भाई सतर्क रहें, अगले 7 दिनों तक कई राज्यों में तेज़ बारिश और आंधी-तूफान की संभावना",
            source: "APEDA",
            date: "2025-06-12T10:30:00Z",
            summary: "देश के अलग-अलग हिस्सों में अगले 7 दिनों तक बारिश का दौर तेज़ रहने वाला है। मौसम...",
            link: "https://www.kisaanhelpline.com/agriculture/deshbhar-me-bhari-barish-ka-alert-kisan-bhai-satark-rahe/4000",
            image: "https://www.kisaanhelpline.com/public/uploads/news/1753244037.jpg"
          },
          {
            id: 8,
            title: "हरी मटर की खेती: कम लागत में अधिक मुनाफा देने वाली फसल, जानिए पूरी जानकारी",
            source: "Ministry of Agriculture & Farmers Welfare, GoI",
            date: "2025-06-11T08:00:00Z",
            summary: "देशभर में सब्जी वाली मटर यानी हरी मटर की खेती काफी लोकप्रिय होती जा रही है। खास...",
            link: "https://www.kisaanhelpline.com/crops/hari-matar-ki-kheti-kam-lagat-me-adhik-munafa/3999",
            image: "https://www.kisaanhelpline.com/public/uploads/news/1753176329.jpg"
          },
          {
            id: 9,
            title: "रासायनिक नहीं, अब अपनाइए नीम से बना देसी समाधान, फसल भी बचेगी और खर्च भी घटेगा",
            source: "Ministry of Agriculture & Farmers Welfare, GoI",
            date: "2025-06-10T15:00:00Z",
            summary: "खेती करने वाले किसान भाइयों के लिए एक बड़ी राहत की खबर है। आज के समय में रासायन...",
            link: "https://www.kisaanhelpline.com/agriculture/rasaynik-nahi-ab-apanaiye-neem-se-bana-desi-samadhan/3998",
            image: "https://www.kisaanhelpline.com/public/uploads/news/1753081998.jpg"
          },
          {
            id: 10,
            title: "प्रधानमंत्री धन-धान्य कृषि योजना: जानें कैसे मिलेगा किसानों को इसका फायदा",
            source: "Ministry of Agriculture & Farmers Welfare, GoI",
            date: "2025-06-09T12:00:00Z",
            summary: "प्रधानमंत्री नरेंद्र मोदी की अध्यक्षता में केंद्रीय कैबिनेट की बैठक में एक अहम...",
            link: "https://www.kisaanhelpline.com/agriculture/pradhanmantri-dhan-dhanya-krishi-yojna-jane-kaise-milega-ko-iska-fayda/3996",
            image: "https://www.kisaanhelpline.com/public/uploads/news/1752740035.jpg"
          },
          {
            id: 11,
            title:"बिहार में किसानों के लिए खुशखबरी, स्वीट कॉर्न और बेबी कॉर्न की खेती को मिलेगा अब बढ़ावा",
            source:"Bihar Agriculture Ministery & welfare",
            date:"2025-06-09T12:00:00Z",
            summary:"कृषि सचिव संजय अग्रवाल ने जानकारी दी कि राज्य सरकार उच्च मूल्य फसलों की खेती को बढ़ावा देने के लिए किसानों को 75 प्रतिशत तक अनुदान दे रही है. गरमा मौसम के लिए फिलहाल बेबी कॉर्न पर 50%...",
            link: "https://www.prabhatkhabar.com/state/bihar/patna/bihar-promotes-sweet-corn-baby-and-corn-farming",
            image : "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSYdZY5vkhez4IUKS4zuSAuHNfG0w1Xv4ld-df5i2inXlA9CSFBAdYSzQgU3nM1z1N4D6kj-BREq4piZENfl9v-9bLQtHuxnUZvEXt42kpwBIGP4QWZE4OkeQ"
          },
          {
            id:12,
            title:"बिहार में पान उत्पादन पर जोर, सरकार ने शुरू होगी ये योजना",
            source : "Bihar Agriculture Ministery & welfare",
            date:"2025-07-09T12:00:00Z",
            summary:"30 जुलाई 2025, भोपाल: बिहार में पान उत्पादन पर जोर, सरकार ने शुरू होगी ये योजना – बिहार में पान उत्पादन को बढ़ावा दिया जा रहा है और इसके  लिए वहां की सरकार ने पान विकास योजना को शुरू करने...",
            link:"https://www.krishakjagat.org/news/emphasis-on-betel-leaf-production-in-bihar-government-will-start-this-scheme/",
            image:"https://images.unsplash.com/photo-1690109295675-236a8ae10fd5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFhbnxlbnwwfHwwfHx8MA%3D%3D"
          }
        ];

        setNewsArticles(dummyNews.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (err) {
        setError("Failed to load news. Please try again later. (Error details: " + err.message + ")");
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgriculturalNews();
  }, []);

  if (loading) {
    return <div className="text-center p-8 text-xl text-gray-700">Loading the latest agricultural news...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-xl text-gray-600">{error}</div>;
  }

  return (
    <div className="container max-w-screen-lg mx-auto px-4 md:px-6 bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8 text-center">
        Agricultural News & Updates
      </h1>
      <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 text-center max-w-3xl mx-auto leading-relaxed">
        Stay updated with the latest news, government announcements, subsidies, schemes, and important advisories relevant to the agricultural sector in India.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsArticles.map(article => (
          <article
            key={article.id}
            className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-red-100 flex flex-col"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 sm:h-56 md:h-64 rounded-md mb-4 object-cover"
              loading="lazy"
            />
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2 flex-grow">{article.title}</h2>
            <p className="text-gray-600 text-xs sm:text-sm mb-1">
              <strong>Source:</strong> {article.source}
            </p>
            <time
              className="text-gray-600 text-xs sm:text-sm mb-3 block"
              dateTime={article.date}
            >
              <strong>Date:</strong> {moment(article.date).format('DD MMMM, YYYY [at] hh:mm A')} IST
            </time>
            <p className="text-gray-800 text-sm md:text-base mb-4 line-clamp-4">{article.summary}</p>
            <div className="mt-auto">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white text-sm md:text-base px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label={`Read full article: ${article.title}`}
              >
                Read More
              </a>
            </div>
          </article>
        ))}
      </div>

      {newsArticles.length === 0 && !loading && (
        <p className="text-center text-gray-600 mt-8">No news articles found at the moment. Please check back later!</p>
      )}
    </div>
  );
}
