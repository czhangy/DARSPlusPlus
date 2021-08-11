let Major = require("../models/major.model");
let Course = require("../models/course.model");

// Retrieves all majors from the database => /majors
exports.findAll = (req, res) => {
  // Fetch
  Major.find()
    .then((majors) => res.status(200).json(majors))
    .catch((err) => res.status(400).json("Error: " + err));
};

// Retrieves a specific major based on name => /majors/name/:majorName
exports.findMajorByName = async (req, res) => {
  try {
    // Get name from route
    const name = req.params.majorName;
    // Fetch major object using name as condition
    let major = (await Major.find({ name: name }))[0];
    for (let i of major.labels)
      for (let j = 0; j < major.reqCourses[i].length; j++) {
        if (Array.isArray(major.reqCourses[i][j]))
          // Replace course IDs with course objects
          for (let k = 0; k < major.reqCourses[i][j].length; k++)
            await Course.findById(major.reqCourses[i][j][k])
              .then((course) => (major.reqCourses[i][j][k] = course))
              .catch((err) => res.status(400).json("Error: " + err));
        // Fetch course using ID and replace ID with the course object
        else
          await Course.findById(major.reqCourses[i][j])
            .then((course) => (major.reqCourses[i][j] = course))
            .catch((err) => res.status(400).json("Error: " + err));
      }
    // Return the response
    return res.status(200).json(major);
  } catch (err) {
    // Send error message
    return res.status(400).json("Error: " + err);
  }
};

// Retrieves a specific major based on hash => /majors/hash/:hash
exports.findMajorByHash = async (req, res) => {
  try {
    // Get name from route
    const hash = req.params.hash;
    // Fetch major object using name as condition
    let major = (
      await Major.find({ hashNum: hash }).catch((err) =>
        res.status(400).json("Error: " + err)
      )
    )[0];
    for (let i of major.labels)
      for (let j = 0; j < major.reqCourses[i].length; j++) {
        if (Array.isArray(major.reqCourses[i][j]))
          // Replace course IDs with course objects
          for (let k = 0; k < major.reqCourses[i][j].length; k++)
            await Course.findById(major.reqCourses[i][j][k])
              .then((course) => (major.reqCourses[i][j][k] = course))
              .catch((err) => res.status(400).json("Error: " + err));
        // Fetch course using ID and replace ID with the course object
        else
          await Course.findById(major.reqCourses[i][j])
            .then((course) => (major.reqCourses[i][j] = course))
            .catch((err) => res.status(400).json("Error: " + err));
      }
    // Return the response
    return res.status(200).json(major);
  } catch (err) {
    // Send error message
    return res.status(400).json("Error: " + err);
  }
};
