import React from "react";
import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";

export interface UserLogin {
  username: string;
  password: string;
}

export default function Login() {
  const onSubmit = async (values: UserLogin) => {
    console.log("values: ", values);
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
