import React from "react";
import "./App.css";
import Login from "./components/Login";
import AddBlog from "./components/AddBlog";
import Blog from "./components/Blog";
import BlogList from "./components/BlogList";
import SignUp from "./components/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/blog-list",
    element: <BlogList />,
  },
  {
    path: "/add",
    element: <AddBlog />,
  },
  {
    path: "/blogs/:id",
    element: <Blog />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
