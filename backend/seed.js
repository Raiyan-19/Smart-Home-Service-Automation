require('dotenv').config();
const { connectDB } = require('./src/config/db');
const { seedDatabase } = require('./src/utils/seedData');

const run = async () => {
  await connectDB();
  await seedDatabase();
  console.log('Seeding script finished successfully.');
  process.exit(0);
};

run().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
