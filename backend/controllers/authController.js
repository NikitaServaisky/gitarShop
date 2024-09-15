const crypto = require('crypto');
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
    const newUser = new User({ name, secondName, age, email, tel, password: hashedPassword });
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

// Forgot-password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // // Generate a reset token
    // const resetToken = crypto.randomBytes(32).toString('hex');
    // const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    // // const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    // //   expiresIn: '5m',
    // // });
    // user.resetPasswordToken = hashedToken;
    // user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    user.tempToken = token;

    await user.save();

    // Create reset URL
    const resetURL = `http://localhost:5173/reset-password/${token}`;

    // Send the reset email
    const message = `You requested a password reset. Please use the following link to reset your password: ${resetURL}`;
    await sendEmail(user.email, 'Password Reset Request', message);

    res.status(200).json({ message: 'Password reset link sent to your email!' });
  } catch (err) {
    console.error('Error in forgot password:', err);
    res.status(500).json({ message: 'Error sending password reset email.' });
  }
};

// Reset-password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, passwordAgain } = req.body;
  // const decodedToken = decodeURIComponent(token);

  try {
    // const hashedToken = crypto.createHash('sha256').update(decodedToken).digest('hex');
    let userID;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
      userID = verified.userId;
    }
    const user = await User.findById(userID);
    // Debugging logs
    // console.log('Received token:', decodedToken);
    // console.log('Hashed token from URL:', hashedToken);

    // const user = await User.findOne({
    //   // resetPasswordToken: hashedToken,
    //   // resetPasswordExpires: { $gt: Date.now() },
    //   verified.userId,
    // });

    if (!user) {
      console.log('No matching user or token expired');
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    console.log('Found user with stored token:', token);

    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    if (newPassword === passwordAgain) {
      console.log(newPassword);
      user.password = newPassword;
    } else {
      res.status(400).json({ message: 'No Match between Password' });
    }

    // user.resetPasswordToken = undefined;
    // user.resetPasswordExpires = undefined;
    if (!user.password) res.status(400).json({ message: 'No Password' });

    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (err) {
    console.error('Error in resetting password:', err);
    res.status(500).json({ message: 'Error resetting password.' });
  }
};
