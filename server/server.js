// Express framework
const express = require("express");
// Cross-origin scripting
const cors = require("cors");
// Database connection
const mongoose = require("mongoose");

require("dotenv").config();

// Init app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB setup
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.log(err));

// Apply routes
const coursesRouter = require('./routes/course.route');
const majorsRouter = require('./routes/major.route')
app.use('/courses', coursesRouter);
app.use('/majors', majorsRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
