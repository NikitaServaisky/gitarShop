const { body, validationResult } = require('express-validator');

// Validation middleware for registration
const validateRegistration = [
  body('name').notEmpty().withMessage('Name is required'),
  body('secondName').notEmpty().withMessage('Second name is required'),
  body('age').isInt({ min: 15 }).withMessage('Age must be at least 15'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('tel')
    .matches(/^\d{10}$/)
    .withMessage('Valid 10-digit phone number is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation middleware for login
const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateRegistration, validateLogin };
