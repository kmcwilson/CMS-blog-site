const { User } = require('../models');

const userData = [
    {
        id: 1,
        name: 'kBall',
        email: 'kBall@123.com',
        password: '1234'
    },
    {
        id: 2,
        name: 'AWilson',
        email: 'aWil@123.com',
        password: '1234'
    },

];

const userSeed = () => User.bulkCreate(userData);

module.exports = userSeed;