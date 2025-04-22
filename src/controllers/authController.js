const userService = require('../services/userService');
const { generateToken } = require('../utils/jwt');

// User login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.authenticateUser(email, password);
    const token = generateToken({ id: user._id, role: user.role });
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
};
