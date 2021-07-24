// import module `mongoose`
const mongoose = require('mongoose');

const { Schema } = mongoose;

// defines the schema for collection `orders`
const OrderSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  characterID: {
    type: Schema.Types.ObjectId, 
    ref: 'Character',
    required: true,
  },
  contactID: {
    type: Schema.Types.ObjectId, 
    ref: 'Contact',
    required: true,
  },
  totalPrice: {
    type: Schema.Types.Decimal128,
    required: true,
    min: 0,
  },
  proofOfPayment: {
    type: Schema.Types.Buffer,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

/*
  exports a mongoose.model object based on `OrderSchema` (defined above)
  when another script exports from this file
  This model executes CRUD operations
  to collection `orders` -> plural of the argument `Order`
*/
module.exports = mongoose.model('Order', OrderSchema);