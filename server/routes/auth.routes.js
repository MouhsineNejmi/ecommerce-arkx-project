const router = require('express').Router();
const { body } = require('express-validator');

const { register, login } = require('../controllers/auth.controller');

router.post(
  '/register',
  [
    body('email', 'Please enter a valid email').isEmail(),
    body(
      'password',
      'Your password should be between 6 and 30 characters'
    ).isLength({ min: 6, max: 30 }),
  ],
  register
);

router.post('/login', login);

module.exports = router;
