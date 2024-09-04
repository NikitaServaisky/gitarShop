const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, secondName, age, email, tel, password } = req.body;

  // Validate request
  if (!name || !secondName || !age || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, secondName, age, email, tel, password });
    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Send welcome emails
    sendEmail(newUser.email, 'Welcome to Guitar Shop', 'Thank you for registering!');
    sendEmail(
      process.env.EMAIL,
      'New Customer Registered',
      `A new customer named ${newUser.name} has registered.`,
    );

    // Respond with new user data and token
    res.status(201).json({
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
      message: 'Created Successfully!',
    });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email || !password) {
    console.log('Email or password missing'); // Debugging log
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    console.log('Finding user by email:', email); // Debugging log
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found'); // Debugging log
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Comparing passwords'); // Debugging log
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch'); // Debugging log
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Generating token'); // Debugging log
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    console.log('Login successful'); // Debugging log
    res.status(200).json({ token, message: 'Login successful!' });
  } catch (err) {
    console.error('Error during login:', err); // Debugging log
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

