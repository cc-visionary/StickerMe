/* Contains the functions to requests to URL Paths in relation to the `characters` collection */

import axios from 'axios';

const CHARACTER_API_BASE_URL = 'http://localhost:3000/api/characters';

const CharacterService = {
  getAllCharacterNames: () => axios.get(`${CHARACTER_API_BASE_URL}/names`),
  getAllCharactersByUsername: (username) => axios.get(`${CHARACTER_API_BASE_URL}/username/${username}`),
  getCharacter: (id) => axios.get(`${CHARACTER_API_BASE_URL}/id/${id}`),
  addCharacter: (character) => axios.post(`${CHARACTER_API_BASE_URL}/add`, character),
  editCharacter: (id, character) => axios.patch(`${CHARACTER_API_BASE_URL}/update`, { id, character }),
  deleteCharacter: (id) => axios.delete(`${CHARACTER_API_BASE_URL}/delete/${id}`),
};

export default CharacterService;
