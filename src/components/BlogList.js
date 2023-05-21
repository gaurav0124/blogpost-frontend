import React, { useState, useEffect } from "react";
import BlogDataService from "../services/BlogService";
import { Link, useNavigate } from "react-router-dom";

const BlogsList = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setBlog] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveBlogs();
  }, []);

  const retrieveBlogs = () => {
    BlogDataService.getAll()
      .then(response => {
        setBlogs(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveBlogs();
    setBlog(null);
    setCurrentIndex(-1);
  };

  const setActiveBlog = (blog, index) => {
    setBlog(blog);
    setCurrentIndex(index);
  };

  const removeAllBlogs = () => {
    BlogDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    BlogDataService.findByTitle(searchTitle)
      .then(response => {
        setBlogs(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      {/* <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div> */}
      <div className="addButtonContainer">
        <button onClick={() => navigate("/add")}>Add new blog</button>
      </div>
      <div>
        <h2>Blog List </h2>

        <div className="blogsContainer">
          {blogs.length === 0 && (
            <div>
              Currently there are no blogs available. Please click 'Add new
              blog' to add a blog.
            </div>
          )}
          {blogs &&
            blogs.map((blog, index) => (
              <div
                className="blogItem"
                onClick={() => setActiveBlog(blog, index)}
                key={index}
              >
                <div className="blogTitle">{blog.title}</div>
                <div className="multiline-ellipsis">{blog.description}</div>
              </div>
            ))}
        </div>

        {blogs.length > 0 && (
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllBlogs}
          >
            Remove All
          </button>
        )}
      </div>
      <div className="selectedBlog">
        {currentBlog ? (
          <>
            <h2>Selected Blog</h2>
            <div className="editContainer">
              <Link
                to={"/blogs/" + currentBlog.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>

            <div className="blogContainer">
              <div className="blogInfo">
                {currentBlog.title}
                <div className="authorName">By Author name</div>
              </div>
              <div className="blogDesc">{currentBlog.description}</div>
            </div>
            <div className="status">
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentBlog.published ? "Published" : "Pending"}
            </div>
          </>
        ) : (
          <div>
            <br />
            {blogs.length > 0 && <p>Please click on a blog...</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsList;
