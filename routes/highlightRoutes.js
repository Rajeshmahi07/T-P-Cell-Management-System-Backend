const express = require("express");
const router = express.Router();

const {
  upsertHighlights,
  getHighlights,
} = require("../controllers/highlightController");

const { protect, authorize } = require("../middlewares/authMiddleware");

// ADMIN can create/update highlights
router.post("/", protect, authorize("admin"), upsertHighlights);

// PUBLIC can read highlights
router.get("/", getHighlights);

module.exports = router;
