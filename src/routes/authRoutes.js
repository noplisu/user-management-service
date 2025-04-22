const express = require('express');
const { login } = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

// User login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
  ],
  login
);

module.exports = router;
