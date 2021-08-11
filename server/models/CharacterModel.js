// import module `mongoose`
const mongoose = require('mongoose');

const { Schema } = mongoose;

// defines the schema for collection `characters`
const CharacterSchema = new Schema({
  username: {
    type: String, 
    ref: 'User',
    required: true,
  },
  name: {
    type: String, 
    required: true,
  },
  accessories: {
    type: String,
    required: true,
  },
  backHair: {
    type: String,
    required: true,
  },
  bangs: {
    type: String,
    required: true,
  },
  blush: {
    type: String,
    required: true,
  },
  extraHair: {
    type: String,
    required: true,
  },
  eyebrows: {
    type: String,
    required: true,
  },
  eyes: {
    type: String,
    required: true,
  },
  mouth: {
    type: String,
    required: true,
  },
  nose: {
    type: String,
    required: true,
  },
  sideHair: {
    type: String,
    required: true,
  },
  skin: {
    type: String,
    required: true,
  },
  description: {
    type: String, 
  },
  status: {
    type: String, 
    default: 'Editing'
  },
});

/*
  exports a mongoose.model object based on `CharacterSchema` (defined above)
  when another script exports from this file
  This model executes CRUD operations
  to collection `characters` -> plural of the argument `Character`
*/
module.exports = mongoose.model('Character', CharacterSchema);