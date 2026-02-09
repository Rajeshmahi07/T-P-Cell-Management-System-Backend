const mongoose = require("mongoose");

const highlightSchema = new mongoose.Schema(
  {
    studentsTrained: {
      type: String,
      required: true,
    },
    partnerCompanies: {
      type: String,
      required: true,
    },
    placementRate: {
      type: String,
      required: true,
    },
    highestPackage: {
      type: String,
      required: true,
    },
    averagePackage: {
      type: String,
      required: true,
    },
    trainingPrograms: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Highlight", highlightSchema);
