import React from "react";
import { Form, Field } from "react-final-form";
// import { createUser } from "../../firebase/firebase";

import { realtimeDB, auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

let initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUp() {
  let handleSubmit = async (values: UserInfo) => {
    const { email, password, firstName, lastName } = values;

    try {
      let userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      let userId = userCredentials.user.uid;
      set(ref(realtimeDB, "users/" + userId), {
        firstName: firstName,
        lastName: lastName,
        email: email,
      });

      // need to dispatch action to the store
      // then use the userinformation throughout the page
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorCode: ", errorCode);
      console.log("errorMessage: ", errorMessage);
    }
  };

  /**
   * Need validation on the forms
   * good starting point though
   */

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialState}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name</label>
            <Field
              name="firstName"
              component="input"
              placeholder="First Name"
            />
            <label>Last Name</label>
            <Field name="lastName" component="input" placeholder="Last Name" />
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
            <label>Confirm Password</label>
            <Field
              name="confirmPassword"
              component="input"
              type="password"
              placeholder="Confirm Password"
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
