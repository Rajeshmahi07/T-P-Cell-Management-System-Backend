const express = require("express");
const router = express.Router();

const {
  createTraining,
  getAllTrainings,
  getTrainingById,
  updateTraining,
  deleteTraining,
} = require("../controllers/trainingController");

const { protect, authorize } = require("../middlewares/authMiddleware");

// CREATE (ADMIN ONLY)
router.post("/", protect, authorize("admin"), createTraining);

// READ ALL (PUBLIC or AUTH — your choice, keeping public)
router.get("/", getAllTrainings);

// READ SINGLE
router.get("/:id", getTrainingById);

// UPDATE (ADMIN ONLY)
router.put("/:id", protect, authorize("admin"), updateTraining);

// DELETE (ADMIN ONLY)
router.delete("/:id", protect, authorize("admin"), deleteTraining);

module.exports = router;
