import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../../features/user/userSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(
    (state: StoreInterface) => state.user.isLoggedIn
  );

  console.log("isLoggedIn: ", isLoggedIn);

  let handleSignOut = async () => {
    await signOut(auth);
    dispatch(signOutUser());
    navigate("/");
  };

  /**
   * what do i not want to show if they are not logged in?
   */

  return (
    <div className="navbar-container">
      <Link to="/" className="nav-logo">
        Brewed510
      </Link>
      <div className="nav-items-container">
        <Link to="/" className="nav-item">
          Home
        </Link>
        <Link to="/menu" className="nav-item">
          Menu
        </Link>
        {!isLoggedIn ? (
          <Fragment>
            <Link to="/login" className="nav-item">
              Login
            </Link>
            <Link to="/signup" className="nav-item">
              Sign Up
            </Link>
          </Fragment>
        ) : (
          <button onClick={handleSignOut} className="nav-item">
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
}
