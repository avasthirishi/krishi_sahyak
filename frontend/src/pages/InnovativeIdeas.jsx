
import React, { useState } from 'react'; // Import useState hook
const innovativeIdeas = [
    {
      id: 1,
      title: "Vertical Farming / Hydroponics in Urban & Peri-Urban Areas",
      description: "Grow high-value crops like leafy greens, herbs, and exotic vegetables (e.g., cherry tomatoes, bell peppers) in multi-layered indoor setups. This caters to fresh, local demand, minimizes land use, and allows year-round production regardless of climate. Requires significant initial investment but offers high returns.",
      keywords: ["Hydroponics", "Aeroponics", "Urban Farming", "High-Value Crops", "Controlled Environment Agriculture"],
      estimatedInvestment: "High",
      marketDemand: "Growing (Urban Consumers, Restaurants)",
      imageUrl: "https://images.unsplash.com/photo-1524486361537-8ad15938e1a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fFZlcnRpY2FsJTIwRmFybWluZyUyMCUyRiUyMEh5ZHJvcG9uaWNzJTIwaW4lMjBVcmJhbiUyMCUyNiUyMFBlcmklMjBVcmJhbiUyMEFyZWFzfGVufDB8fDB8fHww"
    },
    {
      id: 2,
      title: "Specialty Mushroom Cultivation (Oyster, Shiitake, Reishi)",
      description: "Cultivate gourmet and medicinal mushrooms which have a strong demand in urban markets, hotels, and for export. Mushrooms have a short cultivation cycle and require less space. Requires controlled temperature and humidity, but can yield significant profits per square foot.",
      keywords: ["Mushroom Farming", "Gourmet Mushrooms", "Medicinal Fungi", "Controlled Environment"],
      estimatedInvestment: "Medium",
      marketDemand: "Niche, but Rapidly Growing",
      imageUrl: "https://images.unsplash.com/photo-1634549666877-f39fed4e8fa0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3BlY2lhbHR5JTIwTXVzaHJvb20lMjBDdWx0aXZhdGlvbiUyMChPeXN0ZXIlMkMlMjBTaGlpdGFrZSUyQyUyMFJlaXNoaSl8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 3,
      title: "Dairy Farming with Value-Added Products",
      description: "Beyond just selling milk, focus on producing value-added dairy products like paneer, ghee, curd, lassi, or flavored milk. This significantly increases profit margins. Requires investment in processing equipment and marketing.",
      keywords: ["Dairy Processing", "Milk Products", "Value Addition", "Cattle Rearing"],
      estimatedInvestment: "Medium to High",
      marketDemand: "Consistent & Diversified",
      imageUrl: "https://plus.unsplash.com/premium_photo-1695028377588-4c496ed315ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fERhaXJ5JTIwRmFybWluZyUyMHdpdGglMjBWYWx1ZSUyMEFkZGVkJTIwUHJvZHVjdHN8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 4,
      title: "Agri-Tourism / Farm Stays",
      description: "Convert a portion of your farm into an agri-tourism destination. Offer farm tours, hands-on farming experiences, rural living experiences, and sell farm-fresh produce directly. This provides an additional revenue stream, promotes rural development, and educates urban populations about agriculture.",
      keywords: ["Rural Tourism", "Farm Experience", "Homestays", "Direct Sales"],
      estimatedInvestment: "Medium",
      marketDemand: "Emerging (Post-COVID, Experiential Travel)",
      imageUrl: "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fEFncmklMjBUb3VyaXNtJTIwJTJGJTIwRmFybSUyMFN0YXlzfGVufDB8fDB8fHww"
    },
    {
      id: 5,
      title: "Organic Fodder Cultivation for Livestock",
      description: "With growing awareness of organic produce, there's a rising demand for organic milk and meat. This creates an an opportunity for farmers to specialize in cultivating organic fodder (e.g., multi-cut sorghum, napier grass, alfalfa) and supplying it to dairy and livestock farms.",
      keywords: ["Organic Feed", "Fodder Production", "Livestock Nutrition", "Sustainable Agriculture"],
      estimatedInvestment: "Low to Medium",
      marketDemand: "Growing (from Organic Livestock Farms)",
      imageUrl: "https://agrierp.com/blog/wp-content/uploads/2022/10/Growing-Fodder-Crops.jpg"
    },
    {
      id: 6,
      title: "Exotic Vegetable Farming (e.g., Broccoli, Asparagus, Zucchini)",
      description: "Cultivate high-value exotic vegetables that are gaining popularity in urban Indian kitchens and restaurants. These often fetch premium prices compared to traditional vegetables. Requires precise climate control or seasonal adaptation.",
      keywords: ["Exotic Vegetables", "High-Value Crops", "Direct Marketing", "Greenhouse Farming"],
      estimatedInvestment: "Medium",
      marketDemand: "Increasing (Urban, Hospitality)",
      imageUrl: "https://images.unsplash.com/photo-1489450278009-822e9be04dff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEV4b3RpYyUyMFZlZ2V0YWJsZSUyMEZhcm1pbmclMjAoZS5nLiUyQyUyMEJyb2Njb2xpJTJDJTIwQXNwYXJhZ3VzJTJDJTIwWnVjY2hpbmkpfGVufDB8fDB8fHww"
    },
    {
      id: 7,
      title: "High-Density Fish Farming (Biofloc/RAS)",
      description: "Implement advanced aquaculture techniques like Biofloc or Recirculating Aquaculture Systems (RAS) to maximize fish production in a small area with minimal water usage. This caters to the increasing demand for fresh fish in urban areas and offers high returns.",
      keywords: ["Aquaculture", "Fish Farming", "Biofloc", "RAS", "Intensive Farming"],
      estimatedInvestment: "High",
      marketDemand: "Growing (Urban Consumers, Restaurants)",
      imageUrl: "https://images.unsplash.com/photo-1442706722731-7284acc0a2d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGZpc2h8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 8,
      title: "Apiculture (Beekeeping for Honey & Pollination)",
      description: "Start a beekeeping venture focusing on honey production, beeswax, and providing pollination services to local farmers. Beekeeping is relatively low-investment and contributes to ecological balance and crop yield for others.",
      keywords: ["Beekeeping", "Apiculture", "Honey Production", "Pollination Services", "Sustainable Farming"],
      estimatedInvestment: "Low",
      marketDemand: "Consistent (Honey, Wax, Pollination)",
      imageUrl: "https://images.unsplash.com/photo-1586779161657-041097557546?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QXBpY3VsdHVyZSUyMChCZWVrZWVwaW5nJTIwZm9yJTIwSG9uZXklMjAlMjYlMjBQb2xsaW5hdGlvbil8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 9,
      title: "Medicinal & Aromatic Plant Cultivation",
      description: "Grow high-value medicinal plants (e.g., Ashwagandha, Aloe Vera, Stevia) or aromatic plants (e.g., Lemongrass, Mint) that have significant demand from pharmaceutical, cosmetic, and food industries. Requires specific climatic conditions and careful processing.",
      keywords: ["Medicinal Plants", "Aromatic Plants", "Herbal Farming", "Niche Crops", "Pharmaceutical Industry"],
      estimatedInvestment: "Medium",
      marketDemand: "Niche, but Very High Value",
      imageUrl: "https://images.unsplash.com/photo-1597235174291-1bf4e00849d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fE1lZGljaW5hbCUyMCUyNiUyMEFyb21hdGljJTIwUGxhbnQlMjBDdWx0aXZhdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 10,
      title: "Contract Farming & Direct-to-Consumer Models",
      description: "Engage in contract farming with food processing companies or organized retail for assured buy-back of produce. Alternatively, establish a direct-to-consumer model through online sales, farmers' markets, or community-supported agriculture (CSA) programs.",
      keywords: ["Contract Farming", "Direct Sales", "E-commerce", "CSA", "Market Linkage"],
      estimatedInvestment: "Low to Medium",
      marketDemand: "High (Assured Sales, Premium Pricing)",
      imageUrl: "https://images.unsplash.com/photo-1661621768955-8811c0392ef2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fENvbnRyYWN0JTIwRmFybWluZyUyMCUyNiUyMERpcmVjdCUyMHRvJTIwQ29uc3VtZXIlMjBNb2RlbHN8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 11,
      title: "Waste-to-Wealth: Biogas & Organic Manure Production",
      description: "Set up a unit to convert agricultural waste, animal dung, and organic residues into biogas (for energy) and high-quality organic manure (digestates). This circular economy model reduces waste, generates energy, and produces valuable organic inputs for farming.",
      keywords: ["Biogas", "Organic Manure", "Waste Management", "Circular Economy", "Renewable Energy"],
      estimatedInvestment: "Medium to High",
      marketDemand: "Growing (Sustainable Energy, Organic Farming)",
      imageUrl: "https://images.unsplash.com/photo-1649577193391-f13d769d011d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8V2FzdGUlMjB0byUyMFdlYWx0aCUzQSUyMEJpb2dhcyUyMCUyNiUyME9yZ2FuaWMlMjBNYW51cmUlMjBQcm9kdWN0aW9ufGVufDB8fDB8fHww"
    },
    {
      // New multi-purpose farm idea
      id: 12,
      title: "Integrated Multi-Layer Farming (Goat, Poultry, Fish)",
      description: "Establish a multi-tiered farming system for maximum land and resource utilization. The top layer houses goats, whose droppings provide nutrient-rich feed for chickens on the middle layer. The chicken waste, in turn, fertilizes ponds on the bottom layer for fish farming. This highly efficient, symbiotic system minimizes waste, reduces external feed costs, and generates diversified income streams from livestock and aquaculture.",
      keywords: ["Integrated Farming", "Multi-Layer Farming", "Goat Farming", "Poultry Farming", "Fish Farming", "Aquaculture", "Sustainable Agriculture", "Waste Management"],
      estimatedInvestment: "High",
      marketDemand: "Growing (Sustainable Produce, Diversified Income)",
      imageUrl: "https://discoveragriculture.com/wp-content/uploads/2023/09/Integrated-Goat-Fish-Farming-and-Integrated-Chicken-Fish-Farming.png"
    }
  ];

const InnovationIdea = () => {
  const [showQueryForm, setShowQueryForm] = useState(false);
  const [selectedIdeaForQuery, setSelectedIdeaForQuery] = useState(null);
  const [queryFormData, setQueryFormData] = useState({ name: "", email: "", queryText: "" });
  const [queryMessage, setQueryMessage] = useState("");

  const handleAskExpert = (idea) => {
    setSelectedIdeaForQuery(idea);
    setShowQueryForm(true);
    setQueryMessage("");
  };

  const handleQueryFormChange = (e) => {
    const { name, value } = e.target;
    setQueryFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    // Simulate query submission
    setTimeout(() => {
      setQueryMessage("Your query has been submitted successfully!");
      setQueryFormData({ name: "", email: "", queryText: "" });
      setShowQueryForm(false);
    }, 1000);
  };

  return (
    <div className="px-4 py-8">
      <section>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
          Innovative Farming Business Ideas for You
        </h2>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
          Explore promising new avenues in agriculture that can yield significant returns.
          Consider your local resources and market needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {innovativeIdeas.map((idea) => (
            <div key={idea.id} className="bg-gray-50 p-6 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-purple-100 flex flex-col">
              <img
                src={idea.imageUrl}
                alt={idea.title}
                className="w-full h-75 object-cover rounded-t-lg mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/400x250/cccccc/000000?text=${idea.title.replace(/\s/g, "+")}`;
                }}
              />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">{idea.title}</h3>
              <p className="text-gray-700 mb-3 flex-grow">{idea.description}</p>
              <div className="mb-3">
                <span className="font-semibold text-gray-800">Keywords:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {idea.keywords.map((kw, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700"><strong>Estimated Investment:</strong> {idea.estimatedInvestment}</p>
              <p className="text-gray-700"><strong>Market Demand:</strong> {idea.marketDemand}</p>
              <button
                onClick={() => handleAskExpert(idea)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              >
                Ask Expert for More Detail
              </button>
            </div>
          ))}
        </div>
      </section>

      {showQueryForm && selectedIdeaForQuery && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowQueryForm(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
              Ask Expert About: {selectedIdeaForQuery.title}
            </h2>
            <form onSubmit={handleQuerySubmit} className="space-y-4">
              <div>
                <label htmlFor="queryName" className="block text-gray-700 text-sm font-bold mb-2">Your Name:</label>
                <input
                  type="text"
                  id="queryName"
                  name="name"
                  value={queryFormData.name}
                  onChange={handleQueryFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>
              <div>
                <label htmlFor="queryEmail" className="block text-gray-700 text-sm font-bold mb-2">Your Email:</label>
                <input
                  type="email"
                  id="queryEmail"
                  name="email"
                  value={queryFormData.email}
                  onChange={handleQueryFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>
              <div>
                <label htmlFor="queryText" className="block text-gray-700 text-sm font-bold mb-2">Your Query:</label>
                <textarea
                  id="queryText"
                  name="queryText"
                  value={queryFormData.queryText}
                  onChange={handleQueryFormChange}
                  rows="5"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Submit Query
              </button>
              {queryMessage && (
                <p className={`text-center text-sm mt-3 ${queryMessage.includes("Failed") ? "text-red-500" : "text-green-600"}`}>
                  {queryMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InnovationIdea;