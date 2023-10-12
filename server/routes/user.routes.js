const router = require('express').Router();

const {
  isUserAdmin,
  isUserAuthenticated,
} = require('../middlewares/user.middleware');
const {
  getAllUsers,
  searchUser,
  getUserById,
  updateUserData,
  deleteUserAccount,
  getUserProfile,
} = require('../controllers/user.controller');

router.get('/admin', isUserAdmin, (req, res) => {
  res.json({ message: 'Welcome authenticated user' });
});

router.get('/', isUserAuthenticated, getAllUsers);

module.exports = router;
