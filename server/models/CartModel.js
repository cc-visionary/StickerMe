// import module `mongoose`
const mongoose = require('mongoose');

const { Schema } = mongoose;

// defines the schema for collection `contacts`
const ContactSchema = new Schema({
  username: {
    type: String, 
    ref: 'User',
    required: true,
  },
  characterID: {
    type: Schema.Types.ObjectId, 
    ref: 'Character',
    required: true,
  },
});

/*
  exports a mongoose.model object based on `ContactSchema` (defined above)
  when another script exports from this file
  This model executes CRUD operations
  to collection `contacts` -> plural of the argument `Contact`
*/
module.exports = mongoose.model('Contact', ContactSchema);