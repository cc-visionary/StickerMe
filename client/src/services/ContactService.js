/* Contains the functions to requests to URL Paths in relation to the `contacts` collection */

import axios from "axios";

const CONTACT_API_BASE_URL = "http://localhost:3000/api/contacts";

const ContactService = {
  getContactsByUserID: (userID) =>
    axios.get(`${CONTACT_API_BASE_URL}/userID/${userID}`),
  getContactByID: (id) => axios.get(`${CONTACT_API_BASE_URL}/id/${id}`),
  addContact: (contact) => axios.post(`${CONTACT_API_BASE_URL}/add`, contact),
  editContact: (id, contact) =>
    axios.patch(`${CONTACT_API_BASE_URL}/edit`, { id, contact }),
};

export default ContactService;
