// import module from `../models/database.js`
const db = require('../models/database.js');

// import OrderSchema from `../models/OrderModel.js`
const Order = require('../models/OrderModel');

// import helper function defaultCallback from `../helpers/defaultCallback`
const defaultCallback = require('../helpers/defaultCallback');

const OrderController = {
  getAllOrders: (req, res) => {
    db.findMany(Order, {}, (result) => defaultCallback(res, result));
  },
  getOrderByUser: (req, res) => {
    const { username } = req.params;

    db.findMany(Order, { username }, (result) => defaultCallback(res, result));
  },
  cancelOrder: (req, res) => {
    const { id } = req.params;

    db.updateOne(Order, { _id: id }, { status: 'Cancelled' }, (result) => defaultCallback(res, result))
  },
  insertOrder: (req, res) => {
    const { 
      username, 
      contact,
      character,
      totalPrice,
      additionalNotes,
    } = req.body;

    const order = {
      username,
      contact,
      character,
      totalPrice,
      additionalNotes,
    }
    console.log(contact);
    console.log(character);

    db.insertOne(Order, order, (result) => {
      if (result.success) {
        res.status(200).send({ success: true, result: order });
      } else {
        res.status(400).send({ success: false, error: result.error.message });
      }
    });
  },
  updateStatus: (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    db.updateOne(Order, { _id: id }, { status }, (result) => defaultCallback(res, result));
  },
  deleteOrder: (req, res) => {
    const { id } = req.params;

    db.deleteOne(Order, { _id: id }, (result) => defaultCallback(res, result));
  },
};
/*
    exports the object `OrderController` (defined above)
    when another script exports from this file
*/
module.exports = OrderController;