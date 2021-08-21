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
  insertOrder: (req, res) => {
    const { username, contactID, characterIDs, totalPrice, date } = req.body;

    const order = {
      username, 
      contactID,
      characterIDs,
      totalPrice, 
      date,
    }

    db.insertOne(Order, order, (result) => {
      if (result.success) {
        res.status(200).send({ success: true, result: order });
      } else {
        res.status(400).send({ success: false, error: result.error.message });
      }
    });
  },
};
/*
    exports the object `OrderController` (defined above)
    when another script exports from this file
*/
module.exports = OrderController;