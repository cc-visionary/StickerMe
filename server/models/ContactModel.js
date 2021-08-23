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
  fullName: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  zipcode: {
    type: String,
    require: true,
  },
  paypalEmail: {
    type: String,
    require: true,
  },
});

/*
  exports a mongoose.model object based on `ContactSchema` (defined above)
  when another script exports from this file
  This model executes CRUD operations
  to collection `contacts` -> plural of the argument `Contact`
*/
module.exports = mongoose.model('Contact', ContactSchema);