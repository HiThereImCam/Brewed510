import React from "react";
import { Form, Field } from "react-final-form";

export interface UserInfo {
  email: string;
  password: string;
}

let initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUp() {
  let handleSubmit = async (values: UserInfo) => {
    console.log("Sign up values: ", values);
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
              name="confirm"
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
