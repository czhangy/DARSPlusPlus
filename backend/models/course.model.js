const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  units: {
    type: Number,
    required: true,
  },
  prereqs: {
    type: Array,
    default: [],
  },
  reqFor: {
    type: Array,
    default: [],
  },
  isGE: {
    type: Boolean,
    default: false,
  },
  isElective: {
    type: Boolean,
    default: false,
  },
  isTechBreadth: {
    type: Boolean,
    default: false,
  },
  isSciTech: {
    type: Boolean,
    default: false,
  },
  isLang: {
    type: Boolean,
    default: false,
  },
  isWriting: {
    type: Boolean,
    default: false,
  },
  isEthics: {
    type: Boolean,
    default: false,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
