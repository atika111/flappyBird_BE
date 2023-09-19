const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {
  verifyPassword,
  passwordMatch,
  getUserByToken,
} = require('../middleware/authMiddleware');

// CREATE
router.post('/signup', passwordMatch, authController.signUp);
router.post('/login', verifyPassword, authController.logIn);

// READ
router.get('/logout', authController.logOut);
router.get('/current-user', authController.getUserByToken);

module.exports = router;
