const router = require('express').Router();

const { isUserAuthenticated } = require('../middlewares/auth.middleware');
const {
  getAllUsers,
  searchUser,
  getUserById,
  updateUserData,
  deleteUserAccount,
  getUserProfile,
} = require('../controllers/user.controller');

router.get('/admin', isUserAuthenticated, (req, res) => {
  res.json({ message: 'Welcome authenticated user' });
});

module.exports = router;
