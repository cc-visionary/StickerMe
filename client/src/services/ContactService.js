/* Contains the functions to requests to URL Paths in relation to the `contacts` collection */

import axios from 'axios';

import { CONTACT_API_BASE_URL } from '../utils/constants';

const ContactService = {
  getContactsByUsername: (username) => axios.get(`${CONTACT_API_BASE_URL}/username/${username}`),
  addContact: (contact) => axios.post(`${CONTACT_API_BASE_URL}/add`, contact),
  editContact: (id, contact) => axios.patch(`${CONTACT_API_BASE_URL}/update`, { id, contact }),
  deleteContact: (id) => axios.delete(`${CONTACT_API_BASE_URL}/delete/${id}`),
};

export default ContactService;
