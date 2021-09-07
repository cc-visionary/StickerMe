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
  accessories: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true,
  },
  backHair: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true, 
  },
  frontHair: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true,
  },
  extraHair: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true,
  },
  sideHair: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true,
  },
  blush: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true,
  },
  eyebrows: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true,
  },
  eyes: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true,
  },
  mouth: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true,
  },
  nose: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true,
  },
  poses: {
    type: [Schema.Types.ObjectId],
    ref: 'Image',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String, 
  },
});

/*
  exports a mongoose.model object based on `CharacterSchema` (defined above)
  when another script exports from this file
  This model executes CRUD operations
  to collection `characters` -> plural of the argument `Character`
*/
module.exports = mongoose.model('Character', CharacterSchema);