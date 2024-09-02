const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authToken');

// Get all users
router.get('/',authenticateToken, getAllUsers);

// Get a user by ID
router.get('/:id',authenticateToken, getUserById);

// Update a user
router.put('/:id',authenticateToken, updateUser);

module.exports = router;
