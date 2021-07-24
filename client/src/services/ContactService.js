/* Contains the functions to requests to URL Paths in relation to the `contacts` collection */

import axios from 'axios';

const CONTACT_API_BASE_URL = "http://localhost:3000/api/contacts";

class ContactService {
  getAllContactsByUserID(userID) {
    return axios.get(CONTACT_API_BASE_URL, { userID });
  }
}

export default new ContactService();