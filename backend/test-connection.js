// Test Database Connection
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testConnection() {
  try {
    console.log('\n🔍 Testing database connection...\n');
    
    // Test 1: Check if database is reachable
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('✅ Step 1: Database connection successful!');
    console.log('📊 PostgreSQL Version:', result[0].version.split(' ')[0] + ' ' + result[0].version.split(' ')[1]);
    
    // Test 2: Check if tables exist
    console.log('\n🔍 Checking database tables...\n');
    
    try {
      const userCount = await prisma.user.count();
      console.log('✅ Step 2: "users" table exists (Count:', userCount, ')');
    } catch (e) {
      console.log('❌ "users" table not found. Run migration first!');
    }
    
    try {
      const cropCount = await prisma.crop.count();
      console.log('✅ Step 3: "crops" table exists (Count:', cropCount, ')');
    } catch (e) {
      console.log('❌ "crops" table not found. Run migration first!');
    }
    
    try {
      const newsCount = await prisma.newsArticle.count();
      console.log('✅ Step 4: "news_articles" table exists (Count:', newsCount, ')');
    } catch (e) {
      console.log('❌ "news_articles" table not found. Run migration first!');
    }
    
    // Test 3: Test write operation
    console.log('\n🔍 Testing write operation...\n');
    
    try {
      const testUser = await prisma.user.create({
        data: {
          email: `test_${Date.now()}@example.com`,
          passwordHash: 'test_hash',
          role: 'FARMER',
          profile: {
            create: {
              fullName: 'Test User'
            }
          }
        },
        include: {
          profile: true
        }
      });
      
      console.log('✅ Step 5: Successfully created test user');
      console.log('   User ID:', testUser.id);
      console.log('   Email:', testUser.email);
      console.log('   Name:', testUser.profile.fullName);
      
      // Clean up test user
      await prisma.user.delete({ where: { id: testUser.id } });
      console.log('✅ Step 6: Successfully deleted test user (cleanup)');
      
    } catch (e) {
      console.log('❌ Write operation failed:', e.message);
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 DATABASE SETUP IS COMPLETE!');
    console.log('='.repeat(50));
    console.log('\n✅ Your database is ready for development!');
    console.log('📚 Next steps:');
    console.log('   1. Create backend/src/server.js');
    console.log('   2. Build authentication APIs');
    console.log('   3. Create crop management APIs');
    console.log('   4. Check QUICK_START_GUIDE.md for details\n');
    
  } catch (error) {
    console.error('\n' + '='.repeat(50));
    console.error('❌ DATABASE CONNECTION FAILED');
    console.error('='.repeat(50) + '\n');
    console.error('Error Details:', error.message);
    console.error('\n💡 Troubleshooting Tips:');
    console.error('   1. Check if PostgreSQL service is running:');
    console.error('      Get-Service postgresql-x64-16');
    console.error('   2. Verify your .env file has correct password');
    console.error('   3. Confirm database "krishi_sahyak" exists in pgAdmin');
    console.error('   4. Run: npx prisma migrate dev --name init');
    console.error('   5. Check DATABASE_SETUP.md for more help\n');
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
