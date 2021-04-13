const router = require('express').Router();

const usersRoutes = require('./usersRoutes');
const emailerRoutes = require('./emailerRoutes');
const projectsRoutes = require('./projectsRoutes');
const commentsRoutes = require('./commentsRoutes');

router.use('/users', usersRoutes);
router.use('/emailers', emailerRoutes);
router.use('/projects', projectsRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;