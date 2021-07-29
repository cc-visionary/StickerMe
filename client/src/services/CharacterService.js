/* Contains the functions to requests to URL Paths in relation to the `characters` collection */

import axios from "axios";

const CHARACTER_API_BASE_URL = "http://localhost:3000/api/Characters";

const CharacterService = {
  getAllCharactersByUserID: (userID) =>
    axios.get(CHARACTER_API_BASE_URL, { userID }),
};

export default CharacterService;
