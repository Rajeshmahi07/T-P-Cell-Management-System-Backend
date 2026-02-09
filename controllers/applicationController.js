const Application = require("../models/Application");

exports.applyJob = async (req, res) => {
  try {
    const application = await Application.create({
      user: req.user._id,
      company: req.body.company,
      role: req.body.role,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      enrollmentNo: req.body.enrollmentNo,
      course: req.body.course,
      department: req.body.department,
      resumeLink: req.body.resumeLink,
    });

    res.status(201).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("Apply job error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to apply for job",
    });
  }
};
