// import module from `../models/database.js`
const db = require("../models/database.js");

// import CharacterSchema from `../models/CharacterModel.js`
const Character = require("../models/CharacterModel");

// import helper function defaultCallback from `../helpers/defaultCallback`
const defaultCallback = require("../helpers/defaultCallback");

const CharacterController = {
  getCharacterNames: (req, res) => {
    db.findMany(Character, { saved: true }, (result) => defaultCallback(res, result));
  },
  getCharactersByUsername: (req, res) => {
    const { username } = req.params;

    db.findMany(Character, { username, saved: true }, (result) => defaultCallback(res, result));
  },
  getCharacter: (req, res) => {
    const { title } = req.params;
    db.findOne(Character, { title }, (result) => defaultCallback(res, result));
  },
  insertCharacter: (req, res) => {
    const {
      username,
      accessories,
      baseHair,
      backHair,
      bangs,
      blush,
      extraHair,
      eyebrows,
      eyes,
      mouth,
      nose,
      sideHair,
      frontHair,
      poses,
      title,
      description,
      quantities,
      saved,
    } = req.body;

    const character = {
      _id: new require('mongodb').ObjectID(),
      username,
      accessories,
      backHair,
      baseHair,
      bangs,
      blush,
      extraHair,
      eyebrows,
      eyes,
      mouth,
      nose,
      sideHair,
      frontHair,
      poses,
      title,
      description,
      quantities,
      saved,
    };

    db.insertOne(Character, character, (result) => {
      if (result.success) {
        console.log(result._id)
        res.status(200).send({ success: true, result: character });
      } else {
        res.status(400).send({ success: false, error: result.error.message });
      }
    });
  },
  updateCharacter: (req, res) => {
    const {
      username,
      accessories,
      backHair,
      baseHair,
      bangs,
      blush,
      extraHair,
      eyebrows,
      eyes,
      mouth,
      nose,
      sideHair,
      frontHair,
      poses,
      title,
      description,
      status,
    } = req.body;

    const character = {
      username,
      accessories,
      backHair,
      baseHair,
      bangs,
      blush,
      extraHair,
      eyebrows,
      eyes,
      mouth,
      nose,
      sideHair,
      frontHair,
      poses,
      title,
      description,
      status,
    };

    db.updateOne(Character, { _id: id }, character, (result) => defaultCallback(res, result));
  },
  deleteCharacter: (req, res) => {
    const { id } = req.params;

    // only update the status of that deleted character
    db.deleteOne(Character, { _id: id }, (result) => defaultCallback(res, result));
  },
};
/*
    exports the object `CharacterController` (defined above)
    when another script exports from this file
*/
module.exports = CharacterController;
