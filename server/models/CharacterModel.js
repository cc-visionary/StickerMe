// import module `mongoose`
const mongoose = require('mongoose');

const { Schema } = mongoose;

// import ImageSchema from `../models/ImageModel.js`
const { ImageSchema } = require("./ImageModel");

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
    type: ImageSchema,
    required: true,
  },
  backHair: {
    type: ImageSchema,
    required: true,
  },
  frontHair: {
    type: ImageSchema,
    required: true,
  },
  extraHair: {
    type: ImageSchema,
    required: true,
  },
  sideHair: {
    type: ImageSchema,
    required: true,
  },
  skinColor: {
    type: ImageSchema,
    required: true,
  },
  blush: {
    type: ImageSchema,
    required: true,
  },
  eyebrows: {
    type: ImageSchema,
    required: true,
  },
  eyes: {
    type: ImageSchema,
    required: true,
  },
  mouth: {
    type: ImageSchema,
    required: true,
  },
  nose: {
    type: ImageSchema,
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