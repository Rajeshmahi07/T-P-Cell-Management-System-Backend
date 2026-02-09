const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/authMiddleware");
const { applyJob } = require("../controllers/applicationController");
const Application = require("../models/Application");   // ✅ IMPORTANT FIX

// ================= STUDENT: APPLY FOR JOB =================
router.post("/apply/:jobId", protect, applyJob);

// ================= ADMIN: GET ALL APPLICATIONS =================
router.get(
  "/",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const applications = await Application.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        applications,
      });
    } catch (error) {
      console.error("Fetch applications error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch applications",
      });
    }
  }
);

module.exports = router;
