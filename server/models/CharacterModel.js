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
    type: Schema.Types.String,
    required: true,
  },
  backHair: {
    type: Schema.Types.String,
    required: true,
  },
  frontHair: {
    type: Schema.Types.String,
    required: true,
  },
  extraHair: {
    type: Schema.Types.String,
    required: true,
  },
  sideHair: {
    type: Schema.Types.String,
    required: true,
  },
  blush: {
    type: Schema.Types.String,
    required: true,
  },
  eyebrows: {
    type: Schema.Types.String,
    required: true,
  },
  eyes: {
    type: Schema.Types.String,
    required: true,
  },
  mouth: {
    type: Schema.Types.String,
    required: true,
  },
  nose: {
    type: Schema.Types.String,
    required: true,
  },
  poses: {
    type: [Schema.Types.ObjectId],
    ref: 'Image',
    required: true,
  },
  quantities: {
    type: [Number],
    required: true,
  },
  title: {
    type: String,
    unique: true,
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