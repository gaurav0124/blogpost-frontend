import React, { useState } from "react";
import blogDataService from "../services/BlogService";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const blogSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().min(100).required("Required"),
});

const AddBlog = () => {
  const navigate = useNavigate();
  const initialBlogState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [blog, setBlog] = useState(initialBlogState);
  const [submitted, setSubmitted] = useState(false);

  const saveBlog = values => {
    var data = {
      title: values.title,
      description: values.description,
    };

    blogDataService
      .create(data)
      .then(response => {
        setBlog({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
        });
        setSubmitted(true);
        console.log(response.data);
        navigate("/blog-list");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
        </div>
      ) : (
        <div>
          <Formik
            initialValues={initialBlogState}
            validationSchema={blogSchema}
            onSubmit={values => {
              saveBlog(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="blogFields">
                  Title:
                  <br />
                  <Field name="title" />
                  {errors.title && touched.title ? (
                    <div>{errors.title}</div>
                  ) : null}
                </div>
                <div className="blogFields">
                  Description:
                  <br />
                  <Field name="description" component="textarea" />
                  {errors.description && touched.description ? (
                    <div>{errors.description}</div>
                  ) : null}
                </div>

                <button type="submit">Add Blog</button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default AddBlog;
