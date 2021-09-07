// import module `mongoose`
const mongoose = require('mongoose');

const { Schema } = mongoose;

// defines the schema for collection `orders`
const OrderSchema = new Schema({
  username: {
    type: String, 
    ref: 'User',
    required: true,
  },
  contactID: {
    type: Schema.Types.ObjectId, 
    ref: 'Contact',
    required: true,
  },
  characterID: {
    type: Schema.Types.ObjectId, 
    ref: 'Character',
    required: true,
  },
  totalPrice: {
    type: Schema.Types.Decimal128,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now
  },
  additionalNotes: {
    type: String,
  },
  status: {
    type: String,
    default: 'Preparing',
  }
});

/*
  exports a mongoose.model object based on `OrderSchema` (defined above)
  when another script exports from this file
  This model executes CRUD operations
  to collection `orders` -> plural of the argument `Order`
*/
module.exports = mongoose.model('Order', OrderSchema);