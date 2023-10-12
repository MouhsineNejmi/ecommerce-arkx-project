const router = require('express').Router();

const { isUserAdminOrManager } = require('../middlewares/user.middleware');
const {
  getAllUsers,
  getUserById,
  searchUser,
  updateUserData,
  deleteUserAccount,
} = require('../controllers/user.controller');

router.get('/', isUserAdminOrManager, getAllUsers);
router.get('/user/:id', isUserAdminOrManager, getUserById);
router.get('/user', isUserAdminOrManager, searchUser);
router.put('/user/:id', isUserAdminOrManager, updateUserData);
router.delete('/user/:id', isUserAdminOrManager, deleteUserAccount);

module.exports = router;
