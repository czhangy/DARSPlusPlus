const router = require("express").Router();
let Major = require("../models/major.model");

router.route("/").get((req, res) => {
  Major.find()
    .then((majors) => res.json(majors))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;