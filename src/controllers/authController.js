// controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
// Controller function to handle user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

     // Generate JWT token
     const token = jwt.sign(
        { userId: user._id, email: user.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );
  

      res.status(200).json({
        message: 'Login successful',
        token,
        user: { email: user.email, name: user.name }
      });
  } catch (error) {
    console.error('Error during login:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to create a new user
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      name,
      email,
      password 
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ message: 'Error creating user' });
  }
};

module.exports = {
  loginUser,
  createUser
};
