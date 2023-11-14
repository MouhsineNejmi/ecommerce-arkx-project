const router = require('express').Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const deserializeUser = require('../middlewares/deserialize-user.middleware');
const requireUser = require('../middlewares/require-user.middleware');
const { validate } = require('../middlewares/validate.middleware');

const {
  registerHandler,
  loginHandler,
  logoutHandler,
} = require('../controllers/auth.controller');
const { createUserSchema, loginUserSchema } = require('../schemas/user.schema');

router.post(
  '/register',
  validate(createUserSchema),
  upload.single('image'),
  registerHandler
);

router.post('/login', validate(loginUserSchema), loginHandler);

router.use(deserializeUser, requireUser);

router.get('/logout', logoutHandler);

module.exports = router;
