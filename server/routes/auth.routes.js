const router = require('express').Router();
const { body } = require('express-validator');

const { registerUser, loginUser } = require('../controllers/auth.controller');

router.post(
  '/register',
  [
    body('email', 'Please enter a valid email').isEmail(),
    body(
      'password',
      'Your password should be between 6 and 30 characters'
    ).isLength({ min: 6, max: 30 }),
  ],
  registerUser
);

router.post('/login', loginUser);

module.exports = router;
