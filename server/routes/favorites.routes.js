const express = require('express');
const router = express.Router();

const {
  addToFavorites,
  getFavoritesProductsById,
  getAllFavoritesProducts,
  deleteFavoritesProducts,
} = require('../controllers/favorites.controller');

const deserializeUser = require('../middlewares/deserialize-user.middleware');
const requireUser = require('../middlewares/require-user.middleware');

const { restrictToCustomer } = require('../middlewares/restrict-to.middleware');

router.use(deserializeUser, requireUser);

router.get('/', restrictToCustomer, getAllFavoritesProducts);
router.get('/:favorite_id', restrictToCustomer, getFavoritesProductsById);
router.post('/add', restrictToCustomer, addToFavorites);
router.delete(
  '/delete/:favorite_id',
  restrictToCustomer,
  deleteFavoritesProducts
);

module.exports = router;
