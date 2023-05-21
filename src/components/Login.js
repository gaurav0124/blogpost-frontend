import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import userService from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const Login = props => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const login = values => {
    userService.login(values.username, values.password).then(response => {
      if (response.id) {
        navigate("/blog-list");
      }
    });
  };
  return (
    <div className="fullpageContainer">
      <div className="loginForm">
        <h1>Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={values => {
            // same shape as initial values
            login(values);
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
                <Field name="password" />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
              </div>

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        Click for registration, <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};
export default Login;
