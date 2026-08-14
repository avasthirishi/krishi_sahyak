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

    console.log(`\n🎉 Seeding completed!`);
    console.log(`   ${createdCount} crops created`);
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
