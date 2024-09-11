const express = require('express');
const router = express.Router();
const { validateRegistration, validateLogin } = require('../middlewares/validation');
const {
  registerUser,
  loginUser,
} = require('../controllers/authController');

// Register a new user
router.post('/register', validateRegistration, registerUser);

// Login user
router.post('/login', validateLogin, loginUser);

module.exports = router;
