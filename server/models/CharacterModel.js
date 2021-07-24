// import module `mongoose`
const mongoose = require('mongoose');

const { Schema } = mongoose;

// defines the schema for collection `characters`
const CharacterSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  name: {
    type: String, 
    required: true,
  },
  // TODO: add the body parts and their types
  description: {
    type: String, 
  },
  status: {
    type: String, 
    default: ''
  },
});

/*
  exports a mongoose.model object based on `CharacterSchema` (defined above)
  when another script exports from this file
  This model executes CRUD operations
  to collection `characters` -> plural of the argument `Character`
*/
module.exports = mongoose.model('Character', CharacterSchema);