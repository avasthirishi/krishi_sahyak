// Complete Crop Data Seeding Script
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import { cropData } from '../../src/data/cropData.js';

// Create PostgreSQL connection pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

// Create adapter
const adapter = new PrismaPg(pool);

// Create Prisma Client with adapter
const prisma = new PrismaClient({ adapter });

// Category mapping
const getCategoryForCrop = (cropName) => {
  const cereals = ['Rice', 'Wheat', 'Barley', 'Sorghum', 'Finger Millet', 'Oats', 'Maize', 'Pearl Millet', 'Foxtail Millet'];
  const pulses = ['Gram', 'Lentil', 'Pigeon Pea', 'Green Gram', 'Black Gram', 'Peas', 'Cowpea'];
  const oilseeds = ['Mustard', 'Groundnut', 'Soybean', 'Sunflower', 'Sesame', 'Linseed', 'Castor', 'Safflower', 'Niger Seed'];
  const cash = ['Cotton', 'Sugarcane', 'Tobacco', 'Jute', 'Indigo'];
  const spices = ['Turmeric', 'Ginger', 'Chilli', 'Coriander', 'Cumin', 'Fenugreek', 'Black Pepper', 'Cardamom'];
  const plantation = ['Tea', 'Coffee', 'Rubber', 'Coconut', 'Arecanut'];
  
  if (cereals.some(c => cropName.includes(c))) return 'CEREALS';
  if (pulses.some(c => cropName.includes(c))) return 'PULSES';
  if (oilseeds.some(c => cropName.includes(c))) return 'CASH_CROPS';
  if (cash.some(c => cropName.includes(c))) return 'CASH_CROPS';
  if (spices.some(c => cropName.includes(c))) return 'SPICES';
  if (plantation.some(c => cropName.includes(c))) return 'CASH_CROPS';
  
  return 'CEREALS'; // Default
};

async function seedComplete() {
  try {
    console.log('🌱 Starting complete database seed...\n');

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

    // Step 3: Seed all crops from cropData.js
    console.log(`\n🌾 Seeding ${cropData.length} crops from your research...\n`);
    let createdCount = 0;
    let skippedCount = 0;
    
    for (const crop of cropData) {
      // Check if crop already exists
      const existingCrop = await prisma.crop.findFirst({
        where: { name: crop.name }
      });

      if (existingCrop) {
        console.log(`⏭️  Skipping ${crop.name} (already exists)`);
        skippedCount++;
        continue;
      }

      // Convert commonPests and commonDiseases to array if they're strings
      const commonPests = Array.isArray(crop.commonPests) 
        ? crop.commonPests 
        : crop.commonPests ? crop.commonPests.split(',').map(s => s.trim()) : [];
      
      const commonDiseases = Array.isArray(crop.commonDiseases)
        ? crop.commonDiseases
        : crop.commonDiseases ? crop.commonDiseases.split(',').map(s => s.trim()) : [];

      const cultivationPractices = Array.isArray(crop.cultivationPractices)
        ? crop.cultivationPractices
        : crop.cultivationPractices ? [crop.cultivationPractices] : [];

      // Determine category
      const category = getCategoryForCrop(crop.name);

      await prisma.crop.create({
        data: {
          name: crop.name,
          scientificName: crop.scientificName || null,
          briefDescription: crop.briefDescription,
          fullDescription: crop.fullDescription || crop.briefDescription,
          imageUrl: crop.image || null,
          climate: crop.climate || null,
          soil: crop.soil || null,
          sowingTime: crop.sowingTime || null,
          harvestingTime: crop.harvestingTime || null,
          waterRequirements: crop.waterRequirements || null,
          commonPests,
          commonDiseases,
          yield: crop.yield || null,
          cultivationPractices,
          fertilizerManagement: crop.fertilizerManagement || null,
          marketInfo: crop.marketInfo || null,
          category,
          status: 'published',
          createdById: managerUser.id
        }
      });
      
      createdCount++;
      console.log(`✅ Created: ${crop.name} (${category})`);
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`🎉 Seeding completed successfully!`);
    console.log(`${'='.repeat(60)}`);
    console.log(`✅ ${createdCount} new crops added`);
    console.log(`⏭️  ${skippedCount} crops skipped (already exist)`);
    console.log(`📊 Total crops in database: ${createdCount + skippedCount}`);
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

seedComplete();
