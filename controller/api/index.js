const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require(`./blog-routes`);

router.use(`/post`, postRoutes);
router.use('/users', userRoutes);

module.exports = router;