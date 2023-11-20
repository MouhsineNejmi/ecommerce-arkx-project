const router = require('express').Router();

const deserializeUser = require('../middlewares/deserialize-user.middleware');
const requireUser = require('../middlewares/require-user.middleware');
const { validate } = require('../middlewares/validate.middleware');

const {
  registerHandler,
  loginHandler,
  logoutHandler,
} = require('../controllers/auth.controller');

const { createUserSchema } = require('../schemas/user.schema');
const { loginSchema } = require('../schemas/auth.schema');

router.post('/register', validate(createUserSchema), registerHandler);

router.post('/login', validate(loginSchema), loginHandler);

router.use(deserializeUser, requireUser);

router.get('/logout', logoutHandler);

module.exports = router;
