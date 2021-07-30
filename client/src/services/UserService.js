/* Contains the functions to requests to URL Paths in relation to the `users` collection */

import axios from "axios";
import { setUserSession } from "../utils/common";

const USER_API_BASE_URL = "http://localhost:3000/api/users";

const UserService = {
  getAllUsers: () => axios.get(USER_API_BASE_URL),
  getUserByUsername: (username) =>
    axios.get(`${USER_API_BASE_URL}/${username}`),
  updateUser: (user) => axios.patch(`${USER_API_BASE_URL}/update`, user),
  deleteUser: (username) =>
    axios.delete(`${USER_API_BASE_URL}/delete/${username}`),
  getLogin: () => axios.get(`${USER_API_BASE_URL}/getLogin`),
  login: (username, password, remember) =>
    axios
      .post(`${USER_API_BASE_URL}/login`, { username, password, remember })
      .then((response) => {
        setUserSession(response.data.token, response.data.result);
        return response;
      }),
  logout: () => axios.post(`${USER_API_BASE_URL}/logout`),
};

export default UserService;
