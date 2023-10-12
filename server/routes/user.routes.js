const router = require('express').Router();

const { isUserAdminOrManager } = require('../middlewares/user.middleware');
const {
  getAllUsers,
  getUserById,
  searchUser,
  updateUserData,
  deleteUserAccount,
  getUserProfile,
} = require('../controllers/user.controller');

router.get('/', isUserAdminOrManager, getAllUsers);
router.get('/user/:id', isUserAdminOrManager, getUserById);
router.get('/user', isUserAdminOrManager, searchUser);

module.exports = router;
