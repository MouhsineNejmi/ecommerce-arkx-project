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
router.get('/:id', isUserAdminOrManager, getUserById);

module.exports = router;
