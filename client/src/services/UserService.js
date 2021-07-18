/* Contains the functions to requests to URL Paths in relation to the `users` collection */

import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:3000/api/users";

class UserService {
  getAllUsers() {
    return axios.get(USER_API_BASE_URL);
  }
}

export default new UserService();