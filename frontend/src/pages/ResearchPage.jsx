// src/pages/ResearchPage.jsx
import React, { useState, useEffect } from 'react';

export default function ResearchPage() {
  const [researchPapers, setResearchPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPaper, setSelectedPaper] = useState(null); // State for handling the detailed view of a selected paper

  useEffect(() => {
    const fetchResearchPapers = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        const dummyData = [
          {
            id: 1,
            title: "Sustainable Practices in Rice Cultivation for Increased Yield in Indian Context",
            author: "Dr. A. K. Sharma (ICAR)",
            journal: "Indian Journal of Agricultural Sciences",
            year: 2023,
            abstract: "This paper explores advanced sustainable practices, including SRI (System of Rice Intensification) and direct-seeded rice (DSR) techniques, adapted for diverse Indian agro-climatic zones. It analyzes their impact on water consumption, labor requirements, and overall yield, providing crucial insights for farmers aiming for higher efficiency and ecological balance.",
            fullContent: `
              <h1>Sustainable Practices in Rice Cultivation for Increased Yield in Indian Context</h1>
              <p><strong>Author:</strong> Dr. A. K. Sharma (ICAR)</p>
              <p><strong>Journal:</strong> Indian Journal of Agricultural Sciences</p>
              <p><strong>Year:</strong> 2023</p>
              <p class="text-xl font-bold mt-6 mb-3">Abstract:</p>
              <p class="mb-4">This paper explores advanced sustainable practices, including SRI (System of Rice Intensification) and direct-seeded rice (DSR) techniques, adapted for diverse Indian agro-climatic zones. It analyzes their impact on water consumption, labor requirements, and overall yield, providing crucial insights for farmers aiming for higher efficiency and ecological balance.</p>
              
              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">1. Introduction</h2>
              <p class="mb-4">Rice (Oryza sativa L.) is a staple food for more than half of the world's population, with India being the second-largest producer. Traditional rice cultivation methods are often water-intensive and labor-intensive, contributing significantly to greenhouse gas emissions. The growing concerns about water scarcity, climate change, and food security necessitate the adoption of more sustainable and resource-efficient practices in rice farming. This research aims to assess the efficacy of System of Rice Intensification (SRI) and Direct-Seeded Rice (DSR) methods in enhancing yield and resource efficiency across various agro-climatic regions of India.</p>
              
              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">2. Methodology</h2>
              <p class="mb-4">Field experiments were conducted over three cropping seasons (Kharif 2020-2022) at selected research stations representing diverse Indian agro-climatic zones, including humid, semi-arid, and sub-humid regions. Treatments included traditional transplanted rice (control), SRI, and DSR (wet and dry). Data on water input, labor hours, plant physiological parameters (tillering, leaf area index), yield components, and grain yield were collected and analyzed using a randomized block design with three replications.</p>
              
              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">3. Results and Discussion</h2>
              <p class="mb-4">The results consistently showed that both SRI and DSR methods led to significant reductions in water consumption (25-40% lower than traditional methods) and labor requirements (15-30% less, especially DSR). SRI demonstrated higher grain yields (10-20% increase) due to enhanced tillering and panicle fertility, while DSR provided comparable yields with substantial savings in labor. Soil health indicators, such as organic carbon content and microbial activity, also showed improvement under sustainable practices.</p>
              
              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">4. Conclusion</h2>
              <p class="mb-4">Sustainable practices like SRI and DSR offer viable and superior alternatives to conventional rice cultivation in India. Their adoption can lead to substantial savings in critical resources (water, labor) while enhancing or maintaining comparable yields, thereby contributing to food security and environmental sustainability. Policy support and farmer training programs are essential for widespread adoption of these beneficial techniques.</p>
              <p><strong>Keywords:</strong> Rice cultivation, SRI, DSR, Sustainable agriculture, Yield, Water use efficiency, India.</p>
            `,
          },
          {
            id: 2,
            title: "Impact of Climate Change on Indian Monsoon and Rabi Crop Production",
            author: "Prof. S. Dasgupta (IIT Delhi)",
            journal: "Environmental Agricultural Review (India)",
            year: 2022,
            abstract: "An in-depth analysis of recent climate patterns, including variations in monsoon onset and withdrawal, and their specific effects on major Rabi crops like wheat, mustard, and pulses across different regions of India. The study provides predictive models and adaptation strategies for farmers to mitigate risks.",
            fullContent: `
              <h1>Impact of Climate Change on Indian Monsoon and Rabi Crop Production</h1>
              <p><strong>Author:</strong> Prof. S. Dasgupta (IIT Delhi)</p>
              <p><strong>Journal:</strong> Environmental Agricultural Review (India)</p>
              <p><strong>Year:</strong> 2022</p>
              <p class="text-xl font-bold mt-6 mb-3">Abstract:</p>
              <p class="mb-4">An in-depth analysis of recent climate patterns, including variations in monsoon onset and withdrawal, and their specific effects on major Rabi crops like wheat, mustard, and pulses across different regions of India. The study provides predictive models and adaptation strategies for farmers to mitigate risks.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">1. Introduction</h2>
              <p class="mb-4">India's agricultural economy is heavily reliant on the monsoon, which dictates the success of both Kharif and Rabi crops. However, global climate change is increasingly impacting monsoon variability, leading to unpredictable rainfall patterns, extreme weather events, and changes in temperature regimes. These shifts pose significant threats to Rabi crop production, which is crucial for the nation's food security. This paper examines the observed and projected impacts of climate change on the Indian monsoon and its implications for key Rabi crops.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">2. Climate Change and Monsoon Dynamics</h2>
              <p class="mb-4">Analysis of historical meteorological data reveals a trend towards more erratic monsoon behavior, characterized by delayed onset, early withdrawal, and increased frequency of intense rainfall events interspersed with prolonged dry spells. These changes are attributed to warming Indian Ocean temperatures and shifts in global atmospheric circulation patterns. Predictive models suggest a continuation of these trends, with regional variations in rainfall and temperature extremes becoming more pronounced.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">3. Impacts on Rabi Crops</h2>
              <p class="mb-4">Rabi crops, primarily dependent on residual soil moisture from the monsoon and winter rainfall, are particularly vulnerable. Delayed or insufficient monsoon rains can lead to reduced sowing areas and lower yields for wheat, barley, and gram. Increased frequency of winter droughts or unseasonal heavy rains during critical growth stages can cause significant crop damage. Higher winter temperatures can also accelerate crop maturity, reducing the grain-filling period and impacting quality.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">4. Adaptation Strategies</h2>
              <p class="mb-4">To mitigate these risks, adaptation strategies are imperative. These include: (a) promoting drought-resistant and heat-tolerant crop varieties; (b) implementing efficient irrigation techniques like micro-irrigation; (c) adopting conservation agriculture practices to improve soil moisture retention; (d) developing robust early warning systems for weather extremes; and (e) diversifying cropping patterns to reduce reliance on single crops. Policy support for climate-resilient agriculture and farmer training are crucial for successful adaptation.</p>
              <p><strong>Keywords:</strong> Climate change, Indian monsoon, Rabi crops, Wheat, Adaptation strategies, Agricultural risk.</p>
            `,
          },
          {
            id: 3,
            title: "Integrated Pest Management Strategies for Major Vegetable Crops in Maharashtra",
            author: "Dr. R. Singh (MAU, Parbhani)",
            journal: "Journal of Plant Protection & Horticulture",
            year: 2021,
            abstract: "Discusses effective and eco-friendly methods for pest control in common Indian vegetable crops such as tomatoes, chilies, and brinjals, focusing on biological controls, cultural practices, and judicious use of pesticides to reduce chemical load and improve produce quality.",
            fullContent: `
              <h1>Integrated Pest Management Strategies for Major Vegetable Crops in Maharashtra</h1>
              <p><strong>Author:</strong> Dr. R. Singh (MAU, Parbhani)</p>
              <p><strong>Journal:</strong> Journal of Plant Protection & Horticulture</p>
              <p><strong>Year:</strong> 2021</p>
              <p class="text-xl font-bold mt-6 mb-3">Abstract:</p>
              <p class="mb-4">Discusses effective and eco-friendly methods for pest control in common Indian vegetable crops such as tomatoes, chilies, and brinjals, focusing on biological controls, cultural practices, and judicious use of pesticides to reduce chemical load and improve produce quality.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">1. Introduction</h2>
              <p class="mb-4">Vegetable cultivation is a significant component of Maharashtra's agricultural economy, providing livelihoods to numerous farmers. However, these crops are highly susceptible to various insect pests and diseases, leading to substantial yield losses. Traditional reliance on chemical pesticides often results in environmental degradation, health hazards, and development of pest resistance. Integrated Pest Management (IPM) offers a holistic and sustainable approach to pest control by combining multiple strategies.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">2. Principles of IPM</h2>
              <p class="mb-4">IPM emphasizes prevention, monitoring, and intervention only when necessary, using a combination of cultural, biological, physical, and chemical methods. Key components include: (a) regular scouting for pests and natural enemies; (b) setting economic thresholds for intervention; (c) promoting beneficial insects; (d) using pest-resistant varieties; (e) adopting proper sanitation and crop rotation; and (f) judiciously applying selective and less toxic pesticides as a last resort.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">3. IPM Strategies for Specific Crops</h2>
              <p class="mb-4"><strong>Tomatoes:</strong> Management of fruit borers involves pheromone traps for monitoring, release of Trichogramma parasitoids, and use of botanical insecticides. For leaf curl virus, control of whiteflies is crucial. <br/><strong>Chilies:</strong> Thrips and mites are major pests. Strategies include sticky traps, border cropping with marigolds, and targeted application of acaricides. <br/><strong>Brinjals:</strong> Shoot and fruit borers are prevalent. Pheromone traps, hand-picking of infested shoots, and use of resistant varieties are effective.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">4. Conclusion</h2>
              <p class="mb-4">The adoption of IPM strategies in Maharashtra's vegetable cultivation can significantly reduce pest damage, minimize reliance on chemical pesticides, improve environmental health, and ensure the production of safer, higher-quality produce. Farmer education and community-level implementation are vital for the success of these programs.</p>
              <p><strong>Keywords:</strong> Integrated Pest Management, Vegetable crops, Maharashtra, Biological control, Pest resistance, Sustainable agriculture.</p>
            `,
          },
          {
            id: 4,
            title: "Optimizing Fertilizer Use for Wheat in North Indian Plains: A Soil-Specific Approach",
            author: "Dr. K. V. Prasad (PAU, Ludhiana)",
            journal: "Agronomy Today (Indian Edition)",
            year: 2023,
            abstract: "Research on soil-specific fertilizer application strategies for maximizing wheat yield and nutrient use efficiency in the Indo-Gangetic plains. The paper emphasizes the importance of soil testing and balanced fertilization for sustainable productivity.",
            fullContent: `
              <h1>Optimizing Fertilizer Use for Wheat in North Indian Plains: A Soil-Specific Approach</h1>
              <p><strong>Author:</strong> Dr. K. V. Prasad (PAU, Ludhiana)</p>
              <p><strong>Journal:</strong> Agronomy Today (Indian Edition)</p>
              <p><strong>Year:</strong> 2023</p>
              <p class="text-xl font-bold mt-6 mb-3">Abstract:</p>
              <p class="mb-4">Research on soil-specific fertilizer application strategies for maximizing wheat yield and nutrient use efficiency in the Indo-Gangetic plains. The paper emphasizes the importance of soil testing and balanced fertilization for sustainable productivity.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">1. Introduction</h2>
              <p class="mb-4">Wheat is a cornerstone of food security in North India, cultivated extensively across the Indo-Gangetic Plains (IGP). While fertilizer application is crucial for high yields, imbalanced and excessive use can lead to nutrient imbalances, soil degradation, and environmental pollution. Optimizing fertilizer use based on specific soil nutrient status is key to achieving sustainable wheat production while improving economic returns for farmers.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">2. Significance of Soil Testing</h2>
              <p class="mb-4">Soil testing provides a comprehensive assessment of nutrient deficiencies or excesses, allowing for precise fertilizer recommendations. Traditional blanket recommendations often lead to over-application of some nutrients and under-application of others. This study emphasizes the role of regular soil testing in tailoring nutrient application rates to the actual needs of the soil and crop, ensuring efficient nutrient uptake and minimizing waste.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">3. Balanced Fertilization Strategies</h2>
              <p class="mb-4">The research highlights the importance of balanced application of macro (Nitrogen, Phosphorus, Potassium) and micronutrients (Zinc, Iron, Manganese, Boron) for optimal wheat growth. Field trials demonstrated that applying nutrients based on soil test reports, rather than standard practices, resulted in significant increases in grain yield (5-15%) and improved nutrient use efficiency (10-20%). Site-specific nutrient management also reduced the overall fertilizer cost for farmers.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">4. Conclusion</h2>
              <p class="mb-4">A soil-specific approach to fertilizer management is highly effective in optimizing wheat production in the North Indian Plains. By integrating soil testing with balanced fertilization, farmers can achieve higher yields, reduce input costs, and promote healthier soils. This strategy is vital for sustainable intensification of wheat cultivation in the region.</p>
              <p><strong>Keywords:</strong> Wheat, Fertilizer use efficiency, Soil testing, Balanced fertilization, Indo-Gangetic Plains, Nutrient management.</p>
            `,
          },
          {
            id: 5,
            title: "Innovations in Dairy Farming Technology: A Case Study of Gujarat Cooperatives",
            author: "Dr. P. Kumar (NDDB)",
            journal: "Livestock Management Review (India)",
            year: 2022,
            abstract: "Examines the adoption of modern technologies such as automated milking systems, feed management software, and health monitoring devices in large-scale dairy farms within Gujarat's cooperative model. It highlights the benefits in terms of increased milk production, improved animal health, and profitability.",
            fullContent: `
              <h1>Innovations in Dairy Farming Technology: A Case Study of Gujarat Cooperatives</h1>
              <p><strong>Author:</strong> Dr. P. Kumar (NDDB)</p>
              <p><strong>Journal:</strong> Livestock Management Review (India)</p>
              <p><strong>Year:</strong> 2022</p>
              <p class="text-xl font-bold mt-6 mb-3">Abstract:</p>
              <p class="mb-4">Examines the adoption of modern technologies such as automated milking systems, feed management software, and health monitoring devices in large-scale dairy farms within Gujarat's cooperative model. It highlights the benefits in terms of increased milk production, improved animal health, and profitability.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">1. Introduction</h2>
              <p class="mb-4">Gujarat's dairy cooperative model, epitomized by Amul, has been a beacon of success in India's agricultural sector. Driven by the need for increased efficiency, productivity, and profitability, these cooperatives are increasingly adopting advanced technologies. This case study explores the specific technological innovations implemented in selected large-scale dairy farms under the Gujarat cooperative framework and their impact on various aspects of dairy management.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">2. Technological Interventions</h2>
              <p class="mb-4">The study identified several key technological interventions: <br/>(a) <strong>Automated Milking Systems:</strong> Installation of robotic or semi-automated milking parlors has reduced labor dependency, improved milking hygiene, and optimized milking frequency, leading to increased milk yield per animal. <br/>(b) <strong>Feed Management Software:</strong> Computerized systems for feed formulation and delivery ensure balanced nutrition for dairy animals, minimizing feed wastage and improving feed conversion efficiency. <br/>(c) <strong>Animal Health Monitoring Devices:</strong> Wearable sensors and IoT devices are used for real-time monitoring of animal health parameters (e.g., body temperature, activity levels), enabling early detection of diseases and estrus, thereby reducing treatment costs and improving reproductive efficiency. <br/>(d) <strong>Cold Chain Integration:</strong> Advanced chilling and transport systems maintain milk quality from farm to processing unit.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">3. Impact and Benefits</h2>
              <p class="mb-4">The adoption of these technologies has resulted in significant benefits: (a) Average milk yield per animal increased by 15-25%; (b) Reduced incidence of mastitis and other common diseases; (c) Lower labor costs and improved operational efficiency; (d) Enhanced milk quality and safety standards; and (e) Higher profitability for dairy farmers. The cooperative structure facilitated collective investment and training for technology adoption.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">4. Conclusion</h2>
              <p class="mb-4">The Gujarat dairy cooperatives serve as a prime example of how technological innovations can revolutionize traditional farming practices. The successful integration of automated milking, intelligent feed management, and health monitoring systems has not only boosted productivity and profitability but also ensured sustainability and competitiveness in the dairy sector. Replicating this model in other regions could significantly benefit India's livestock economy.</p>
              <p><strong>Keywords:</strong> Dairy farming, Technology, Gujarat, Cooperatives, Automated milking, Animal health, Profitability.</p>
            `,
          },
          {
            id: 6,
            title: "Precision Agriculture for Sugarcane Cultivation in Uttar Pradesh",
            author: "Dr. L. M. Gupta (IISR, Lucknow)",
            journal: "Sugarcane Research & Development",
            year: 2024,
            abstract: "Investigates the application of precision agriculture techniques, including remote sensing, GPS-guided machinery, and variable rate fertilization, to improve efficiency and productivity in sugarcane farming in Uttar Pradesh.",
            fullContent: `
              <h1>Precision Agriculture for Sugarcane Cultivation in Uttar Pradesh</h1>
              <p><strong>Author:</strong> Dr. L. M. Gupta (IISR, Lucknow)</p>
              <p><strong>Journal:</strong> Sugarcane Research & Development</p>
              <p><strong>Year:</strong> 2024</p>
              <p class="text-xl font-bold mt-6 mb-3">Abstract:</p>
              <p class="mb-4">Investigates the application of precision agriculture techniques, including remote sensing, GPS-guided machinery, and variable rate fertilization, to improve efficiency and productivity in sugarcane farming in Uttar Pradesh.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">1. Introduction</h2>
              <p class="mb-4">Sugarcane is a vital cash crop in Uttar Pradesh (UP), supporting a large agro-industry. However, traditional cultivation methods often lead to inefficient resource use (water, fertilizers) and environmental concerns. Precision agriculture (PA), leveraging modern technologies, offers a promising pathway to enhance productivity, reduce input costs, and ensure environmental sustainability in sugarcane farming. This study assesses the applicability and benefits of various PA tools in UP's sugarcane belt.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">2. Components of Precision Agriculture in Sugarcane</h2>
              <p class="mb-4">The research focused on integrating several PA components: <br/>(a) <strong>Remote Sensing and GIS:</strong> Satellite imagery and drone-based data were used for mapping field variability, assessing crop health, and identifying stress areas. <br/>(b) <strong>GPS-Guided Machinery:</strong> Precision planters and harvesters equipped with GPS ensured accurate seed placement and reduced fuel consumption. <br/>(c) <strong>Variable Rate Fertilization:</strong> Soil nutrient maps, derived from soil testing and remote sensing, guided the application of fertilizers only where needed, optimizing nutrient use efficiency. <br/>(d) <strong>Precision Irrigation:</strong> Sensors monitored soil moisture levels to trigger irrigation only when required, conserving water.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">3. Field Trial Results</h2>
              <p class="mb-4">Field trials conducted across different sugarcane farms in UP showed that PA implementation led to: (a) 10-18% reduction in fertilizer consumption; (b) 20-30% saving in irrigation water; (c) 5-10% increase in sugarcane yield; and (d) improved sugar recovery. The economic analysis indicated a favorable cost-benefit ratio, making PA a lucrative option for progressive sugarcane farmers.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">4. Conclusion</h2>
              <p class="mb-4">Precision agriculture holds immense potential for transforming sugarcane cultivation in Uttar Pradesh. By enabling site-specific management, PA tools contribute to higher resource efficiency, increased productivity, and reduced environmental footprint. Promoting awareness, providing training, and offering financial incentives will be crucial for wider adoption among farmers.</p>
              <p><strong>Keywords:</strong> Precision agriculture, Sugarcane, Uttar Pradesh, Remote sensing, GPS, Variable rate fertilization, Resource efficiency.</p>
            `,
          },
          {
            id: 7,
            title: "Post-Harvest Management of Horticultural Crops to Reduce Wastage in India",
            author: "Dr. V. Rao (IIHR, Bengaluru)",
            journal: "Food Science and Post-Harvest Technology",
            year: 2023,
            abstract: "Addresses the significant post-harvest losses in fruits and vegetables in India and proposes effective strategies for cold chain management, improved packaging, and value addition to minimize wastage and enhance farmer income.",
            fullContent: `
              <h1>Post-Harvest Management of Horticultural Crops to Reduce Wastage in India</h1>
              <p><strong>Author:</strong> Dr. V. Rao (IIHR, Bengaluru)</p>
              <p><strong>Journal:</strong> Food Science and Post-Harvest Technology</p>
              <p><strong>Year:</strong> 2023</p>
              <p class="text-xl font-bold mt-6 mb-3">Abstract:</p>
              <p class="mb-4">Addresses the significant post-harvest losses in fruits and vegetables in India and proposes effective strategies for cold chain management, improved packaging, and value addition to minimize wastage and enhance farmer income.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">1. Introduction</h2>
              <p class="mb-4">India is one of the largest producers of fruits and vegetables globally, yet a substantial portion (estimated 15-30%) is lost due to inefficient post-harvest management. These losses translate into significant economic setbacks for farmers and contribute to food insecurity. Effective post-harvest practices are crucial to reduce wastage, maintain quality, and ensure better market access and remuneration for growers.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">2. Causes of Post-Harvest Losses</h2>
              <p class="mb-4">The primary causes of post-harvest losses include: (a) improper harvesting techniques; (b) inadequate on-farm handling and sorting; (c) lack of proper storage facilities, especially cold storage; (d) inefficient transportation leading to damage; (e) poor packaging; and (f) limited processing and value addition infrastructure. Microbial spoilage and physiological deterioration are also major factors.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">3. Strategies for Reduction</h2>
              <p class="mb-4">This paper outlines several key strategies: <br/>(a) <strong>Improved Harvesting and Handling:</strong> Training farmers on gentle harvesting, immediate pre-cooling, and careful sorting. <br/>(b) <strong>Cold Chain Development:</strong> Investing in cold storage facilities at farm-gate, pack-houses, and transportation. <br/>(c) <strong>Advanced Packaging:</strong> Using breathable, sturdy, and consumer-friendly packaging materials. <br/>(d) <strong>Value Addition:</strong> Promoting small and medium-scale processing units for converting surplus or substandard produce into marketable products (juices, jams, dried fruits, pickles). <br/>(e) <strong>Market Linkages:</strong> Direct market access and efficient logistics to reduce transit time.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">4. Conclusion</h2>
              <p class="mb-4">Minimizing post-harvest losses in horticultural crops is critical for enhancing food security, farmer income, and agricultural sustainability in India. A multi-pronged approach involving technological adoption, infrastructure development, capacity building for farmers, and policy support for integrated cold chain and processing facilities is essential to achieve significant reductions in wastage.</p>
              <p><strong>Keywords:</strong> Post-harvest management, Horticultural crops, Food wastage, Cold chain, Value addition, India.</p>
            `,
          },
          {
            id: 8,
            title: "Water Conservation Techniques for Arid and Semi-Arid Regions in Rajasthan",
            author: "Dr. P. K. Verma (CAZRI, Jodhpur)",
            journal: "Journal of Arid Land Agriculture",
            year: 2024,
            abstract: "This research details innovative and traditional water conservation methods, such as drip irrigation, rainwater harvesting, and efficient micro-irrigation systems, specifically tailored for the water-stressed arid and semi-arid regions of Rajasthan. It evaluates their effectiveness in improving crop resilience and productivity.",
            fullContent: `
              <h1>Water Conservation Techniques for Arid and Semi-Arid Regions in Rajasthan</h1>
              <p><strong>Author:</strong> Dr. P. K. Verma (CAZRI, Jodhpur)</p>
              <p><strong>Journal:</strong> Journal of Arid Land Agriculture</p>
              <p><strong>Year:</strong> 2024</p>
              <p class="text-xl font-bold mt-6 mb-3">Abstract:</p>
              <p class="mb-4">This research details innovative and traditional water conservation methods, such as drip irrigation, rainwater harvesting, and efficient micro-irrigation systems, specifically tailored for the water-stressed arid and semi-arid regions of Rajasthan. It evaluates their effectiveness in improving crop resilience and productivity.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">1. Introduction</h2>
              <p class="mb-4">Rajasthan, with its vast arid and semi-arid regions, faces severe water scarcity, posing a significant challenge to agricultural sustainability and rural livelihoods. Traditional water management practices are often insufficient to meet the demands of a growing population and changing climate patterns. This paper investigates a range of water conservation techniques, both modern and indigenous, that are suitable for adoption in Rajasthan to enhance water use efficiency and improve crop productivity.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">2. Modern Water Conservation Methods</h2>
              <p class="mb-4">The study evaluates the impact of advanced irrigation systems: <br/>(a) <strong>Drip Irrigation:</strong> Highly efficient system delivering water directly to the plant roots, minimizing evaporation and runoff. Field trials showed significant water savings (30-50%) and improved yields for various horticultural crops. <br/>(b) <strong>Sprinkler Irrigation:</strong> Suitable for larger areas, reducing water usage compared to flood irrigation. <br/>(c) <strong>Micro-irrigation (MI):</strong> A broader term encompassing drip and micro-sprinklers, proven effective in conserving water for diverse crops in sandy soils.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">3. Traditional and Community-Based Approaches</h2>
              <p class="mb-4">Revival and integration of traditional water harvesting structures (e.g., 'Johads', 'Talabs') and improved watershed management practices are crucial. Community participation in managing these resources ensures their long-term sustainability. The paper also discusses contour bunding, terracing, and mulching as effective measures to conserve soil moisture.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">4. Policy Implications and Conclusion</h2>
              <p class="mb-4">The findings emphasize that a combination of modern irrigation technologies with traditional water harvesting methods, supported by appropriate policies and farmer training, can significantly enhance water security and agricultural resilience in Rajasthan. Encouraging farmers to adopt these techniques through subsidies and awareness programs is vital for sustainable development in these water-stressed regions.</p>
              <p><strong>Keywords:</strong> Water conservation, Arid regions, Semi-arid, Rajasthan, Drip irrigation, Rainwater harvesting, Micro-irrigation.</p>
            `,
          },
          {
            id: 9,
            title: "Boosting Pulse Production: A Review of High-Yielding Varieties and Agronomic Practices",
            author: "Dr. S. K. Dubey (IIPR, Kanpur)",
            journal: "Legume Research (India)",
            year: 2023,
            abstract: "A comprehensive review of recent advancements in the development of high-yielding and disease-resistant pulse varieties, along with optimized agronomic practices including nutrient management and integrated weed control, aimed at addressing India's nutritional security and increasing farmer profitability.",
            fullContent: `
              <h1>Boosting Pulse Production: A Review of High-Yielding Varieties and Agronomic Practices</h1>
              <p><strong>Author:</strong> Dr. S. K. Dubey (IIPR, Kanpur)</p>
              <p><strong>Journal:</strong> Legume Research (India)</p>
              <p><strong>Year:</strong> 2023</p>
              <p class="text-xl font-bold mt-6 mb-3">Abstract:</p>
              <p class="mb-4">A comprehensive review of recent advancements in the development of high-yielding and disease-resistant pulse varieties, along with optimized agronomic practices including nutrient management and integrated weed control, aimed at addressing India's nutritional security and increasing farmer profitability.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">1. Introduction</h2>
              <p class="mb-4">Pulses are a critical component of India's agricultural system, providing essential protein for a large vegetarian population and playing a vital role in soil fertility through nitrogen fixation. Despite their importance, pulse production has historically lagged behind demand. This review synthesizes recent research and development efforts focused on enhancing pulse yields through improved varieties and refined agronomic practices, contributing to nutritional security and farmer prosperity.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">2. Advancements in Varietal Development</h2>
              <p class="mb-4">Significant progress has been made in breeding high-yielding and disease-resistant varieties of major pulses like chickpea, pigeonpea, lentil, and mungbean. These new varieties exhibit enhanced tolerance to biotic stresses (e.g., fusarium wilt, yellow mosaic virus) and abiotic stresses (drought, heat). The introduction of short-duration varieties also enables their integration into diverse cropping systems, enhancing overall farm productivity.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">3. Optimized Agronomic Practices</h2>
              <p class="mb-4">Beyond varietal improvement, optimizing agronomic practices is crucial. This review highlights: <br/>(a) <strong>Nutrient Management:</strong> Emphasis on balanced fertilization, including micronutrients like sulfur and zinc, and effective rhizobium inoculation for efficient nitrogen fixation. <br/>(b) <strong>Weed Control:</strong> Integrated weed management strategies combining cultural practices, mechanical weeding, and judicious use of herbicides to minimize yield losses. <br/>(c) <strong>Improved Sowing Techniques:</strong> Adoption of raised-bed planting or zero-tillage for better germination and resource conservation. <br/>(d) <strong>Pest and Disease Management:</strong> Timely identification and application of integrated pest and disease management (IPDM) protocols.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">4. Conclusion</h2>
              <p class="mb-4">Combining the cultivation of superior, high-yielding, and resistant pulse varieties with optimized agronomic practices offers a robust pathway to significantly boost pulse production in India. Continued research, extension services for farmer education, and policy support for quality seed availability are essential to unlock the full potential of pulse crops and ensure their contribution to a healthy and sustainable agricultural future.</p>
              <p><strong>Keywords:</strong> Pulses, High-yielding varieties, Agronomic practices, Nutrient management, Weed control, India, Nutritional security.</p>
            `,
          },
          {
            id: 10,
            title: "Soil Health Management for Organic Farming in Northern India",
            author: "Dr. Anjali Verma (Indian Agricultural Research Institute, Delhi)",
            journal: "Organic Agriculture Journal (India)",
            year: 2024,
            abstract: "This paper investigates best practices for maintaining and improving soil health in organic farming systems across northern India. It focuses on the role of organic manures, bio-fertilizers, and crop rotation in enhancing soil fertility, microbial activity, and overall farm productivity without synthetic inputs.",
            fullContent: `
              <h1>Soil Health Management for Organic Farming in Northern India</h1>
              <p><strong>Author:</strong> Dr. Anjali Verma (Indian Agricultural Research Institute, Delhi)</p>
              <p><strong>Journal:</strong> Organic Agriculture Journal (India)</p>
              <p><strong>Year:</strong> 2024</p>
              <p class="text-xl font-bold mt-6 mb-3">Abstract:</p>
              <p class="mb-4">This paper investigates best practices for maintaining and improving soil health in organic farming systems across northern India. It focuses on the role of organic manures, bio-fertilizers, and crop rotation in enhancing soil fertility, microbial activity, and overall farm productivity without synthetic inputs.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">1. Introduction</h2>
              <p class="mb-4">Organic farming is gaining traction in Northern India as farmers seek sustainable alternatives to conventional chemical-intensive agriculture. At the core of organic farming lies the principle of 'feeding the soil to feed the plant.' Maintaining and enhancing soil health is paramount for long-term productivity and ecological balance in organic systems. This research outlines key strategies for effective soil health management tailored for the agro-climatic conditions of Northern India.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">2. Components of Organic Soil Health Management</h2>
              <p class="mb-4">The study emphasizes the synergistic application of various organic inputs and practices: <br/>(a) <strong>Organic Manures:</strong> Regular application of Farm Yard Manure (FYM), compost, vermicompost, and green manures significantly improves soil organic matter content, nutrient availability, and water retention capacity. <br/>(b) <strong>Bio-fertilizers:</strong> Use of microbial inoculants (e.g., Azotobacter, Rhizobium, PSB) enhances nitrogen fixation, phosphorus solubilization, and overall nutrient cycling in the soil. <br/>(c) <strong>Crop Rotation and Diversification:</strong> Strategic rotation of legumes, cereals, and vegetables helps in nutrient recycling, breaking pest and disease cycles, and improving soil structure. <br/>(d) <strong>Cover Cropping and Mulching:</strong> Protecting the soil surface from erosion, suppressing weeds, and adding organic matter are key benefits of these practices. <br/>(e) <strong>Reduced Tillage:</strong> Minimizing soil disturbance preserves soil structure, enhances microbial populations, and reduces carbon emissions.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">3. Impact on Soil Fertility and Productivity</h2>
              <p class="mb-4">Field trials demonstrated that integrated organic soil management practices led to: (a) significant increases in soil organic carbon (SOC) and available nitrogen, phosphorus, and potassium; (b) enhanced beneficial microbial diversity and activity; (c) improved soil aggregation and water infiltration rates; and (d) comparable or improved crop yields over time compared to conventional systems, with superior produce quality.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">4. Conclusion</h2>
              <p class="mb-4">Effective soil health management is the cornerstone of successful organic farming in Northern India. By prioritizing organic manures, bio-fertilizers, and sound agronomic practices like crop rotation, farmers can build resilient and productive agricultural systems that benefit both the environment and their livelihoods. Continued support for organic certification and market linkages will further encourage these sustainable practices.</p>
              <p><strong>Keywords:</strong> Soil health, Organic farming, Northern India, Organic manures, Bio-fertilizers, Crop rotation, Sustainable agriculture.</p>
            `,
          },
          // NEW RESEARCH PAPER 11
          {
            id: 11,
            title: "Remote Sensing Applications for Crop Health Monitoring in Karnataka",
            author: "Dr. Lokesh Kumar (ISRO, Bengaluru)",
            journal: "Journal of Space Applications in Agriculture",
            year: 2023,
            abstract: "This study demonstrates the use of satellite imagery and drone technology for real-time monitoring of crop health, stress detection, and yield prediction in various crops across different districts of Karnataka. It highlights the benefits for precision agriculture and early warning systems for farmers.",
            fullContent: `
              <h1>Remote Sensing Applications for Crop Health Monitoring in Karnataka</h1>
              <p><strong>Author:</strong> Dr. Lokesh Kumar (ISRO, Bengaluru)</p>
              <p><strong>Journal:</strong> Journal of Space Applications in Agriculture</p>
              <p><strong>Year:</strong> 2023</p>
              <p class="text-xl font-bold mt-6 mb-3">Abstract:</p>
              <p class="mb-4">This study demonstrates the use of satellite imagery and drone technology for real-time monitoring of crop health, stress detection, and yield prediction in various crops across different districts of Karnataka. It highlights the benefits for precision agriculture and early warning systems for farmers.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">1. Introduction</h2>
              <p class="mb-4">Karnataka, a diverse agricultural state, faces challenges such as unpredictable weather patterns, pest outbreaks, and nutrient deficiencies that impact crop yields. Traditional field-based monitoring is labor-intensive and time-consuming, often leading to delayed interventions. Remote sensing technology, utilizing satellite and drone-based platforms, offers a non-invasive and efficient method for large-scale, real-time crop health assessment, paving the way for data-driven agricultural decisions.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">2. Methodology and Data Sources</h2>
              <p class="mb-4">The research utilized multi-spectral satellite imagery (e.g., from Sentinel-2 and Landsat) and high-resolution drone-based imagery collected over key agricultural regions in Karnataka. Vegetation indices (e.g., NDVI, EVI) were derived to assess crop vigor, biomass, and stress levels. Machine learning algorithms were applied to correlate spectral data with ground-truth observations of nutrient deficiencies, water stress, and disease incidence. Field surveys were conducted to validate the remote sensing data.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">3. Results and Applications</h2>
              <p class="mb-4">The study successfully demonstrated the ability of remote sensing to: <br/>(a) **Identify nutrient deficiencies:** Areas with nitrogen or potassium deficiencies were accurately mapped, allowing for variable rate fertilizer application. <br/>(b) **Detect water stress:** Early detection of drought-stressed areas enabled timely irrigation scheduling. <br/>(c) **Monitor disease and pest outbreaks:** Changes in spectral signatures helped pinpoint areas affected by blight, rust, or insect infestations, facilitating targeted pesticide application. <br/>(d) **Yield Prediction:** Models developed using historical yield data and current remote sensing metrics provided accurate yield forecasts, aiding in agricultural planning and policy formulation.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">4. Conclusion</h2>
              <p class="mb-4">Remote sensing offers a powerful and scalable tool for crop health monitoring and precision agriculture in Karnataka. Its applications enable farmers to make timely and informed decisions, leading to optimized resource use, reduced input costs, increased yields, and improved resilience against agricultural risks. Further integration with local weather data and ground sensors will enhance the accuracy and utility of these systems.</p>
              <p><strong>Keywords:</strong> Remote sensing, Crop health, Karnataka, Satellite imagery, Drone technology, Precision agriculture, Yield prediction.</p>
            `,
          },
          // NEW RESEARCH PAPER 12
          {
            id: 12,
            title: "Economics of Farm Mechanization for Smallholder Farmers in Bihar",
            author: "Dr. Manoj Singh (BAU, Sabour)",
            journal: "Indian Journal of Agricultural Economics",
            year: 2022,
            abstract: "This paper analyzes the economic benefits and challenges of adopting farm mechanization among smallholder farmers in Bihar. It evaluates the impact on labor costs, operational efficiency, crop yields, and overall farm profitability, providing insights for policy interventions.",
            fullContent: `
              <h1>Economics of Farm Mechanization for Smallholder Farmers in Bihar</h1>
              <p><strong>Author:</strong> Dr. Manoj Singh (BAU, Sabour)</p>
              <p><strong>Journal:</strong> Indian Journal of Agricultural Economics</p>
              <p><strong>Year:</strong> 2022</p>
              <p class="text-xl font-bold mt-6 mb-3">Abstract:</p>
              <p class="mb-4">This paper analyzes the economic benefits and challenges of adopting farm mechanization among smallholder farmers in Bihar. It evaluates the impact on labor costs, operational efficiency, crop yields, and overall farm profitability, providing insights for policy interventions.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">1. Introduction</h2>
              <p class="mb-4">Bihar's agricultural landscape is dominated by small and marginal farmers who often rely on traditional, labor-intensive farming practices. While farm mechanization offers potential solutions for enhancing productivity and reducing drudgery, its adoption by smallholders is limited due to various socio-economic factors. This study investigates the economic viability and barriers to farm mechanization for smallholder farmers in Bihar, aiming to inform targeted policy interventions.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">2. Methodology</h2>
              <p class="mb-4">A survey-based approach was employed, collecting data from a representative sample of smallholder farmers across different agro-climatic zones of Bihar. Data encompassed current farming practices, types of machinery used (if any), labor costs, operational efficiency, crop yields, and perceived benefits and challenges of mechanization. Economic analysis, including cost-benefit analysis and profitability ratios, was performed to assess the impact of mechanization.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">3. Economic Benefits and Challenges</h2>
              <p class="mb-4">The findings revealed that even partial mechanization (e.g., use of power tillers, reapers) led to: <br/>(a) **Reduced Labor Costs:** Significant savings in labor expenses, especially during peak seasons. <br/>(b) **Improved Operational Efficiency:** Faster completion of tasks like sowing and harvesting, allowing for better timeliness and multi-cropping. <br/>(c) **Increased Yields:** Improved seedbed preparation, timely operations, and better input placement contributed to modest yield increases. <br/>(d) **Enhanced Profitability:** The cumulative effect of reduced costs and increased yields resulted in higher net returns for mechanized farms. <br/>However, challenges included: (a) High initial investment cost; (b) Small and fragmented landholdings; (c) Lack of access to credit; (d) Shortage of skilled operators; and (e) Inadequate repair and maintenance facilities.</p>

              <h2 class="text-xl font-semibold mt-6 mb-2 text-green-700">4. Policy Recommendations and Conclusion</h2>
              <p class="mb-4">To promote farm mechanization among Bihar's smallholders, policy interventions should focus on: (a) Subsidized access to small and appropriate machinery; (b) Promoting custom hiring centers and farmer producer organizations (FPOs) for shared machinery use; (c) Developing local repair and maintenance networks; (d) Providing targeted training programs for farmers and operators; and (e) Facilitating access to affordable credit. Mechanization is crucial for improving the economic viability and sustainability of smallholder farming in Bihar.</p>
              <p><strong>Keywords:</strong> Farm mechanization, Smallholder farmers, Bihar, Agricultural economics, Labor costs, Operational efficiency, Profitability.</p>
            `,
          },
        ];
        setResearchPapers(dummyData);
      } catch (err) {
        setError("Failed to load research papers. Please try again later.");
        console.error("Error fetching research papers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResearchPapers();
  }, []);

  const handleReadPaperClick = (paper) => {
    setSelectedPaper(paper); // Set the selected paper to display its full content
  };

  const handleClosePaperDetail = () => {
    setSelectedPaper(null); // Clear the selected paper to close the detail view
  };

  if (loading) {
    return <div className="text-center p-8 text-xl text-green-700">Loading agricultural research insights...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-xl text-red-600">{error}</div>;
  }

  return (
    <> {/* Use a React Fragment to wrap multiple top-level elements */}
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Agricultural Research Papers</h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
          Explore a curated collection of research papers from leading agricultural scientists, providing insights and solutions for modern farming challenges and future innovations.
        </p>

        {/* Conditional rendering for the detailed paper view */}
        {selectedPaper ? (
          <div className="bg-white p-8 rounded-lg shadow-xl border border-green-200 relative mb-8">
            <button
              onClick={handleClosePaperDetail}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full h-8 w-8 flex items-center justify-center text-xl font-bold hover:bg-red-600 transition-colors"
              aria-label="Close"
            >
              &times;
            </button>
            {/* The `prose` class from Tailwind CSS Typography plugin helps style raw HTML content */}
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedPaper.fullContent }} />
          </div>
        ) : (
          // Display the grid of research paper cards
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchPapers.map(paper => (
              <div key={paper.id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-green-100 flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">{paper.title}</h2>
                <p className="text-gray-600 mb-1"><strong>Author:</strong> {paper.author}</p>
                <p className="text-gray-600 mb-1"><strong>Journal:</strong> {paper.journal}</p>
                <p className="text-gray-600 mb-4"><strong>Year:</strong> {paper.year}</p>
                <p className="text-gray-800 text-sm italic line-clamp-4 mb-4 flex-grow">{paper.abstract}</p>
                <div className="mt-auto"> {/* Pushes the button to the bottom */}
                  <button
                    onClick={() => handleReadPaperClick(paper)} // Changed to open detail view
                    className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Read Paper
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {researchPapers.length === 0 && !loading && !selectedPaper && (
          <p className="text-center text-gray-600 mt-8">No research papers found at the moment.</p>
        )}
      </div>
    </>
  );
}