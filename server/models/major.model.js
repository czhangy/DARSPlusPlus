const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const majorSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  reqCourses: {
    type: Object,
    default: {},
  },
  labels: {
    type: Array,
    default: [],
  },
  numGEs: {
    type: Number,
    default: 5,
  },
  numTechBreadths: {
    type: Number,
    default: 3,
  },
  numSciTechs: {
    type: Number,
    default: 0,
  },
  numWritings: {
    type: Number,
    default: 1,
  },
  numLangs: {
    type: Number,
    default: 0,
  },
  numEthics: {
    type: Number,
    default: 1,
  },
  numElectives: {
    type: Number,
    default: 5,
  },
});

const Major = mongoose.model("Major", majorSchema);

module.exports = Major;
