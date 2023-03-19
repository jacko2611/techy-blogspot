const seedBlogs = require('./postSeed.js');
const seedComments = require('./commentSeed.js');
const seedUsers = require('./userSeed.js');
const sequelize = require('../config/connection');

const saltRounds = 10;

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('\n----- Users are SYNCED -----\n');

  await seedBlogs();
  console.log('\n----- Posts are SYNCED -----\n');

  await seedComments();
  console.log('\n----- Comments are SYNCED -----\n');

  process.exit(0);
};

seedAll();