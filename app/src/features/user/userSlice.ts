import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  currentUser: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      console.log("dispatched action: ", action);

      state.currentUser = action.payload.currentUser;
      state.isLoggedIn = true;
    },
    signOutUser(state) {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginUser, signOutUser } = userSlice.actions;

export default userSlice.reducer;
