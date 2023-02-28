const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./blogRoutes');


router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;