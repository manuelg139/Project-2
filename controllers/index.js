const router = require('express').Router();

const userRoutes = require('./usersRoutes');
const projectsRoutes = require('./projectsRoutes');
const commentRoutes = require('./commentsRoutes');
const emailerRoutes = require('./emailerRoutes');


router.use('/users', userRoutes);
router.use('/posts', projectsRoutes);
router.use('/comments', commentRoutes);
router.use('/emailer', emailerRoutes);

module.exports = router;