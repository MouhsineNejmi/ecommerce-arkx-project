const router = require('express').Router();
const { body } = require('express-validator');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
  upload.single('image'),
  register
);

router.post('/login', login);

module.exports = router;
