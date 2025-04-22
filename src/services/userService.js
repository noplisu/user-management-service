const User = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/hash');

// Register a new user
const registerUser = async ({ name, email, password, role }) => {
  // Check if user exists
  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error('Email already registered');
    err.status = 409;
    throw err;
  }
  const hashed = await hashPassword(password);
  const user = new User({ name, email, password: hashed, role });
  await user.save();
  user.password = undefined; // Remove password from response
  return user;
};

// Authenticate user
const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }
  user.password = undefined;
  return user;
};

// Get user by ID
const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
  return user;
};

module.exports = {
  registerUser,
  authenticateUser,
  getUserById,
};
