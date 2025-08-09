// src/pages/BusinessIdeasPage.jsx
import React, { useState } from 'react'; // Import useState hook

export default function BusinessIdeasPage() {
  // State for the query form visibility and data
  const [showQueryForm, setShowQueryForm] = useState(false);
  const [selectedIdeaForQuery, setSelectedIdeaForQuery] = useState(null);
  const [queryFormData, setQueryFormData] = useState({
    name: '',
    email: '',
    queryText: '',
  });
  const [queryMessage, setQueryMessage] = useState('');

  // Handler for opening the query form
  const handleAskExpert = (idea) => {
    setSelectedIdeaForQuery(idea);
    setShowQueryForm(true);
    setQueryMessage(''); // Clear previous messages
  };

  // Handler for changes in the query form inputs
  const handleQueryFormChange = (e) => {
    const { name, value } = e.target;
    setQueryFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler for submitting the query form
  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    setQueryMessage('Submitting your query...');

    // Basic validation
    if (!queryFormData.name || !queryFormData.email || !queryFormData.queryText) {
      setQueryMessage('Please fill in all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(queryFormData.email)) {
        setQueryMessage('Please enter a valid email address.');
        return;
    }

    try {
      console.log('Query submitted:', {
        idea: selectedIdeaForQuery.title,
        ...queryFormData,
      });

      // Simulate API call for submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      setQueryMessage('Your query has been submitted! An expert will contact you soon.');
      // Optionally clear form after successful submission
      setQueryFormData({
        name: '',
        email: '',
        queryText: '',
      });
      // Optionally close form after a delay
      setTimeout(() => setShowQueryForm(false), 3000);

    } catch (error) {
      console.error('Query submission failed:', error);
      setQueryMessage('Failed to submit query. Please try again.');
    }
  };

  const royalModels = [
    {
      id: 1,
      name: "Mr. Rajeev Kumar (Avocado Farming - Karnataka)",
      description: "Rajeev, a pioneering farmer from Karnataka, identified the burgeoning demand for avocados in India, a fruit largely imported. He meticulously studied their cultivation requirements and adapted techniques for the Indian climate. By leveraging drip irrigation and organic farming practices, his farm now produces high-quality avocados, supplying major urban markets and proving the viability of 'import substitution' in high-value horticulture. His success highlights the potential for new, high-profit crops.",
      image: "https://media.gettyimages.com/id/1144159484/photo/indian-farmer-at-field-stock-image.jpg?s=612x612&w=0&k=20&c=GYi4ePs3a_VxKnEaoq_6ssbVoC0jjQS7SzWk92jzBiA=", // Placeholder image
      businessType: "Exotic Fruit Cultivation (Import Substitution)",
      profitPotential: "Very High",
      keyLesson: "Identify niche markets and adapt cultivation for local conditions."
    },
    {
      id: 2,
      name: "Ms. Priyanka Devi (Dragon Fruit Cultivation - Rajasthan)",
      description: "Priyanka, a resilient farmer from a semi-arid region of Rajasthan, ventured into dragon fruit cultivation, a crop previously thought unsuitable for dry areas. Through innovative water management, proper soil amendment, and protective cultivation techniques, she established a thriving dragon fruit orchard. Her farm is now a hub for agro-tourism and a significant supplier, demonstrating how challenging conditions can be overcome with smart farming and high-demand produce.",
      image: "https://media.gettyimages.com/id/1220269117/photo/mature-woman-at-white-background-stock-images.jpg?s=612x612&w=0&k=20&c=3AKdg1M4J-kt0JJtqyfK2S1R4FTYCmtTSi_Z3BiqTT8=",
      businessType: "Exotic Fruit Cultivation (Adaptation)",
      profitPotential: "High",
      keyLesson: "Innovation and adaptability can turn challenges into opportunities."
    },
    {
      id: 3,
      name: "Mr. Suresh Yadav (Integrated Fish & Duck Farming - West Bengal)",
      description: "Suresh from West Bengal is a proponent of integrated farming. He implemented a system where ducks are raised on elevated platforms over fish ponds. The duck droppings fertilize the pond, promoting the growth of natural food for fish, while the ducks benefit from the aquatic environment. This synergistic approach maximizes resource utilization, reduces external inputs, and yields both fish and duck products, significantly boosting farm income and sustainability.",
      image: "https://media.gettyimages.com/id/1712850583/photo/portrait-of-mid-adult-indian-farmer-with-arms-crossed-in-agriculture-field.jpg?s=612x612&w=0&k=20&c=Apq7FjaZ3WsimbUXmQPymdZYb2s5aEq8GNPHejZ1Hy0=",
      businessType: "Integrated Aqua-Poultry Farming",
      profitPotential: "Medium to High",
      keyLesson: "Maximize resource efficiency through integrated farming systems."
    },
    {
      id: 4,
      name: "Mrs. Anjali Sharma (Organic Vermicompost & Bio-fertilizer - Maharashtra)",
      description: "Anjali started a small-scale vermicomposting unit using agricultural waste and cow dung. Her focus on producing high-quality, certified organic vermicompost and liquid bio-fertilizers quickly gained traction among local organic farmers and urban gardeners. Her business not only generates significant income but also contributes to sustainable agriculture by recycling waste and promoting chemical-free farming.",
      image: "https://media.gettyimages.com/id/1497546439/photo/young-smiling-brunette-woman-in-apron-with-digital-tablet-in-hands-working-in-greenhouse.jpg?s=612x612&w=0&k=20&c=_aqSCnzcR9rhrlDDjbBjBJB-sC2KilkjDSN4gCT3G6c=",
      businessType: "Organic Input Production",
      profitPotential: "Medium",
      keyLesson: "Value addition to farm waste creates profitable and sustainable ventures."
    },
    {
      id: 5,
      name: "Mr. Kishan Lal (Modern Goat Farming - Rajasthan)",
      description: "Kishan Lal transformed traditional goat rearing in Rajasthan by adopting modern scientific practices. He focused on superior breeds for milk and meat, implemented systematic vaccination, proper nutrition, and hygienic sheds. His farm now serves as a model for sustainable and profitable goat farming, demonstrating high returns from improved livestock management.",
      image: "https://media.gettyimages.com/id/930444732/photo/indian-man-stroking-small-goat.jpg?s=612x612&w=0&k=20&c=V9_PY5GsjSXbFkDHhtSMEhTAtY7mrmy8CkW2XQTry28=",
      businessType: "Modern Livestock Rearing (Goat)",
      profitPotential: "High",
      keyLesson: "Scientific livestock management leads to higher productivity and profits."
    },
    {
      id: 6,
      name: "Ms. Smita Patil (High-Value Dairy Products - Gujarat)",
      description: "Smita from Gujarat moved beyond just selling raw milk. She invested in small-scale processing to produce artisanal ghee, flavored yogurts, and traditional sweets like 'basundi' directly from her farm's milk. Her brand emphasizes purity and local flavors, fetching premium prices in nearby urban centers and through online sales, showcasing the power of value addition in dairy.",
      image: "https://media.gettyimages.com/id/1155210318/photo/woman-farming-in-agricultural-field.jpg?s=612x612&w=0&k=20&c=KRce86Xg08BeTz5T2gWBZNkL-kllAjQlh_FTEDkRmpQ=",
      businessType: "Dairy Value-Added Products",
      profitPotential: "Very High",
      keyLesson: "Innovate and process farm produce to tap into premium markets."
    },
    {
      id: 7,
      name: "Mr. Deepak Singh (Integrated Poultry & Organic Vegetables - Punjab)",
      description: "Deepak established an integrated farm in Punjab where poultry waste is composted and used to fertilize organic vegetable plots. This closed-loop system reduces dependency on external inputs, generates high-quality organic produce, and provides a dual income from eggs/chicken and chemical-free vegetables, highlighting a holistic approach to sustainable farming.",
      image: "https://media.gettyimages.com/id/1064031010/photo/indian-man-portrait-in-front-of-house.jpg?s=612x612&w=0&k=20&c=9jxtBQgc0ZEfKUJB5zVtxcERY02lOL5o_qa07qviZ5Q=",
      businessType: "Integrated Poultry & Organic Cropping",
      profitPotential: "Medium to High",
      keyLesson: "Integrated systems optimize resources and create diversified income streams."
    },
    {
      id: 8, // Existing Entry 1
      name: "Mr. Jaspreet Singh (Automated Dairy Farm - Punjab)",
      description: "Jaspreet transformed his family's traditional dairy farm in Punjab into a highly efficient, automated unit. By integrating milking machines, fodder choppers, and a robust cold chain, he increased milk production efficiency and quality, supplying a large cooperative. His success demonstrates how technology can scale traditional farming into a modern, highly profitable enterprise.",
      image: "https://media.gettyimages.com/id/927068438/photo/indian-farmer-in-turban.jpg?s=612x612&w=0&k=20&c=3rZz0TEkDIHYdkD-tRYwFLwZqgBXHFdg6cf4WG70xm4=",
      businessType: "Automated Dairy Farming",
      profitPotential: "Very High",
      keyLesson: "Leverage automation and modern infrastructure for scalability and efficiency."
    },
    {
      id: 9, // Updated entry from Mrs. Ritu Kumari to Mr. Anand Mishra
      name: "Mr. Anand Mishra (Litchi & Mango Farming - Bihar)",
      description: "Anand Mishra, a progressive farmer from Bihar, has successfully cultivated high-demand litchi and export-quality mango varieties. He employs advanced orchard management techniques, including drip irrigation and canopy management, ensuring superior fruit quality and higher yields. His strong direct market linkages and focus on premium varieties have allowed him to achieve significant profits and showcase Bihar's potential in high-value fruit exports.",
      image: "https://media.gettyimages.com/id/1481299261/photo/asia-man-raising-wooden-crate-orange-in-the-garden.jpg?s=612x612&w=0&k=20&c=gj0xzyvXVa2EQfxWNjomZy4I_71x2UBlqCOMcaZDpeM=", // Updated placeholder image
      businessType: "High-Value Fruit Orchard (Litchi & Mango)",
      profitPotential: "Very High",
      keyLesson: "Advanced orchard management and direct marketing unlock export potential."
    }
  ];


  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Profitable Agricultural Business Ideas</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
        Discover innovative and successful farming business models, inspired by real-life 'royal models' and new opportunities in the agricultural sector. Learn how to diversify your income and achieve higher profitability.
      </p>

      {/* Royal Models Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Inspiring Royal Models: Farmers Who Innovated</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {royalModels.map(model => (
            <div key={model.id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-green-100 flex flex-col items-center text-center">
              <img src={model.image} alt={model.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-300" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-1">{model.name}</h3>
              <p className="text-gray-700 mb-1"><strong>Business:</strong> {model.businessType}</p>
              <p className="text-gray-700 mb-3"><strong>Profit Potential:</strong> {model.profitPotential}</p>
              <p className="text-gray-800 text-base leading-relaxed flex-grow mb-4">{model.description}</p>
              <p className="text-gray-600 font-semibold italic mt-auto">Key Lesson: "{model.keyLesson}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
