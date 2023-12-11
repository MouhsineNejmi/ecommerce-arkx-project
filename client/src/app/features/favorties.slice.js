import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    listFavorites: (state, action) => {
      state.cart = action.payload.cart;
    },
    addProductToFavorites: (state, action) => {
      const newItem = action.payload;
      state.favorites.push(newItem);
    },
    removeProductFromFavorites: (state, action) => {
      const itemId = action.payload;
      state.cart = state.favorites.filter((item) => item._id !== itemId);
    },
    clearFavorites: () => initialState,
  },
});

export const {
  listFavorites,
  addProductToFavorites,
  removeProductFromFavorites,
  clearFavorites,
} = favoritesSlice.actions;

export const favoritesSelector = (state) => state.favoritesSlice.favorites;

export default favoritesSlice.reducer;
