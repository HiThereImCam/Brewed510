import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { realtimeDB, auth } from "../../firebase/firebase";
import { ref, onValue } from "firebase/database";

import { loginUser } from "../../features/user/userSlice";

export interface UserLogin {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (values: UserLogin) => {
    const { email, password } = values;
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // if the user is on /checkout, they should not be rerouted to home
      // but for now they will be

      /**
       * 
       const starCountRef = ref(db, 'posts/' + postId + '/starCount');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  updateStarCount(postElement, data);
});
       */
      const userID = userCredentials.user.uid;
      const userRef = ref(realtimeDB, `users/${userID}`);

      onValue(userRef, (snapshot) => {
        console.log("snapshot val: ", snapshot.val());
        let currentUser = snapshot.val().firstName;
        dispatch(loginUser({ currentUser: currentUser, isLoggedIn: true }));
        navigate("/");
      });
    } catch (e: any) {}
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ email: "", password: "" }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <Field
              name="email"
              component="input"
              type="email"
              placeholder="Email"
            />
            <label>Password</label>
            <Field
              name="password"
              component="input"
              type="password"
              placeholder="password"
            />
          </div>
          <div>
            <button type="submit" disabled={submitting || pristine}>
              Submit
            </button>
          </div>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </form>
      )}
    />
  );
}
