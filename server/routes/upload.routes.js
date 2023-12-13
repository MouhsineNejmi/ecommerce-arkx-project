const router = require('express').Router();

const deserializeUser = require('../middlewares/deserialize-user.middleware');
const requireUser = require('../middlewares/require-user.middleware');

const { uploadMultipleImages } = require('../upload/mutliple.upload');

const {
  uploadImagesToCloudinary,
  deleteImageFromCloudinary,
} = require('../controllers/upload.controller');

router.use(deserializeUser, requireUser);

router.post('/', uploadMultipleImages, uploadImagesToCloudinary);
router.delete('/:public_id', deleteImageFromCloudinary);

module.exports = router;
