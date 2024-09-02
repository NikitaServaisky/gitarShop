// //definition routes
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const sendEmail = require('../utils/sendEmail');
// const { validateRegistration, validateLogin } = require('../middlewares/validation');

// const publicRouter = express.Router();
// const protectedRouter = express.Router();

// //public routes without authentiction

// //Register a new user
// publicRouter.post('/register', validateRegistration, async (req, res) => {
//   const { name, secondName, age, email, tel, password } = req.body;

//   // Validate request
//   if (!name || !secondName || !age || !email || !password) {
//     return res.status(400).json({ message: 'Please provide all required fields' });
//   }

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already in use' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new User({ name, secondName, age, email, tel, password: hashedPassword });
//     await newUser.save();

//     // Generate JWT Token
//     const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

//     // Send welcome emails
//     sendEmail(newUser.email, 'Welcome to Guitar Shop', 'Thank you for registering!');
//     sendEmail(
//       process.env.EMAIL,
//       'New Customer Registered',
//       `A new customer named ${newUser.name} has registered.`,
//     );

//     // Respond with new user data and token
//     res.status(201).json({
//       token,
//       user: { id: newUser._id, name: newUser.name, email: newUser.email },
//       message: 'Created Successfully!',
//     });
//   } catch (err) {
//     console.error('Error during registration:', err);
//     res.status(500).json({ message: err.message });
//   }
// });

// //login user
// publicRouter.post('/login', validateLogin, async (req, res) => {
//   const { email, password } = req.body;

//   // Validate request
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Please provide email and password' });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
//     res.status(200).json({ token, message: 'Login successful!' });
//   } catch (err) {
//     console.error('Error during login:', err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// //protected routes authentication required

// //get all users
// protectedRouter.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json({ data: users, message: 'Successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// //get one user by id
// protectedRouter.get('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json({ data: user, message: 'successfuly' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get all users
// protectedRouter.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json({ data: users, message: 'Successfully fetched users.' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// //editing user
// protectedRouter.put('/:id', async (req, res) => {
//   const { name, secondName, age, email, tel, password } = req.body;
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     user.name = name;
//     user.secondName = secondName;
//     user.age = age;
//     user.email = email;
//     user.tel = tel;
//     if (password) {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       user.password = hashedPassword;
//     }

//     await user.save();
//     sendEmail(user.email, 'Welcome to Guitar Shop', 'update!');
//     sendEmail(
//       process.env.EMAIL,
//       'Customer update',
//       `A new customer named ${user.name} has update.`,
//     );
//     res.status(200).json({ data: user, message: 'Updated Successfully!' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = { publicRouter, protectedRouter };
