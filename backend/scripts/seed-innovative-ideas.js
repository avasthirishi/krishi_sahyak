// Seed innovative farming business ideas into agricultural_resources table
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const innovativeIdeas = [
  {
    title: 'Vertical Farming / Hydroponics in Urban & Peri-Urban Areas',
    category: 'Innovative Farming',
    description: 'Grow high-value crops like leafy greens, herbs, and exotic vegetables (e.g., cherry tomatoes, bell peppers) in multi-layered indoor setups. This caters to fresh, local demand, minimizes land use, and allows year-round production regardless of climate. Requires significant initial investment but offers high returns.\n\nKeywords: Hydroponics, Aeroponics, Urban Farming, High-Value Crops, Controlled Environment Agriculture',
    fees: 'High Investment',
    duration: 'Growing (Urban Consumers, Restaurants)',
    imageUrl: 'https://images.unsplash.com/photo-1524486361537-8ad15938e1a3?w=600&auto=format&fit=crop&q=60',
    status: 'published',
    sortOrder: 101
  },
  {
    title: 'Specialty Mushroom Cultivation (Oyster, Shiitake, Reishi)',
    category: 'Innovative Farming',
    description: 'Cultivate gourmet and medicinal mushrooms which have a strong demand in urban markets, hotels, and for export. Mushrooms have a short cultivation cycle and require less space. Requires controlled temperature and humidity, but can yield significant profits per square foot.\n\nKeywords: Mushroom Farming, Gourmet Mushrooms, Medicinal Fungi, Controlled Environment',
    fees: 'Medium Investment',
    duration: 'Niche, but Rapidly Growing',
    imageUrl: 'https://images.unsplash.com/photo-1634549666877-f39fed4e8fa0?w=600&auto=format&fit=crop&q=60',
    status: 'published',
    sortOrder: 102
  },
  {
    title: 'Dairy Farming with Value-Added Products',
    category: 'Innovative Farming',
    description: 'Beyond just selling milk, focus on producing value-added dairy products like paneer, ghee, curd, lassi, or flavored milk. This significantly increases profit margins. Requires investment in processing equipment and marketing.\n\nKeywords: Dairy Processing, Milk Products, Value Addition, Cattle Rearing',
    fees: 'Medium to High Investment',
    duration: 'Consistent & Diversified',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1695028377588-4c496ed315ad?w=600&auto=format&fit=crop&q=60',
    status: 'published',
    sortOrder: 103
  },
  {
    title: 'Agri-Tourism / Farm Stays',
    category: 'Innovative Farming',
    description: 'Convert a portion of your farm into an agri-tourism destination. Offer farm tours, hands-on farming experiences, rural living experiences, and sell farm-fresh produce directly. This provides an additional revenue stream, promotes rural development, and educates urban populations about agriculture.\n\nKeywords: Rural Tourism, Farm Experience, Homestays, Direct Sales',
    fees: 'Medium Investment',
    duration: 'Emerging (Post-COVID, Experiential Travel)',
    imageUrl: 'https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=600&auto=format&fit=crop&q=60',
    status: 'published',
    sortOrder: 104
  },
  {
    title: 'Organic Fodder Cultivation for Livestock',
    category: 'Innovative Farming',
    description: "With growing awareness of organic produce, there's a rising demand for organic milk and meat. This creates an opportunity for farmers to specialize in cultivating organic fodder (e.g., multi-cut sorghum, napier grass, alfalfa) and supplying it to dairy and livestock farms.\n\nKeywords: Organic Feed, Fodder Production, Livestock Nutrition, Sustainable Agriculture",
    fees: 'Low to Medium Investment',
    duration: 'Growing (from Organic Livestock Farms)',
    imageUrl: 'https://agrierp.com/blog/wp-content/uploads/2022/10/Growing-Fodder-Crops.jpg',
    status: 'published',
    sortOrder: 105
  },
  {
    title: 'Exotic Vegetable Farming (Broccoli, Asparagus, Zucchini)',
    category: 'Innovative Farming',
    description: 'Cultivate high-value exotic vegetables that are gaining popularity in urban Indian kitchens and restaurants. These often fetch premium prices compared to traditional vegetables. Requires precise climate control or seasonal adaptation.\n\nKeywords: Exotic Vegetables, High-Value Crops, Direct Marketing, Greenhouse Farming',
    fees: 'Medium Investment',
    duration: 'Increasing (Urban, Hospitality)',
    imageUrl: 'https://images.unsplash.com/photo-1489450278009-822e9be04dff?w=600&auto=format&fit=crop&q=60',
    status: 'published',
    sortOrder: 106
  },
  {
    title: 'High-Density Fish Farming (Biofloc/RAS)',
    category: 'Innovative Farming',
    description: 'Implement advanced aquaculture techniques like Biofloc or Recirculating Aquaculture Systems (RAS) to maximize fish production in a small area with minimal water usage. This caters to the increasing demand for fresh fish in urban areas and offers high returns.\n\nKeywords: Aquaculture, Fish Farming, Biofloc, RAS, Intensive Farming',
    fees: 'High Investment',
    duration: 'Growing (Urban Consumers, Restaurants)',
    imageUrl: 'https://images.unsplash.com/photo-1442706722731-7284acc0a2d7?w=600&auto=format&fit=crop&q=60',
    status: 'published',
    sortOrder: 107
  },
  {
    title: 'Apiculture (Beekeeping for Honey & Pollination)',
    category: 'Innovative Farming',
    description: 'Start a beekeeping venture focusing on honey production, beeswax, and providing pollination services to local farmers. Beekeeping is relatively low-investment and contributes to ecological balance and crop yield for others.\n\nKeywords: Beekeeping, Apiculture, Honey Production, Pollination Services, Sustainable Farming',
    fees: 'Low Investment',
    duration: 'Consistent (Honey, Wax, Pollination)',
    imageUrl: 'https://images.unsplash.com/photo-1586779161657-041097557546?w=600&auto=format&fit=crop&q=60',
    status: 'published',
    sortOrder: 108
  },
  {
    title: 'Medicinal & Aromatic Plant Cultivation',
    category: 'Innovative Farming',
    description: 'Grow high-value medicinal plants (e.g., Ashwagandha, Aloe Vera, Stevia) or aromatic plants (e.g., Lemongrass, Mint) that have significant demand from pharmaceutical, cosmetic, and food industries. Requires specific climatic conditions and careful processing.\n\nKeywords: Medicinal Plants, Aromatic Plants, Herbal Farming, Niche Crops, Pharmaceutical Industry',
    fees: 'Medium Investment',
    duration: 'Niche, but Very High Value',
    imageUrl: 'https://images.unsplash.com/photo-1597235174291-1bf4e00849d8?w=600&auto=format&fit=crop&q=60',
    status: 'published',
    sortOrder: 109
  },
  {
    title: 'Contract Farming & Direct-to-Consumer Models',
    category: 'Innovative Farming',
    description: 'Engage in contract farming with food processing companies or organized retail for assured buy-back of produce. Alternatively, establish a direct-to-consumer model through online sales, farmers\' markets, or community-supported agriculture (CSA) programs.\n\nKeywords: Contract Farming, Direct Sales, E-commerce, CSA, Market Linkage',
    fees: 'Low to Medium Investment',
    duration: 'High (Assured Sales, Premium Pricing)',
    imageUrl: 'https://images.unsplash.com/photo-1661621768955-8811c0392ef2?w=600&auto=format&fit=crop&q=60',
    status: 'published',
    sortOrder: 110
  },
  {
    title: 'Waste-to-Wealth: Biogas & Organic Manure Production',
    category: 'Innovative Farming',
    description: 'Set up a unit to convert agricultural waste, animal dung, and organic residues into biogas (for energy) and high-quality organic manure (digestates). This circular economy model reduces waste, generates energy, and produces valuable organic inputs for farming.\n\nKeywords: Biogas, Organic Manure, Waste Management, Circular Economy, Renewable Energy',
    fees: 'Medium to High Investment',
    duration: 'Growing (Sustainable Energy, Organic Farming)',
    imageUrl: 'https://images.unsplash.com/photo-1649577193391-f13d769d011d?w=600&auto=format&fit=crop&q=60',
    status: 'published',
    sortOrder: 111
  },
  {
    title: 'Integrated Multi-Layer Farming (Goat, Poultry, Fish)',
    category: 'Innovative Farming',
    description: 'Establish a multi-tiered farming system for maximum land and resource utilization. The top layer houses goats, whose droppings provide nutrient-rich feed for chickens on the middle layer. The chicken waste, in turn, fertilizes ponds on the bottom layer for fish farming. This highly efficient, symbiotic system minimizes waste, reduces external feed costs, and generates diversified income streams.\n\nKeywords: Integrated Farming, Multi-Layer Farming, Goat Farming, Poultry Farming, Fish Farming, Aquaculture, Sustainable Agriculture',
    fees: 'High Investment',
    duration: 'Growing (Sustainable Produce, Diversified Income)',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=60',
    status: 'published',
    sortOrder: 112
  }
];

async function seedInnovativeIdeas() {
  try {
    console.log('💡 Seeding innovative farming business ideas...\n');

    const admin = await prisma.user.findFirst({ where: { role: 'SUPER_ADMIN' } });
    if (!admin) throw new Error('No SUPER_ADMIN found. Run seed.js first.');

    // Remove any previously seeded innovative ideas to avoid duplicates
    await prisma.agriculturalResource.deleteMany({
      where: { category: 'Innovative Farming' }
    });
    console.log('🗑️  Cleared old Innovative Farming records\n');

    let count = 0;
    for (const idea of innovativeIdeas) {
      await prisma.agriculturalResource.create({
        data: { ...idea, createdById: admin.id }
      });
      console.log(`✅ ${idea.title}`);
      count++;
    }

    console.log(`\n🎉 Done! ${count} innovative ideas added to database.`);

    const total = await prisma.agriculturalResource.count();
    console.log(`📊 Total resources in DB: ${total}`);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

seedInnovativeIdeas();
