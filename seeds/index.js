const sequelize = require('../config/connection');
const blogSeed = require('./blogSeeds');
const userSeed = require('./userSeeds');

const seedBlogs = async () => {
  await sequelize.sync({ force: true });

  await userSeed();
  await blogSeed();


  process.exit(0);
};

seedBlogs();
