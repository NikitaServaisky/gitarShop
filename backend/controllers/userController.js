const User = require('../models/User');
const bcrypt = require('bcrypt');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ data: users, message: 'Successfully fetched users.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ data: user, message: 'Successfully fetched user.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  const { name, secondName, age, email, tel, password } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.name = name;
    user.secondName = secondName;
    user.age = age;
    user.email = email;
    user.tel = tel;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();
    res.status(200).json({ data: user, message: 'Updated Successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user data after login
exports.userData = async (req, res) => {
  try {
    const userId = req.user.userId; // Extract the userId from the verified token

    if (!userId) {
      return res.status(400).json({ message: 'User ID not found' });
    }

    const user = await User.findById(userId).select('-password'); // Find user by ID, exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user); // Send the user data
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
