import React from "react";
import "./Home.css";
import { useSelector } from "react-redux";
import { UserState } from "../../features/user/userSlice";

interface AppState {
  user: UserState;
}

export default function Home() {
  const currentUser = useSelector((state: AppState) => state.user.currentUser);
  console.log("currentUser selector: ", currentUser);

  let handleScroll = () => {
    if (window.scrollY > 10) {
      // @ts-ignore
      document.querySelector(".nav-container").className =
        "nav-container scroll";
    } else {
      // @ts-ignore
      document.querySelector(".nav-container").className = "nav-container";
    }
  };

  return (
    <div className="home-container">
      <h3>Home</h3>
      {currentUser ? <h3>{currentUser}</h3> : null}
    </div>
  );
}
