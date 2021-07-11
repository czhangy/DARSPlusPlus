let Course = require("../models/course.model");

// Retrieves all courses from the database => /courses
exports.findAll = (req, res) => {
  // Fetch
  Course.find()
    .then((courses) => res.json(courses))
    .catch((err) => res.status(400).json("Error: " + err));
};
