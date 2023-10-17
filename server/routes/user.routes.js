const router = require('express').Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
  isUserAdminOrManager,
  isUserAdmin,
} = require('../middlewares/user.middleware');
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
router.put('/user/:id', isUserAdmin, upload.single('image'), updateUserData);
router.delete('/user/:id', isUserAdmin, deleteUserAccount);

module.exports = router;
