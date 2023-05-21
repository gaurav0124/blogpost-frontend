import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import userService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const signUpSchema = Yup.object().shape({
  username: Yup.string().min(5).max(20).required("Required"),
  password: Yup.string().min(5).max(20).required("Required"),
});
const SignUp = props => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };
  const createUser = values => {
    setError("");
    userService.register(values.username, values.password).then(response => {
      console.log(response);
      if (!response.data.error) {
        setMessage(response.data.message);
        setTimeout(() => {
          setMessage("");
          navigate("/");
        }, 2000);
      } else {
        setError(response.data.message);
      }
    });
  };
  return (
    <div className="fullpageContainer">
      <div className="loginForm">
        <h1>Sign up</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={signUpSchema}
          onSubmit={values => {
            createUser(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="loginFields">
                Username:
                <br />
                <Field name="username" />
                {errors.username && touched.username ? (
                  <div>{errors.username}</div>
                ) : null}
              </div>
              <div className="loginFields">
                Password:
                <br />
                <Field name="password" type="password" />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
              </div>

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
      <div>{message}</div>
      <div>{error}</div>
    </div>
  );
};
export default SignUp;
