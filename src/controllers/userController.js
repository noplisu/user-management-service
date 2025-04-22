const userService = require('../services/userService');

// Register a new user
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await userService.registerUser({ name, email, password, role });
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

// Get user profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.id);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};
