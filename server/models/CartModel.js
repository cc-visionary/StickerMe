// import module `mongoose`
const mongoose = require('mongoose');

const { Schema } = mongoose;

// defines the schema for collection `carts`
const CartSchema = new Schema({
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
  exports a mongoose.model object based on `CartSchema` (defined above)
  when another script exports from this file
  This model executes CRUD operations
  to collection `carts` -> plural of the argument `Cart`
*/
module.exports = mongoose.model('Cart', CartSchema);