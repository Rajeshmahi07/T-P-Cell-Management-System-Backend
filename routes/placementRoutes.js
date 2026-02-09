const express = require("express");
const {
  addPlacement,
  getAllPlacements,
  updatePlacement,
  deletePlacement,
  getPlacementCount,
  getAveragePackage,
} = require("../controllers/placementController");

const router = express.Router();

router.post("/", addPlacement);
router.get("/", getAllPlacements);
router.put("/update/:id", updatePlacement);
router.delete("/delete/:id", deletePlacement);
router.get("/count", getPlacementCount);
router.get("/average-package", getAveragePackage);

module.exports = router;
