const router = require('express').Router();
const questionRoutes = require('./question');

// Running Stat and Challenge routes
router.use('/questions', questionRoutes);

module.exports = router;
