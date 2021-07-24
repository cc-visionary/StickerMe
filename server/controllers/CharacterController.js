// import module from `../models/database.js`
const db = require('../models/database.js');

// import CharacterSchema from `../models/CharacterModel.js`
const Character = require('../models/CharacterModel');

const defaultCallback = (res, result) => res.status(200).json(result)

const CharacterController = {
  getCharactersByUserID: (req, res) => {
    db.findMany(Character, {}, (result) => defaultCallback(res, result));
  },
};
/*
    exports the object `CharacterController` (defined above)
    when another script exports from this file
*/
module.exports = CharacterController;