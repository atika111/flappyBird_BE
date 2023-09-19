const express = require('express') 
const router = express.Router();
const userController = require('../controllers/userController')

// Get all users
router.get('/all', userController.getAllUsers);

// Delete a user 
router.delete('/:id', userController.deleteUser);

// Update a user 
router.put('/:id', userController.updateUser);






module.exports = router;