import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/blogs");
};

const get = id => {
  return http.get(`/blogs/${id}`, { headers: authHeader() });
};

const create = data => {
  return http.post("/blogs", data, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/blogs/${id}`, data, { headers: authHeader() });
};

const remove = id => {
  return http.delete(`/blogs/${id}`, { headers: authHeader() });
};

const removeAll = () => {
  return http.delete(`/blogs`, { headers: authHeader() });
};

const findByTitle = title => {
  return http.get(`/blogs?title=${title}`);
};

const BlogService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default BlogService;
