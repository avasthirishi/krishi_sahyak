// Seed Script to Migrate Hardcoded Crop Data to Database
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcryptjs';

// Create PostgreSQL connection pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

// Create adapter
const adapter = new PrismaPg(pool);

// Create Prisma Client with adapter
const prisma = new PrismaClient({ adapter });

// Sample crop data from your frontend
const cropData = [
  {
    name: 'Rice',
    scientificName: 'Oryza sativa',
    briefDescription: 'A staple food crop cultivated widely in India, primarily during the Kharif season. It requires hot and humid climate with abundant water.',
    fullDescription: 'Rice is the most important food crop of India and is grown in diverse agro-climatic conditions. It is a semi-aquatic plant and needs high temperatures (above 25°C) and high humidity (above 75%) along with ample rainfall (100 cm to 200 cm) or irrigation. It is cultivated in almost all states, with major producers being West Bengal, Uttar Pradesh, Punjab, and Andhra Pradesh.',
    imageUrl: 'https://images.unsplash.com/photo-1592997572594-34be01bc36c7',
    climate: 'Hot and humid (25°C - 35°C, 75%+ humidity)',
    soil: 'Alluvial soils, clayey soils, loam soils with good water retention capacity.',
    sowingTime: 'Kharif (June-July), sometimes Zaid/Rabi in certain regions.',
    harvestingTime: 'Kharif (October-November), depending on variety and sowing.',
    waterRequirements: 'High, standing water is ideal for most varieties. Requires 100-200 cm rainfall.',
    commonPests: ['Stem Borer', 'Leaf Folder', 'Brown Plant Hopper', 'Rice Hispa'],
    commonDiseases: ['Blast', 'Bacterial Blight', 'Sheath Blight', 'Tungro Virus'],
    yield: 'Average 2.5-3.5 tons/hectare for traditional varieties; 5-7 tons/hectare for high-yielding varieties.',
    cultivationPractices: [
      'Nursery preparation and transplanting (or Direct Seeded Rice)',
      'Puddling and leveling of fields',
      'Application of basal fertilizers (N, P, K)',
      'Water management: maintaining standing water',
      'Weed control through manual weeding or herbicides',
      'Integrated Pest and Disease Management (IPM)',
      'Harvesting when grains are mature, followed by threshing and drying'
    ],
    fertilizerManagement: 'Typically requires 120-150 kg Nitrogen, 60 kg Phosphorus, 40 kg Potassium per hectare, adjusted based on soil test results. Nitrogen applied in splits.',
    marketInfo: 'Key staple, good demand. MSP (Minimum Support Price) provided by government. Market prices fluctuate based on supply and quality.',
    category: 'CEREALS'
  },
  {
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    briefDescription: 'A major Rabi crop, known for its extensive cultivation in the northern plains of India. It thrives in cool, dry conditions.',
    fullDescription: 'Wheat is the second most important food crop of India, primarily grown in the Rabi season. It requires a cool growing season and bright sunshine at the time of ripening. Ideal temperature range is 10-15°C for germination and 21-26°C for ripening. Annual rainfall of 50-75 cm is ideal, evenly distributed over the growing season. Major wheat-producing states are Uttar Pradesh, Punjab, Haryana, and Madhya Pradesh.',
    imageUrl: 'https://images.unsplash.com/photo-1529511582893-2d7e684dd128',
    climate: 'Cool growing season (10-15°C), bright sunshine at ripening (21-26°C).',
    soil: 'Well-drained fertile loamy and clayey loamy soils. Black soils are also suitable.',
    sowingTime: 'Rabi (October-December)',
    harvestingTime: 'Rabi (March-April)',
    waterRequirements: 'Moderate, 3-5 irrigations depending on rainfall.',
    commonPests: ['Aphids', 'Termites', 'Armyworm'],
    commonDiseases: ['Rusts (Yellow, Brown, Black)', 'Loose Smut', 'Powdery Mildew', 'Karnal Bunt'],
    yield: 'Average 3-4.5 tons/hectare; 5-6 tons/hectare for irrigated high-yielding varieties.',
    cultivationPractices: [
      'Thorough land preparation (ploughing, leveling)',
      'Timely sowing is crucial for good yield',
      'Application of balanced fertilizers',
      'Critical irrigations at crown root initiation, tillering, flowering, grain filling stages',
      'Weed control (broadleaf and grassy weeds)',
      'Pest and disease monitoring and management',
      'Harvesting when grains are hard and dry'
    ],
    fertilizerManagement: 'Typically 120 kg Nitrogen, 60 kg Phosphorus, 40 kg Potassium per hectare, with Zinc sulfate application in deficient soils.',
    marketInfo: 'Crucial for food security. Strong government procurement at MSP. Market prices are generally stable due to high demand.',
    category: 'CEREALS'
  },
  {
    name: 'Barley',
    scientificName: 'Hordeum vulgare',
    briefDescription: 'A Rabi cereal crop grown in cooler climates, used for food, fodder, and brewing.',
    fullDescription: 'Barley is a hardy cereal crop cultivated mainly in the Rabi season. It thrives in dry, cool climates and is grown in states like Rajasthan, Uttar Pradesh, Madhya Pradesh, and Haryana. It is used for human consumption, animal feed, and in the malting and brewing industries.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Barley_%28Hordeum_vulgare%29',
    climate: 'Cool and dry (15°C - 25°C)',
    soil: 'Well-drained loamy to sandy loam soils with moderate fertility.',
    sowingTime: 'Rabi (October-November)',
    harvestingTime: 'Rabi (March-April)',
    waterRequirements: 'Low to moderate, drought-tolerant.',
    commonPests: ['Aphids', 'Armyworms', 'Cutworms'],
    commonDiseases: ['Leaf Rust', 'Powdery Mildew', 'Smuts'],
    yield: '2.5-3.5 tons/hectare under good management.',
    cultivationPractices: [
      'Timely sowing with certified seeds',
      'Proper seed rate and spacing',
      'Balanced fertilization and weed control',
      'Irrigation at critical stages like tillering and grain filling',
      'Timely harvesting to avoid grain shattering'
    ],
    fertilizerManagement: '60-80 kg Nitrogen, 40 kg Phosphorus per hectare. Apply nitrogen in two splits.',
    marketInfo: 'Used in food, feed, and brewing. Prices vary with demand from malt and beer industries.',
    category: 'CEREALS'
  }
];

async function seed() {
  try {
    console.log('🌱 Starting database seed...\n');

    // Step 1: Create admin user
    console.log('👤 Creating admin user...');
    const passwordHash = await bcrypt.hash('admin123', 12);
    
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@krishisahyak.com' },
      update: {},
      create: {
        email: 'admin@krishisahyak.com',
        passwordHash,
        role: 'SUPER_ADMIN',
        isVerified: true,
        profile: {
          create: {
            fullName: 'Krishi Sahayak Admin',
            city: 'Delhi',
            state: 'Delhi'
          }
        }
      }
    });
    console.log('✅ Admin user created:', adminUser.email);

    // Step 2: Create content manager user
    console.log('\n👤 Creating content manager user...');
    const managerPasswordHash = await bcrypt.hash('manager123', 12);
    
    const managerUser = await prisma.user.upsert({
      where: { email: 'manager@krishisahyak.com' },
      update: {},
      create: {
        email: 'manager@krishisahyak.com',
        passwordHash: managerPasswordHash,
        role: 'CONTENT_MANAGER',
        isVerified: true,
        profile: {
          create: {
            fullName: 'Content Manager',
            city: 'Mumbai',
            state: 'Maharashtra'
          }
        }
      }
    });
    console.log('✅ Content manager created:', managerUser.email);

    // Step 3: Seed crops
    console.log('\n🌾 Seeding crops...');
    let createdCount = 0;
    
    for (const crop of cropData) {
      const existingCrop = await prisma.crop.findFirst({
        where: { name: crop.name }
      });

      if (existingCrop) {
        console.log(`⏭️  Skipping ${crop.name} (already exists)`);
        continue;
      }

      await prisma.crop.create({
        data: {
          ...crop,
          status: 'published',
          createdById: managerUser.id
        }
      });
      
      createdCount++;
      console.log(`✅ Created crop: ${crop.name}`);
    }

    // Step 4: Seed agricultural resources (courses & training)
    console.log('\n📚 Seeding agricultural resources...');
    const resources = [
      {
        title: 'Kisan Call Center Training Program',
        category: 'Training',
        description: 'Free telephonic advisory service by Government of India where farmers can call 1800-180-1551 to get guidance on farming practices, pest management, weather, and schemes.',
        fees: 'Free',
        duration: 'On-call (24x7)',
        status: 'published',
        sortOrder: 1
      },
      {
        title: 'National Institute of Agricultural Extension Management (MANAGE)',
        category: 'Course',
        description: 'MANAGE offers various training programs and courses for agricultural extension workers, farmers, and agri-entrepreneurs covering modern farming techniques, agri-business management, and rural development.',
        fees: 'Subsidized / Free for eligible candidates',
        duration: '1 week – 3 months (varies by program)',
        status: 'published',
        sortOrder: 2
      },
      {
        title: 'Pradhan Mantri Kaushal Vikas Yojana – Agriculture Skill Courses',
        category: 'Skill Development',
        description: 'Government skill development initiative offering certified short-term agriculture courses including organic farming, soil testing, drip irrigation, dairy management, and post-harvest handling.',
        fees: 'Free (Government funded)',
        duration: '1–3 months',
        status: 'published',
        sortOrder: 3
      },
      {
        title: 'ICAR e-Learning Courses',
        category: 'Online Course',
        description: 'Indian Council of Agricultural Research (ICAR) provides free online courses on crop production, soil health, plant protection, animal husbandry, and fisheries through its e-Krishi Shiksha platform.',
        fees: 'Free',
        duration: 'Self-paced (2–8 weeks)',
        status: 'published',
        sortOrder: 4
      },
      {
        title: 'Organic Farming Certification Program',
        category: 'Certification',
        description: 'Comprehensive training on organic farming methods including composting, natural pest control, bio-fertilizers, and certification process under NPOP (National Programme for Organic Production).',
        fees: '₹2,000 – ₹5,000',
        duration: '3–6 months',
        status: 'published',
        sortOrder: 5
      },
      {
        title: 'Drip & Sprinkler Irrigation Training',
        category: 'Training',
        description: 'Hands-on training program on micro-irrigation techniques including drip and sprinkler systems, installation, maintenance, and water-use efficiency under Pradhan Mantri Krishi Sinchayee Yojana (PMKSY).',
        fees: 'Free / Subsidized',
        duration: '3–7 days',
        status: 'published',
        sortOrder: 6
      },
      {
        title: 'Soil Health Management Training',
        category: 'Training',
        description: 'Training on soil testing techniques, interpreting soil health cards, balanced fertilizer use, and improving soil fertility for better crop yields. Available through Krishi Vigyan Kendras (KVKs) across India.',
        fees: 'Free',
        duration: '1–5 days',
        status: 'published',
        sortOrder: 7
      },
      {
        title: 'Post-Harvest Technology & Value Addition',
        category: 'Course',
        description: 'Practical training on post-harvest handling, storage, processing, and value addition for fruits, vegetables, and grains to reduce losses and increase farmer income.',
        fees: '₹500 – ₹3,000',
        duration: '1–2 weeks',
        status: 'published',
        sortOrder: 8
      },
      {
        title: 'Agri-Entrepreneurship Development Program',
        category: 'Entrepreneurship',
        description: 'Training for young farmers and agri-entrepreneurs on setting up agri-based businesses, accessing finance, marketing, farm mechanization, and food processing units under RKVY-RAFAAR scheme.',
        fees: 'Free / Nominal',
        duration: '2 months',
        status: 'published',
        sortOrder: 9
      },
      {
        title: 'Integrated Pest Management (IPM) Training',
        category: 'Training',
        description: 'Training on eco-friendly pest management strategies including biological control, cultural practices, and judicious use of pesticides to reduce chemical dependency and crop losses.',
        fees: 'Free',
        duration: '3–10 days',
        status: 'published',
        sortOrder: 10
      }
    ];

    let resourceCount = 0;
    for (const resource of resources) {
      const existing = await prisma.agriculturalResource.findFirst({
        where: { title: resource.title }
      });
      if (existing) {
        console.log(`⏭️  Skipping resource: ${resource.title} (already exists)`);
        continue;
      }
      await prisma.agriculturalResource.create({
        data: { ...resource, createdById: adminUser.id }
      });
      resourceCount++;
      console.log(`✅ Created resource: ${resource.title}`);
    }

    console.log(`\n🎉 Seeding completed!`);
    console.log(`   ${createdCount} crops created`);
    console.log(`   ${resourceCount} resources created`);
    console.log(`\n🔑 Test Credentials:`);
    console.log(`   Admin: admin@krishisahyak.com / admin123`);
    console.log(`   Manager: manager@krishisahyak.com / manager123\n`);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

seed();
