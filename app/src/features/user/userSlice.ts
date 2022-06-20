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
    addUser(state, action) {
      console.log("dispatched action: ", action);
      console.log("state: ", state);
      state.currentUser = action.payload.currentUser;
      state.isLoggedIn = true;
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
