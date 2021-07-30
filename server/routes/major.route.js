const router = require('express').Router();

// Controllers
const MajorCtrl = require('../controllers/major.controller');

// Define routes
router.get("/", MajorCtrl.findAll);
router.get("/:majorName", MajorCtrl.findMajor);

module.exports = router;
