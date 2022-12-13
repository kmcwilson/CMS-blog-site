const sequelize = require('../config/connection');
const blogSeed = require('./blogSeeds');
const userSeed = require('./userSeeds');

const seedBlogs = async () => {
  await sequelize.sync({ force: true });

  await blogSeed();

  await userSeed();

  process.exit(0);
};

seedBlogs();
