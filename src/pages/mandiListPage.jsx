import React from 'react';

// Add image property to all objects (use a default image if missing)
const mandiData = [
  {
    key: "1",
    productName: "Soyabean Bhav Mandi",
    cityState: "Patna Bihar",
    market: "Khachrod",
    priceDate: "02/05/2025",
    minPrice: "3501 Rs/Quintal",
    maxPrice: "4381 Rs/Quintal",
    image: "https://plus.unsplash.com/premium_photo-1661964013500-2d2af58b166b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8U295YWJlYW58ZW58MHx8MHx8fDA%3D"
  },
  {
    key: "2",
    productName: "Wheat Bhav Mandi",
    cityState: "Patna Bihar",
    market: "Tarana",
    priceDate: "02/05/2025",
    minPrice: "2450 Rs/Quintal",
    maxPrice: "2481 Rs/Quintal",
    image: "https://images.unsplash.com/photo-1529511582893-2d7e684dd128?q=80&w=1033&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    key: "3",
    productName: "Bengal Gram(Gram)(Whole) Bhav Mandi",
    cityState: "Patna Bihar",
    market: "Badnagar",
    priceDate: "02/05/2025",
    minPrice: "3651 Rs/Quintal",
    maxPrice: "6102 Rs/Quintal",
    image: "https://www.agrifarming.in/wp-content/uploads/Guide-to-Chickpea-Bengal-GramChana-Farming-2.jpg"
  },
  {
    key: "4",
    productName: "Lentil (Masur)(Whole) Bhav Mandi",
    cityState: "Patna Bihar",
    market: "Ujjain",
    priceDate: "02/05/2025",
    minPrice: "5470 Rs/Quintal",
    maxPrice: "5470 Rs/Quintal",
    image: "https://villagevasi.com/wp-content/uploads/2021/11/WhatsApp-Image-2021-11-19-at-1.27.11-AM.jpeg"
  },
  {
    key: "5",
    productName: "Onion Bhav Mandi",
    cityState: "Patna Bihar",
    market: "Ujjain",
    priceDate: "02/05/2025",
    minPrice: "110 Rs/Quintal",
    maxPrice: "1019 Rs/Quintal",
    image: "https://plus.unsplash.com/premium_photo-1668076517573-fa01307d87ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8T25pb258ZW58MHx8MHx8fDA%3D"
  },
  {
    key: "6",
    productName: "Green peas Bhav Mandi",
    cityState: "Patna Bihar",
    market: "Badnagar",
    priceDate: "02/05/2025",
    minPrice: "1300 Rs/Quintal",
    maxPrice: "4491 Rs/Quintal",
    image: "https://images.unsplash.com/photo-1668548205372-1becd11b5641?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEdyZWVuJTIwcGVhc3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    key: "7",
    productName: "Potato Bhav Mandi",
    cityState: "Patna Bihar",
    market: "Ujjain",
    priceDate: "02/05/2025",
    minPrice: "611 Rs/Quintal",
    maxPrice: "1399 Rs/Quintal",
    image: "https://images.unsplash.com/photo-1644439017477-befade11bd83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UG90YXRvJTIwZmllbGR8ZW58MHx8MHx8fDA%3D"
  },
  {
    key: "8",
    productName: "Carrot Bhav Mandi",
    cityState: "Shimla, Himachal Pradesh",
    market: "Lakkar Bazar",
    priceDate: "30/07/2025",
    minPrice: "1000 Rs/Quintal",
    maxPrice: "1300 Rs/Quintal",
    image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    key: "9",
    productName: "Cabbage Bhav Mandi",
    cityState: "Ranchi, Jharkhand",
    market: "Daily Mandi",
    priceDate: "30/07/2025",
    minPrice: "700 Rs/Quintal",
    maxPrice: "950 Rs/Quintal",
    image: "https://images.unsplash.com/photo-1486328228599-85db4443971f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2FiYmFnZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    key: "10",
    productName: "Cauliflower Bhav Mandi",
    cityState: "Lucknow, Uttar Pradesh",
    market: "Charbagh Market",
    priceDate: "30/07/2025",
    minPrice: "850 Rs/Quintal",
    maxPrice: "1100 Rs/Quintal",
    image: "https://images.unsplash.com/photo-1638901592594-04adaef61b80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fENhdWxpZmxvd2VyfGVufDB8fDB8fHww"
  },
  {
    key: "11",
    productName: "Brinjal Bhav Mandi",
    cityState: "Hyderabad, Telangana",
    market: "Monda Market",
    priceDate: "30/07/2025",
    minPrice: "700 Rs/Quintal",
    maxPrice: "950 Rs/Quintal",
    image: "https://images.unsplash.com/photo-1613881553903-4543f5f2cac9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fEJyaW5qYWx8ZW58MHx8MHx8fDA%3D"
  },
  {
    key: "12",
    productName: "Lady Finger Bhav Mandi",
    cityState: "Chandigarh",
    market: "Sector 26 Mandi",
    priceDate: "30/07/2025",
    minPrice: "750 Rs/Quintal",
    maxPrice: "970 Rs/Quintal",
    image: "https://images.unsplash.com/photo-1664289242854-e99d345cfa92?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGFkeSUyMEZpbmdlcnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    key: "13",
    productName: "Bottle Gourd Bhav Mandi",
    cityState: "Varanasi, Uttar Pradesh",
    market: "Manduadih Market",
    priceDate: "30/07/2025",
    minPrice: "720 Rs/Quintal",
    maxPrice: "980 Rs/Quintal",
    image: "https://images.pexels.com/photos/12416149/pexels-photo-12416149.jpeg"
  },
  {
    key: "14",
    productName: "Garlic Bhav Mandi",
    cityState: "Patna Bihar",
    market: "Ujjain",
    priceDate: "02/05/2025",
    minPrice: "500 Rs/Quintal",
    maxPrice: "8000 Rs/Quintal",
    image: "https://images.unsplash.com/photo-1654727433983-1b72489e291e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fCdHYXJsaWMlMjBmZWlsZHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    key: "17",
    productName: "Tamarind Fruit Bhav Mandi",
    cityState: "Patna Bihar",
    market: "Unhel",
    priceDate: "02/05/2025",
    minPrice: "4362 Rs/Quintal",
    maxPrice: "5175 Rs/Quintal",
    image: "https://images.unsplash.com/photo-1677938578361-3398b297ea7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VGFtYXJpbmR8ZW58MHx8MHx8fDA%3D"
  },
  {
    key: "19",
    productName: "Rice Bhav Mandi",
    cityState: "Kolkata, West Bengal",
    market: "New Town Market",
    priceDate: "30/07/2025",
    minPrice: "1800 Rs/Quintal",
    maxPrice: "2400 Rs/Quintal",
    image: "https://images.unsplash.com/photo-1592997572594-34be01bc36c7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    key: "20",
    productName: "Maize Bhav Mandi",
    cityState: "Pune, Maharashtra",
    market: "Shivaji Nagar Mandi",
    priceDate: "30/07/2025",
    minPrice: "1350 Rs/Quintal",
    maxPrice: "1620 Rs/Quintal",
    image: "https://plus.unsplash.com/premium_photo-1675727577107-2e1311b5a9b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8TWFpemUlMjAoQ29ybil8ZW58MHx8MHx8fDA%3D"
  },
  {
    key: "21",
    productName: "Barley Bhav Mandi",
    cityState: "Jaipur, Rajasthan",
    market: "Badi Chaupar Market",
    priceDate: "30/07/2025",
    minPrice: "1480 Rs/Quintal",
    maxPrice: "1700 Rs/Quintal",
    image: "https://images.unsplash.com/photo-1529707481702-65fc20926103?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmFybGV5JTIwQmhhdiUyME1hbmRpfGVufDB8fDB8fHww"
  },
  {
    key: "22",
    productName: "Bajra Bhav Mandi",
    cityState: "Ahmedabad, Gujarat",
    market: "Manek Chowk",
    priceDate: "30/07/2025",
    minPrice: "1200 Rs/Quintal",
    maxPrice: "1450 Rs/Quintal",
    image: "https://media.istockphoto.com/id/2212889186/photo/it-is-widely-consumed-crop-ripped-bajra-pearl-in-the-field-crop-of-pearl-millet-pear-millet.jpg?b=1&s=612x612&w=0&k=20&c=lU4jqGLbct5wH87YvfqTt21ITZCwEnRSrgwh6DTFSqg="
  },
  {
    key: "23",
    productName: "Jowar Bhav Mandi",
    cityState: "Nagpur, Maharashtra",
    market: "Kalamna Mandi",
    priceDate: "30/07/2025",
    minPrice: "1250 Rs/Quintal",
    maxPrice: "1550 Rs/Quintal",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Sorghum_bicolor03.jpg/800px-Sorghum_bicolor03.jpg"
  },
  {
    key: "24",
    productName: "Cotton Bhav Mandi",
    cityState: "Warangal, Telangana",
    market: "Agricultural Market",
    priceDate: "30/07/2025",
    minPrice: "5100 Rs/Quintal",
    maxPrice: "6200 Rs/Quintal",
    image: "https://images.unsplash.com/photo-1502395809857-fd80069897d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q290dG9uJTIwZmllbGR8ZW58MHx8MHx8fDA%3D"
  },
  {
    key: "25",
    productName: "Afeem Bhav Mandi",
    cityState: "Bhopal, Madhya Pradesh",
    market: "Itwara Market",
    priceDate: "30/07/2025",
    minPrice: "60000 Rs/Kilo",
    maxPrice: "120000 Rs/Kilo",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/USMC-120418-M-7721G-041.jpg/1280px-USMC-120418-M-7721G-041.jpg"
  },
  {
    key: "26",
    productName: "Groundnut Bhav Mandi",
    cityState: "Junagadh, Gujarat",
    market: "APMC Yard",
    priceDate: "30/07/2025",
    minPrice: "4500 Rs/Quintal",
    maxPrice: "5300 Rs/Quintal",
    image: "https://as1.ftcdn.net/v2/jpg/08/57/41/76/1000_F_857417663_qcBcPTvQu7744lb6ARy6fYpCLf63FQrE.jpg"
  },
  {
    key: "27",
    productName: "Mustard Bhav Mandi",
    cityState: "Alwar, Rajasthan",
    market: "Krishi Mandi",
    priceDate: "30/07/2025",
    minPrice: "4900 Rs/Quintal",
    maxPrice: "5800 Rs/Quintal",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Mustard_plant_flower.jpg"
  },
  {
    key: "28",
    productName: "Gram Bhav Mandi",
    cityState: "Gwalior, Madhya Pradesh",
    market: "Kampani Bagh Market",
    priceDate: "30/07/2025",
    minPrice: "4600 Rs/Quintal",
    maxPrice: "5100 Rs/Quintal",
    image: "https://www.agrifarming.in/wp-content/uploads/Guide-to-Chickpea-Bengal-GramChana-Farming-2.jpg"
  },
  {
    key: "29",
    productName: "Lentil(Masoor) Bhav Mandi",
    cityState: "Raipur, Chhattisgarh",
    market: "Pandri Market",
    priceDate: "30/07/2025",
    minPrice: "4800 Rs/Quintal",
    maxPrice: "5400 Rs/Quintal",
    image: "https://villagevasi.com/wp-content/uploads/2021/11/WhatsApp-Image-2021-11-19-at-1.27.11-AM.jpeg"
  },
  {
    key: "30",
    productName: "Urad Bhav Mandi",
    cityState: "Kanpur, Uttar Pradesh",
    market: "Kidwai Nagar Mandi",
    priceDate: "30/07/2025",
    minPrice: "3000 Rs/Quintal",
    maxPrice: "3800 Rs/Quintal",
    image: "https://media.istockphoto.com/id/2222492381/photo/split-white-urad-lentils.jpg?b=1&s=612x612&w=0&k=20&c=QN54mVZ4Id5ncxjxIwobFuaXk1h16XVVCGu9XGUjPQ0="
  },
  {
    key: "31",
    productName: "Sugarcane Bhav Mandi",
    cityState: "Meerut, Uttar Pradesh",
    market: "Kisan Mandi",
    priceDate: "30/07/2025",
    minPrice: "280 Rs/Quintal",
    maxPrice: "340 Rs/Quintal",
    image: "https://plus.unsplash.com/premium_photo-1664116928635-83695cb3da3c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8U3VnYXJjYW5lJTIwZmllbGR8ZW58MHx8MHx8fDA%3D"
  },
  {
    key: "34",
    productName: "Tomato Bhav Mandi",
    cityState: "Bangalore, Karnataka",
    market: "Yeshwanthpur Market",
    priceDate: "30/07/2025",
    minPrice: "800 Rs/Quintal",
    maxPrice: "1100 Rs/Quintal",
    image: "https://plus.unsplash.com/premium_photo-1661847658902-070d6f09464d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8VG9tYXRvJTIwZmllbGR8ZW58MHx8MHx8fDA%3D"
  },
  {
    key: "35",
    productName: "Cucumber Bhav Mandi",
    cityState: "Surat, Gujarat",
    market: "Udhna Mandi",
    priceDate: "30/07/2025",
    minPrice: "850 Rs/Quintal",
    maxPrice: "1050 Rs/Quintal",
    image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q3VjdW1iZXJ8ZW58MHx8MHx8fDA%3D"
  }
  
  // ...repeat for all items, adding the correct image path or a default image...
  // The rest of your data already has images, so no change needed.
];

// Card component with image
const MandiCard = ({ data }) => (
  <div className="w-full md:w-1/2 lg:w-1/3 p-2">
    <div className="bg-gray-100 p-4 rounded-lg shadow-md transition-shadow hover:shadow-xl">
      <div className="w-full h-40 flex items-center justify-center mb-4 overflow-hidden rounded-lg bg-white">
        <img
          src={data.image || "/assets/crops/default.jpg"}
          alt={data.productName}
          className="object-contain h-full max-w-full transition-transform duration-300 hover:scale-105"
        />
      </div>
      <h5 className="font-bold text-lg mb-2">{data.productName}</h5>
      <div className="flex flex-wrap justify-between">
        <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
          <p className="text-sm my-0 font-bold text-gray-500">City, State</p>
          <h6 className="font-bold text-base">{data.cityState}</h6>
          <p className="text-sm my-0 font-bold text-gray-500 mt-2">Market :</p>
          <h6 className="font-bold text-base">{data.market}</h6>
          <p className="text-sm my-0 font-bold text-gray-500 mt-2">Price date :</p>
          <h6 className="font-bold text-base">{data.priceDate}</h6>
        </div>
        <div className="w-full sm:w-1/2 flex flex-col items-end justify-end">
          <div className="flex justify-end my-2">
            <button className="px-3 py-1 bg-white rounded-lg shadow-sm text-sm font-medium">
              <span className="font-bold text-gray-700">Min Price :</span> {data.minPrice}
            </button>
          </div>
          <div className="flex justify-end">
            <button className="rounded-lg text-white px-3 py-1 bg-green-500 hover:bg-green-600 transition-colors text-sm font-medium shadow-md">
              <span className="font-bold">Max Price :</span> {data.maxPrice}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MandiListPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Live Mandi Prices in Patna, Bihar</h1>
        <div className="flex flex-wrap -mx-2">
          {mandiData.map(item => (
            <MandiCard key={item.key} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MandiListPage;