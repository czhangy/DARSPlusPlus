const router = require('express').Router();

// Controllers
const CourseCtrl = require('../controllers/course.controller');

// Define routes
router.get("/", CourseCtrl.findAll);

module.exports = router;
