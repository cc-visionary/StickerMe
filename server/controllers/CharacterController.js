// import module from `../models/database.js`
const db = require("../models/database.js");

// import CharacterSchema from `../models/CharacterModel.js`
const Character = require("../models/CharacterModel");

// import helper function defaultCallback from `../helpers/defaultCallback`
const defaultCallback = require("../helpers/defaultCallback");

const CharacterController = {
  getCharactersByUsername: (req, res) => {
    const { username } = req.params;

    db.findMany(Character, { username }, (result) =>
      defaultCallback(res, result)
    );
  },
  getCharacter: (req, res) => {
    const { id } = req.params;
    db.findOne(Character, { _id: id }, (result) =>
      defaultCallback(res, result)
    );
  },
  insertCharacter: (req, res) => {
    const {
      username,
      name,
      accessories,
      backHair,
      bangs,
      blush,
      extraHair,
      eyebrows,
      eyes,
      mouth,
      nose,
      sideHair,
      skin,
      description,
      status,
    } = req.body;

    const character = {
      username,
      name,
      accessories,
      backHair,
      bangs,
      blush,
      extraHair,
      eyebrows,
      eyes,
      mouth,
      nose,
      sideHair,
      skin,
      description,
      status,
    };

    db.insertOne(Character, character, (result) => {
      if (result.success) {
        res.status(200).send({ success: true, result: character });
      } else {
        res.status(400).send({ success: false, error: result.error.message });
      }
    });
  },
  updateCharacter: (req, res) => {
    const {
      id,
      username,
      name,
      accessories,
      backHair,
      bangs,
      blush,
      extraHair,
      eyebrows,
      eyes,
      mouth,
      nose,
      sideHair,
      skin,
      description,
      status,
    } = req.body;

    const character = {
      username,
      name,
      accessories,
      backHair,
      bangs,
      blush,
      extraHair,
      eyebrows,
      eyes,
      mouth,
      nose,
      sideHair,
      skin,
      description,
      status,
    };

    db.updateOne(Character, { _id: id }, character, (result) =>
      defaultCallback(res, result)
    );
  },
  deleteCharacter: (req, res) => {
    const { id } = req.params;

    db.deleteOne(Character, { _id: id }, (result) =>
      defaultCallback(res, result)
    );
  },
};
/*
    exports the object `CharacterController` (defined above)
    when another script exports from this file
*/
module.exports = CharacterController;
