import React from "react";
import { useSelector } from "react-redux";
import { UserState } from "../../features/user/userSlice";

interface AppState {
  user: UserState;
}

export default function Home() {
  const currentUser = useSelector((state: AppState) => state.user.currentUser);
  console.log("currentUser selector: ", currentUser);
  return (
    <div>
      <h3>Home</h3>
      {currentUser ? <h3>{currentUser}</h3> : null}
    </div>
  );
}
