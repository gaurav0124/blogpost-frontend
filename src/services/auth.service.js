import axios from "axios";
import http from "../http-common";
const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return http
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, password) {
    return http.post("/auth/signup", {
      username,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
