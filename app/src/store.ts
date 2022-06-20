import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import { UserState } from "./features/user/userSlice";

export interface StoreInterface {
  user: UserState;
}

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
