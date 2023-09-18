const express = require('express') 
const router = express.Router();
const scoreController = require('../controllers/scoreController');

// CREATE
router.post('/', scoreController.addScore);

// // READ
router.get('/', scoreController.getAllScores);
router.get('/:id',scoreController.getUsersHistoryScores);
router.get('/last/:id',scoreController.getLastScore);
router.get('/high/:id',scoreController.getHighestScore);








module.exports = router;