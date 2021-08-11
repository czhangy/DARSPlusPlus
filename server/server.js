// Express framework
const express = require("express");
// Cross-origin scripting
const cors = require("cors");
// Database connection
const mongoose = require("mongoose");
// Use of .env
require("dotenv").config();
// Handle history routing
const history = require('connect-history-api-fallback');

// Init app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(history());

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
const coursesRouter = require("./routes/course.route");
const majorsRouter = require("./routes/major.route");
app.use("/api/courses", coursesRouter);
app.use("/api/majors", majorsRouter);

// Handle production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(__dirname + "/public/"));
  // Handle SPA routing
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
