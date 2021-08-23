/* Contains the functions to requests to URL Paths in relation to the `users` collection */

import axios from 'axios';
import { setUserLocal, removeLocalUser } from '../utils/store';

import { USER_API_BASE_URL } from '../utils/constants';

const UserService = {
  getAllUsers: () => axios.get(USER_API_BASE_URL),
  getUserByUsername: (username) => axios.get(`${USER_API_BASE_URL}/${username}`),
  addUser: (user) => axios.post(`${USER_API_BASE_URL}`, user),
  updateUser: (user) => axios.patch(`${USER_API_BASE_URL}/update`, user),
  deleteUser: (username) => axios.delete(`${USER_API_BASE_URL}/delete/${username}`),
  login: (username, password) => axios
    .post(
      `${USER_API_BASE_URL}/login`,
      { username, password },
      { withCredentials: true },
    )
    .then((response) => {
      const { username: uname, userType, email } = response.data.user;
      setUserLocal(response.data.token, {
        uname,
        email,
        userType,
      });
      return response;
    }),
  logout: () => axios.post(`${USER_API_BASE_URL}/logout`).then(() => {
    removeLocalUser();
  }),
};

export default UserService;
