const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser } = require('../controllers/userController');

// Get all users
router.get('/', getAllUsers);

// Get a user by ID
router.get('/:id', getUserById);

// Update a user
router.put('/:id', updateUser);

module.exports = router;
