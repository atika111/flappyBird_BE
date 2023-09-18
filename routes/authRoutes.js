const express = require('express') 
const router = express.Router();
const authController = require('../controllers/authController')
const {verifyPassword, passwordMatch} = require('../middleware/authMiddleware')

// CREATE
router.post('/signup', passwordMatch, authController.signUp)

// READ
router.post('/login', verifyPassword, authController.logIn)








module.exports = router;