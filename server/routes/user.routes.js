const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  searchUser,
  updateUserData,
  deleteUserAccount,
  getMyProfileData,
} = require('../controllers/user.controller');

const deserializeUser = require('../middlewares/deserialize-user.middleware');
const requireUser = require('../middlewares/require-user.middleware');
const restrictTo = require('../middlewares/restrict-to.middleware');

router.use(deserializeUser, requireUser);

router.get('/', restrictTo('admin'), getAllUsers);
router.get('/profile', getMyProfileData);
router.get('/user/:id', restrictTo('admin', 'manager'), getUserById);
router.get('/user', restrictTo('admin', 'manager'), searchUser);
router.put('/user/:id', restrictTo('admin'), updateUserData);
router.delete('/user/:id', restrictTo('admin'), deleteUserAccount);

module.exports = router;
