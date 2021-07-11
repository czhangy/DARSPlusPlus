let Major = require("../models/major.model");

// Retrieves all majors from the database => /majors
exports.findAll = (req, res) => {
  // Fetch
  Major.find()
    .then((majors) => res.json(majors))
    .catch((err) => res.status(400).json("Error: " + err));
};

// Retrieves a specific major based on name => /majors/:majorName
exports.findMajor = (req, res) => {
  // Get name from route
  const name = req.params.majorName;
  // Fetch using name as condition
  Major.find({ name: name })
    .then((major) => res.json(major))
    .catch((err) => res.status(400).json("Error: " + err));
};
