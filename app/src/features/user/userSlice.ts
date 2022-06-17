import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  currentUser: string | null;
}

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      console.log("dispatched action: ", action);
      console.log("state: ", state);
      state.currentUser = action.payload.currentUser;
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
