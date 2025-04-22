const express = require('express');
const { register, getProfile } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

const router = express.Router();

// Register user
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
  ],
  register
);

// Get current user profile
router.get('/me', authenticate, getProfile);

module.exports = router;
