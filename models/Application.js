const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: { type: String, required: true },
    role: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    enrollmentNo: { type: String, required: true },
    course: { type: String, required: true },
    department: { type: String, required: true },
    resumeLink: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Application", applicationSchema);
