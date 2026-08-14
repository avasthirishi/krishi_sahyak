import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

console.log('agriculturalResource type:', typeof prisma.agriculturalResource);
console.log('crop type:', typeof prisma.crop);

try {
  const count = await prisma.agriculturalResource.count();
  console.log('agriculturalResource count:', count);
} catch (e) {
  console.error('Error:', e.message);
}

await prisma.$disconnect();
await pool.end();
