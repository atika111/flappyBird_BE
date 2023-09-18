const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/scoreController");
const { verifyToken } = require("../middleware/authMiddleware");

// CREATE
router.post("/", verifyToken, scoreController.addScore);

// READ
router.get("/", verifyToken, scoreController.getAllScores);
router.get("/:id", verifyToken, scoreController.getUsersHistoryScores);
router.get("/last/:id", verifyToken, scoreController.getLastScore);
router.get("/high/:id", verifyToken, scoreController.getHighestScore);

module.exports = router;
