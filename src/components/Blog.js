import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import BlogDataService from "../services/BlogService";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const blogSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().min(100).required("Required"),
});

const Blog = props => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialBlogState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [currentBlog, setcurrentBlog] = useState(initialBlogState);
  const [message, setMessage] = useState("");

  const getBlog = id => {
    BlogDataService.get(id)
      .then(response => {
        setcurrentBlog(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getBlog(id);
  }, [id]);

  const updatePublished = status => {
    setMessage("");
    var data = {
      id: currentBlog.id,
      title: currentBlog.title,
      description: currentBlog.description,
      published: status,
    };

    BlogDataService.update(currentBlog.id, data)
      .then(response => {
        setcurrentBlog({ ...currentBlog, published: status });
        console.log(response.data);
        setMessage("The blog status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateBlog = values => {
    setMessage("");
    const updatedBlog = {
      ...currentBlog,
      title: values.title,
      description: values.description,
    };
    setcurrentBlog(updatedBlog);
    console.log(updatedBlog);
    BlogDataService.update(updatedBlog.id, updatedBlog)
      .then(response => {
        console.log(response.message);
        setMessage("The blog was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteBlog = () => {
    setMessage("");
    BlogDataService.remove(currentBlog.id)
      .then(response => {
        console.log(response.data);
        navigate("/blog-list");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <div>
        <Link to="/blog-list">
          <button>Go to the list</button>
        </Link>
      </div>
      {currentBlog.id ? (
        <div className="edit-form">
          <h2>Edit Blog</h2>
          {/* <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentBlog.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentBlog.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentBlog.published ? "Published" : "Pending"}
            </div>
          </form> */}
          <Formik
            initialValues={currentBlog}
            validationSchema={blogSchema}
            onSubmit={values => {
              // same shape as initial values
              updateBlog(values);
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
                <div className="form-group">
                  <label>
                    <strong>Status:</strong>
                  </label>
                  {currentBlog.published ? "Published" : "Pending"}
                </div>

                <button type="submit">Update Blog</button>
              </Form>
            )}
          </Formik>

          {currentBlog.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteBlog}>
            Delete
          </button>

          {/* <button
            type="submit"
            className="badge badge-success"
            onClick={updateBlog}
          >
            Update
          </button> */}
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please select a blog...</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
