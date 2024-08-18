//definition routes
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const sendEmail = require('../utils/sendEnails');

//get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ data: users, message: 'Successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get one user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ data: user, message: 'successfuly' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//create new user
router.post('/', async (req, res) => {
  const { name, secondName, age, email, tel, password } = req.body;

  const newUser = new User({ name, secondName, age, email, tel, password });
  try {
    await newUser.save();
    sendEmail(newUser.email, 'Welcome to Guitar Shop', 'Thank you for registering!');
    sendEmail(
      process.env.EMAIL,
      'New Customer Registered',
      `A new customer named ${newUser.name} has registered.`,
    );
    res.status(201).json({ data: newUser, message: 'Created Successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // chack that
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, message: 'Login successful!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//editing user
router.put('/:id', async (req, res) => {
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
    if (password && password !== user.password) {
      user.password = password;
    }

    await user.save();
    sendEmail(user.email, 'Welcome to Guitar Shop', 'update!');
    sendEmail(
      process.env.EMAIL,
      'Customer update',
      `A new customer named ${user.name} has update.`,
    );
    res.status(200).json({ data: user, message: 'Updated Successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
