// import module from `../models/database.js`
const db = require('../models/database.js');

// import CharacterSchema from `../models/CharacterModel.js`
const Character = require('../models/CharacterModel');

// import helper function defaultCallback from `../helpers/defaultCallback`
const defaultCallback = require('../helpers/defaultCallback');

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