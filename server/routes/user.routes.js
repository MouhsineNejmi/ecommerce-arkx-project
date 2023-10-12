const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator');
const {
    userAuthentication,
    userRegister,
    getAllUserList,
    getUserById,
    searchUser,
    updateUserData,
    deleteUser
} = require('../controllers/user.controller');

// router.post('/login',[
//     body('email', 'Please include a valid email').isEmail(),
//     body('password', 'Password is required').exists(),
//   ],
//   userAuthentication
// );
router.post('/login', userAuthentication)
router.post('/register', userRegister);
router.get('/', getAllUserList);
router.get('/:id', getUserById);
router.get('/search', searchUser);
router.put('/:id', updateUserData);
router.delete('/:id', deleteUser);



module.exports = router;



