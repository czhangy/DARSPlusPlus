const router = require('express').Router();

// Controllers
const MajorCtrl = require('../controllers/major.controller');

// Define routes
router.get("/", MajorCtrl.findAll);
router.get("/name/:majorName", MajorCtrl.findMajorByName);
router.get("/hash/:hash", MajorCtrl.findMajorByHash);

module.exports = router;
