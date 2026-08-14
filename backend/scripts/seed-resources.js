// Seed script for Agricultural Resources (Courses & Training)
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const resources = [
  // ── Government Training Programs ──────────────────────────────────
  {
    title: 'Kisan Call Center (KCC) – 1800-180-1551',
    category: 'Government Helpline',
    description: 'A free 24x7 toll-free helpline by the Government of India where farmers can get expert advice on crop production, pest & disease management, soil health, weather, and government schemes in their local language.',
    fees: 'Free',
    duration: 'On-call (anytime)',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 1
  },
  {
    title: 'PM Kisan Samman Nidhi – Farmer Registration & Training',
    category: 'Government Scheme',
    description: 'Under PM-KISAN, registered farmers receive ₹6,000/year direct income support. State Agriculture Departments also conduct training camps explaining scheme benefits, eligibility, and how to register via the PM-Kisan portal.',
    fees: 'Free',
    duration: '1–2 days (camp-based)',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 2
  },
  {
    title: 'Pradhan Mantri Fasal Bima Yojana – Crop Insurance Training',
    category: 'Government Scheme',
    description: 'Training sessions organized by banks, insurance companies, and agriculture departments to help farmers understand crop insurance enrollment, premium calculation, and claim procedures under PMFBY.',
    fees: 'Free',
    duration: '1 day',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 3
  },
  {
    title: 'Soil Health Card Scheme – Soil Testing Training',
    category: 'Training',
    description: 'Hands-on training on collecting soil samples, interpreting Soil Health Cards issued by the government, understanding NPK and micronutrient levels, and making balanced fertilizer decisions for higher yields.',
    fees: 'Free',
    duration: '1–3 days',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 4
  },

  // ── ICAR / Agricultural Universities ──────────────────────────────
  {
    title: 'ICAR e-Krishi Shiksha – Free Online Courses',
    category: 'Online Course',
    description: 'Indian Council of Agricultural Research (ICAR) offers free self-paced online courses on crop production, soil science, plant protection, animal husbandry, and fisheries. Courses include video lectures, quizzes, and e-certificates.',
    fees: 'Free',
    duration: '2–8 weeks (self-paced)',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 5
  },
  {
    title: 'Krishi Vigyan Kendra (KVK) – On-Farm Training',
    category: 'Training',
    description: 'Over 700 KVKs across India offer hands-on front-line demonstrations and skill training in improved crop varieties, integrated pest management, farm mechanization, post-harvest technology, and animal husbandry.',
    fees: 'Free / Nominal',
    duration: '2 days – 2 weeks',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 6
  },
  {
    title: 'Agricultural Technology Management Agency (ATMA)',
    category: 'Training',
    description: 'District-level ATMA training covers new agricultural technologies, Farmer Interest Groups (FIGs), and farmer-to-farmer learning. Includes field visits, exposure tours, and demonstrations in districts across India.',
    fees: 'Free',
    duration: '3–7 days',
    imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 7
  },

  // ── Skill Development ──────────────────────────────────────────────
  {
    title: 'PMKVY – Agriculture Skill Courses',
    category: 'Skill Development',
    description: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY) offers certified short-term courses in organic farming, drip irrigation, dairy management, beekeeping, mushroom cultivation, and post-harvest handling through NSDC-affiliated centers.',
    fees: 'Free (Government funded)',
    duration: '1–3 months',
    imageUrl: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 8
  },
  {
    title: 'Rural Self Employment Training Institute (RSETI)',
    category: 'Skill Development',
    description: 'Bank-sponsored RSETIs offer free residential skill training in agri & allied activities including vermicomposting, fish farming, tailoring, dairy, and food processing with bank linkage for startup loans.',
    fees: 'Free (residential with boarding)',
    duration: '2 weeks – 6 weeks',
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 9
  },

  // ── Organic Farming ────────────────────────────────────────────────
  {
    title: 'Organic Farming Certification – NPOP Program',
    category: 'Certification',
    description: 'Comprehensive training on transitioning to organic farming under the National Programme for Organic Production (NPOP). Covers composting, bio-fertilizers, natural pest control, record keeping, and third-party certification process.',
    fees: '₹2,000 – ₹5,000',
    duration: '3–6 months',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 10
  },
  {
    title: 'Paramparagat Krishi Vikas Yojana (PKVY)',
    category: 'Government Scheme',
    description: 'Government scheme promoting organic farming through cluster-based approach. Provides training on organic inputs preparation, vermicompost, biofertilizers, and assistance of ₹50,000/hectare over 3 years for organic certification.',
    fees: 'Free + Financial Assistance',
    duration: '3 years (phased)',
    imageUrl: 'https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 11
  },

  // ── Irrigation & Water Management ─────────────────────────────────
  {
    title: 'PMKSY – Drip & Sprinkler Irrigation Training',
    category: 'Training',
    description: 'Under Pradhan Mantri Krishi Sinchayee Yojana, farmers get trained on micro-irrigation system selection, installation, maintenance, and water scheduling for drip and sprinkler systems. Up to 90% subsidy available on equipment.',
    fees: 'Free (90% equipment subsidy)',
    duration: '3–7 days',
    imageUrl: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 12
  },

  // ── Post-Harvest & Value Addition ─────────────────────────────────
  {
    title: 'Post-Harvest Technology & Food Processing',
    category: 'Course',
    description: 'Training on grading, sorting, packaging, cold storage management, and food processing (pickles, jams, dried products) to reduce post-harvest losses and increase farmer income by 20–40%.',
    fees: '₹500 – ₹3,000',
    duration: '1–2 weeks',
    imageUrl: 'https://images.unsplash.com/photo-1506617564039-2f3b650b7010?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 13
  },
  {
    title: 'MANAGE – Agri-Business Management Course',
    category: 'Course',
    description: 'National Institute of Agricultural Extension Management (MANAGE) offers training on agri-business planning, market linkages, FPO management, digital marketing for farm produce, and financial management for agri-enterprises.',
    fees: 'Subsidized / Free for SC/ST',
    duration: '1 week – 3 months',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 14
  },

  // ── Pest Management ────────────────────────────────────────────────
  {
    title: 'Integrated Pest Management (IPM) Training',
    category: 'Training',
    description: 'Farmer Field School (FFS) based IPM training covering eco-friendly pest control: biological agents, pheromone traps, light traps, cultural practices, and safe pesticide use. Reduces chemical use by up to 50%.',
    fees: 'Free',
    duration: '1 crop season (3–4 months)',
    imageUrl: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 15
  },

  // ── Horticulture ───────────────────────────────────────────────────
  {
    title: 'National Horticulture Mission – Vegetable & Fruit Cultivation',
    category: 'Training',
    description: 'Training on high-density planting, protected cultivation (polyhouse/greenhouse), drip irrigation for horticulture crops, and marketing. Financial assistance up to ₹25,000/hectare available under NHM.',
    fees: 'Free + Subsidy',
    duration: '3–5 days',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 16
  },
  {
    title: 'Mushroom Cultivation Training',
    category: 'Skill Development',
    description: 'Hands-on training in oyster and button mushroom cultivation, spawn preparation, substrate management, pest control, and marketing. Highly profitable with ROI within 3–4 months. Low investment, high returns for small farmers.',
    fees: '₹500 – ₹2,000',
    duration: '5–7 days',
    imageUrl: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 17
  },

  // ── Animal Husbandry & Dairy ───────────────────────────────────────
  {
    title: 'Dairy Farming & Milk Production Training',
    category: 'Training',
    description: 'Training on scientific dairy management: cattle breed selection, balanced feeding, milk hygiene, artificial insemination, health management, and dairy cooperative linkage. Conducted by NABARD and State Dairy Federations.',
    fees: 'Free / ₹500',
    duration: '5–10 days',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 18
  },
  {
    title: 'Poultry Farming Skill Training',
    category: 'Skill Development',
    description: 'Practical training on backyard poultry farming, broiler and layer management, feed formulation, disease prevention, vaccination schedules, and marketing of eggs and meat for rural livelihood generation.',
    fees: 'Free – ₹1,000',
    duration: '1–2 weeks',
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 19
  },

  // ── Entrepreneurship ───────────────────────────────────────────────
  {
    title: 'RKVY-RAFAAR Agri-Startup Program',
    category: 'Entrepreneurship',
    description: 'Rashtriya Krishi Vikas Yojana agri-startup incubation scheme for young farmers and agri-entrepreneurs. Provides training, mentoring, and seed funding up to ₹5 lakhs for innovative agri-business ideas.',
    fees: 'Free (with funding support)',
    duration: '2 months',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 20
  },
  {
    title: 'FPO (Farmer Producer Organization) Formation Training',
    category: 'Entrepreneurship',
    description: 'Training on forming and managing Farmer Producer Organizations (FPOs) for collective bargaining power, bulk input purchase, shared machinery, collective marketing, and accessing bank credit at lower rates.',
    fees: 'Free',
    duration: '3–5 days',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 21
  },

  // ── Digital & Modern Farming ───────────────────────────────────────
  {
    title: 'Digital Agriculture & Smart Farming Workshop',
    category: 'Workshop',
    description: 'Workshop on using smartphone apps for weather forecasting, e-NAM for price discovery, drone-based spraying, remote soil sensors, and AI-based crop disease detection apps like Plantix and Kisan Suvidha.',
    fees: 'Free – ₹500',
    duration: '1–2 days',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 22
  },
  {
    title: 'Natural Farming (Zero Budget Natural Farming)',
    category: 'Course',
    description: 'Based on Subhash Palekar\'s Zero Budget Natural Farming philosophy. Training covers Jeevamrit, Bijamrit, Mulching, and Whapasa techniques to grow crops without chemical inputs at near-zero cost.',
    fees: 'Free – ₹1,000',
    duration: '3–5 days',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 23
  },

  // ── Beekeeping & Allied ────────────────────────────────────────────
  {
    title: 'Beekeeping & Honey Production Training',
    category: 'Skill Development',
    description: 'Training on scientific honey bee colony management, hive installation, seasonal management, queen rearing, honey extraction, processing, packaging, and marketing. Low-cost supplementary income for farmers.',
    fees: '₹500 – ₹2,000',
    duration: '5–7 days',
    imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 24
  },
  {
    title: 'Vermicomposting & Bio-Fertilizer Production',
    category: 'Training',
    description: 'Step-by-step training on setting up a vermicompost unit, earthworm management, using crop residue and kitchen waste, producing liquid biofertilizer, and reducing input costs by 30–40% through on-farm composting.',
    fees: 'Free – ₹500',
    duration: '3–5 days',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop',
    status: 'published',
    sortOrder: 25
  }
];

async function seedResources() {
  try {
    console.log('📚 Seeding agricultural resources...\n');

    // Get admin user
    const admin = await prisma.user.findFirst({ where: { role: 'SUPER_ADMIN' } });
    if (!admin) {
      throw new Error('No SUPER_ADMIN user found. Run seed.js first.');
    }

    // Delete old placeholder records and replace with full dataset
    await prisma.agriculturalResource.deleteMany({});
    console.log('🗑️  Cleared old resource records\n');

    let count = 0;
    for (const resource of resources) {
      await prisma.agriculturalResource.create({
        data: { ...resource, createdById: admin.id }
      });
      console.log(`✅ [${resource.category}] ${resource.title}`);
      count++;
    }

    console.log(`\n🎉 Done! ${count} agricultural resources added to database.`);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

seedResources();
