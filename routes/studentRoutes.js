const express = require("express");
const {
  createStudent,
  getAllStudents,
  getStudentCount,
  updateStudent,
  deleteStudent,
  updateMyProfile,
} = require("../controllers/studentController");

// CORRECT PATH (your folder is "middlewares")
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// ===== STUDENT: GET OWN PROFILE =====
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user, // comes from auth middleware
  });
});

// ===== STUDENT: UPDATE OWN PROFILE =====
router.put("/me", protect, updateMyProfile);

// ===== ADMIN ROUTES =====
router.post("/", createStudent);
router.get("/", getAllStudents);
router.get("/count", getStudentCount);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
