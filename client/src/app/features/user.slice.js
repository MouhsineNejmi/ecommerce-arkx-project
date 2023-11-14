import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  access_token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
    },
    logout: () => initialState,
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
