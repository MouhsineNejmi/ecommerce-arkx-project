const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});

const Favorites = mongoose.model('Favorite', favoritesSchema);
module.exports = Favorites;
