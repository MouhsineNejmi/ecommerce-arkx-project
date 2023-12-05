import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  total_amount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    listCartItems: (state, action) => {
      state.cart = action.payload.cart;
    },
    addProductToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find(
        (item) => item.product._id === newItem._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...newItem, quantity: 1 });
      }
    },
    removeProductFromCart: (state, action) => {
      const itemId = action.payload;
      state.cart = state.cart.filter((item) => item.product._id !== itemId);
    },
    decreaseProductQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cart.find(
        (item) => item.product._id === itemId
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== itemId);
        }
      }
    },
    clearCart: () => initialState,
  },
});

export const {
  listCartItems,
  addProductToCart,
  decreaseProductQuantity,
  removeProductFromCart,
  clearCart,
} = cartSlice.actions;

export const cartSelector = (state) => state.cartSlice.cart;
export const selectTotalAmount = createSelector([cartSelector], (cart) => {
  return cart.reduce((total, item) => {
    return total + item.quantity * item.product.price;
  }, 0);
});

export default cartSlice.reducer;
